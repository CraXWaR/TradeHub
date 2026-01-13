import {useState, useCallback, useEffect, useMemo} from "react";
import useAuth from "../auth/useAuth.js";

const STORAGE_CART_KEY = "th_cart_v1";
const BASE_URL = import.meta.env.VITE_API_URL || '';

export function useCart() {
    const [isBusy, setIsBusy] = useState(false);
    const [message, setMessage] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const {token, isAuthenticated} = useAuth();


    useEffect(() => {
        async function loadAndSync() {
            setIsBusy(true);
            try {
                const raw = localStorage.getItem(STORAGE_CART_KEY);
                const localItems = raw ? JSON.parse(raw) : [];

                if (!isAuthenticated) {
                    setCartItems(Array.isArray(localItems) ? localItems : []);
                } else {
                    if (localItems.length > 0) {
                        for (const item of localItems) {
                            await fetch(`${BASE_URL}/api/cart`, {
                                method: "POST", headers: {
                                    "Content-Type": "application/json", Authorization: `Bearer ${token}`
                                }, body: JSON.stringify({
                                    productId: item.productId, variantId: item.variantId, quantity: item.quantity
                                })
                            });
                        }
                        localStorage.removeItem(STORAGE_CART_KEY);
                    }

                    const res = await fetch(`${BASE_URL}/api/cart`, {
                        headers: {Authorization: `Bearer ${token}`}
                    });
                    const serverData = await res.json();

                    const finalItems = Array.isArray(serverData) ? serverData : (serverData.data || []);
                    setCartItems(finalItems);
                }
            } catch (err) {
                console.error("Cart sync error:", err);
                setCartItems([]);
            } finally {
                setIsBusy(false);
            }
        }

        loadAndSync();
    }, [isAuthenticated, token]);

    const addToCart = useCallback(async (productId, variant) => {
        setIsBusy(true);
        setMessage(null);
        try {
            const variantId = typeof variant === "object" ? variant?.id : variant ?? null;
            await new Promise((r) => setTimeout(r, 800));

            if (isAuthenticated) {
                const res = await fetch(`${BASE_URL}/api/cart`, {
                    method: "POST", headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`
                    }, body: JSON.stringify({productId, variantId, quantity: 1}),
                });
                if (!res.ok) throw new Error("Failed to sync with server");

                const serverResponse = await res.json();

                const finalItems = Array.isArray(serverResponse) ? serverResponse : (serverResponse.data || []);
                setCartItems(finalItems);
            } else {
                setCartItems((prev) => {
                    const existingIndex = prev.findIndex((item) => item.productId === productId && item.variantId === variantId);
                    if (existingIndex !== -1) {
                        const copy = [...prev];
                        copy[existingIndex] = {
                            ...copy[existingIndex], quantity: (copy[existingIndex].quantity || 1) + 1,
                        };
                        return copy;
                    }
                    const next = [...prev, {productId, variantId, quantity: 1}];
                    localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(next));
                    return next;
                });
            }

            setMessage({type: "success", text: "Product added to your cart!"});
        } catch (err) {
            console.error(err);
            setMessage({type: "error", text: "Failed to add product."});
        } finally {
            setIsBusy(false);
        }
    }, [isAuthenticated, token]);

    // remove product + variant
    const removeFromCart = useCallback(async (productId, variantId = null) => {
        const norm = variantId ?? null;

        if (isAuthenticated) {
            setIsBusy(true);
            try {
                const res = await fetch(`${BASE_URL}/api/cart/remove`, {
                    method: "DELETE", headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`
                    }, body: JSON.stringify({productId, variantId: norm})
                });

                const updated = await res.json();
                const finalItems = Array.isArray(updated) ? updated : (updated.data || []);
                setCartItems(finalItems);
            } catch (err) {
                console.error(err);
            } finally {
                setIsBusy(false);
            }
        } else {
            setCartItems((prev) => {
                const next = prev.filter((item) => !(item.productId === productId && (item.variantId ?? null) === norm));
                localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(next));
                return next;
            });
        }
    }, [isAuthenticated, token]);

    // update quantity for a line
    const updateItemQuantity = useCallback(async (productId, variantId, quantity) => {
        const updateState = (prev) => prev.map((item) => {
            const isMatch = (item.productId === productId || item.product_id === productId) && (item.variantId === variantId || item.variant_id === variantId);

            return isMatch ? {...item, quantity} : item;
        });

        setCartItems(updateState);

        if (isAuthenticated && token) {
            try {
                const res = await fetch(`${BASE_URL}/api/cart/update-quantity`, {
                    method: "PATCH", headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`
                    }, body: JSON.stringify({productId, variantId, quantity})
                });

                if (!res.ok) throw new Error("Server update failed");

                const serverItems = await res.json();
                setCartItems(serverItems);
            } catch (err) {
                console.error("Failed to sync quantity:", err);
            }
        } else {
            const raw = localStorage.getItem(STORAGE_CART_KEY);
            if (raw) {
                const localItems = JSON.parse(raw);
                const updatedLocal = localItems.map(item => {
                    const isProdMatch = String(item.productId || item.product_id) === String(productId);

                    const itemVar = item.variantId ?? null;
                    const targetVar = variantId ?? null;
                    const isVarMatch = String(itemVar) === String(targetVar);

                    if (isProdMatch && isVarMatch) {
                        return {...item, quantity: Number(quantity)};
                    }
                    return item;
                });

                localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(updatedLocal));
                setCartItems(updatedLocal);
            }
        }
    }, [isAuthenticated, token]);

    // update selected variant for a line
    const updateItemVariant = useCallback(async (productId, oldVariantId, newVariantId) => {
        const updateState = (prev) => prev.map((item) => {
            const isMatch = (item.productId === productId || item.product_id === productId) && (item.variantId === oldVariantId || item.variant_id === oldVariantId);

            return isMatch ? {...item, variantId: newVariantId, variant_id: newVariantId} : item;
        });

        setCartItems(updateState);

        if (isAuthenticated && token) {
            try {
                const res = await fetch(`${BASE_URL}/api/cart/update-variant`, {
                    method: "PATCH", headers: {
                        "Content-Type": "application/json", Authorization: `Bearer ${token}`
                    }, body: JSON.stringify({productId, oldVariantId, newVariantId})
                });

                const serverItems = await res.json();
                setCartItems(Array.isArray(serverItems) ? serverItems : (serverItems.data || []));
            } catch (err) {
                console.error("Failed to sync variant change:", err);
            }
        } else {
            const raw = localStorage.getItem(STORAGE_CART_KEY);
            if (raw) {
                const localItems = JSON.parse(raw);
                const updatedLocal = localItems.map(item => {
                    const isMatch = String(item.productId) === String(productId) && String(item.variantId ?? null) === String(oldVariantId ?? null);

                    return isMatch ? {...item, variantId: newVariantId} : item;
                });
                localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(updatedLocal));
                setCartItems(updatedLocal);
            }
        }
    }, [isAuthenticated, token]);

    // remove all from cart
    const clearCart = useCallback(async () => {
        setIsBusy(true);
        try {
            if (isAuthenticated && token) {
                const res = await fetch(`${BASE_URL}/api/cart/clear`, {
                    method: "DELETE", headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (!res.ok) throw new Error("Could not clear server cart");
            }

            setCartItems([]);
            localStorage.removeItem(STORAGE_CART_KEY);

        } catch (err) {
            console.error("Clear cart error:", err);
        } finally {
            setIsBusy(false);
        }
    }, [isAuthenticated, token]);

    const cartCount = useMemo(() => {
        return Array.isArray(cartItems) ? cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 1), 0) : 0;
    }, [cartItems]);

    const dismissMessage = useCallback(() => setMessage(null), []);

    return {
        addToCart,
        removeFromCart,
        clearCart,
        updateItemQuantity,
        updateItemVariant,
        isBusy,
        cartItems,
        cartCount,
        message,
        dismissMessage
    };
}
