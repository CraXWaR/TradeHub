import {useState, useCallback, useEffect} from "react";

const STORAGE_CART_KEY = "th_cart_v1";

export function useCart() {
    const [isBusy, setIsBusy] = useState(false);

    const [cartItems, setCartItems] = useState(() => {
        if (typeof window === "undefined") return [];
        try {
            const raw = localStorage.getItem(STORAGE_CART_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch {
            return [];
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_CART_KEY, JSON.stringify(cartItems));
        } catch { /* empty */
        }
    }, [cartItems]);

    const addToCart = useCallback(async (productId) => {
        setIsBusy(true);
        try {
            // placeholder logic to test — wire API in future
            console.log("Adding product", productId, "to cart...");
            await new Promise((r) => setTimeout(r, 800));
            setCartItems((prev) => (prev.includes(productId) ? prev : [...prev, productId]));
            alert(`Product ${productId} added to cart!`);
        } catch (err) {
            console.error(err);
            alert("Failed to add to cart.");
        } finally {
            setIsBusy(false);
        }
    }, []);

    const removeFromCart = useCallback((productId) => {
        setCartItems((prev) => prev.filter((id) => id !== productId));
    }, []);

    const clearCart = useCallback(() => setCartItems([]), []);

    const cartCount = cartItems.length;
    return {addToCart, removeFromCart, clearCart, isBusy, cartItems, cartCount};
}
