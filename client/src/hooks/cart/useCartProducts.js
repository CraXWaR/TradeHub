import {useEffect, useState, useCallback} from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

export function useCartProducts(cartItems) {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            setItems([]);
            return;
        }

        const controller = new AbortController();
        const idsParam = cartItems.join(",");

        async function loadCartProducts() {
            try {
                setStatus("loading");
                setError(null);

                const res = await fetch(`${BASE_URL}/api/cart?ids=${idsParam}`, {
                    headers: {Accept: "application/json"}, signal: controller.signal,
                });

                if (!res.ok) throw new Error("Failed to load cart products");

                const data = await res.json();

                setItems(data.map((p) => ({
                    ...p, quantity: p.quantity != null ? p.quantity : 1,
                })));
                setStatus("idle");
            } catch (err) {
                if (err.name === "AbortError") return;
                console.error(err);
                setStatus("error");
                setError(err);
                setItems([]);
            }
        }

        loadCartProducts();
        return () => controller.abort();
    }, [cartItems]);

    const updateQuantity = useCallback((id, qty) => {
        setItems((prev) => prev.map((it) => (it.id === id ? {...it, quantity: qty} : it)));
    }, []);

    const removeItem = useCallback((id) => {
        setItems((prev) => prev.filter((it) => it.id !== id));
    }, []);

    const clearItems = useCallback(() => {
        setItems([]);
    }, []);

    return {
        items, setItems, status, error, updateQuantity, removeItem, clearItems,
    };
}