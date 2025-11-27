import {useState, useCallback, useEffect} from "react";

const STORAGE_CART_KEY = "th_cart_v1";

export function useCart() {
    const [isBusy, setIsBusy] = useState(false);
    const [message, setMessage] = useState(null);

    const [cartItems, setCartItems] = useState(() => {
        if (typeof window === "undefined") return [];
        try {
            const raw = localStorage.getItem(STORAGE_CART_KEY);
            if (!raw) return [];

            const parsed = JSON.parse(raw);

            // backwards-compat:
            if (Array.isArray(parsed) && parsed.length && typeof parsed[0] === "number") {
                return parsed.map((id) => ({
                    productId: id, quantity: 1, variantId: null,
                }));
            }

            return parsed;
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cartItems));
        } catch {
            /* ignore */
        }
    }, [cartItems]);

    const addToCart = useCallback(async (productId, variant) => {
        setIsBusy(true);
        setMessage(null);
        try {
            const variantId = typeof variant === "object" ? variant?.id : variant ?? null;

            await new Promise((r) => setTimeout(r, 800));

            setCartItems((prev) => {
                // if same product + variant already exists -> just bump quantity
                const existingIndex = prev.findIndex((item) => item.productId === productId && item.variantId === variantId);

                if (existingIndex !== -1) {
                    const copy = [...prev];
                    copy[existingIndex] = {
                        ...copy[existingIndex], quantity: copy[existingIndex].quantity + 1,
                    };
                    return copy;
                }

                return [...prev, {
                    productId, variantId, quantity: 1,
                },];
            });

            setMessage({type: "success", text: "Product added to your cart! You can review it from the cart page.",});
        } catch (err) {
            console.error(err);
            setMessage({type: "error", text: "Failed to add this product to your cart. Please try again.",});
        } finally {
            setIsBusy(false);
        }
    }, []);

    // remove product + variant
    const removeFromCart = useCallback((productId, variantId = null) => {
        const norm = variantId ?? null;
        setCartItems((prev) => prev.filter((item) => !(item.productId === productId && (item.variantId ?? null) === norm)));
    }, []);

    // update quantity for a line
    const updateItemQuantity = useCallback((productId, variantId, quantity) => {
        setCartItems((prev) => prev.map((item) => item.productId === productId && item.variantId === variantId ? {
            ...item, quantity
        } : item));
    }, []);

    // update selected variant for a line
    const updateItemVariant = useCallback((productId, oldVariantId, newVariantId) => {
        setCartItems((prev) => prev.map((item) => item.productId === productId && item.variantId === oldVariantId ? {
            ...item, variantId: newVariantId
        } : item));
    }, []);

    const clearCart = useCallback(() => setCartItems([]), []);

    // total count = sum of quantities
    const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity ?? 1), 0);
    const dismissMessage = useCallback(() => setMessage(null), []);

    return {
        addToCart, removeFromCart, clearCart, updateItemQuantity, updateItemVariant, isBusy, cartItems, cartCount, message, dismissMessage
    };
}
