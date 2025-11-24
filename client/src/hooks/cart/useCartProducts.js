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

        const idsParam = [...new Set(cartItems.map((item) => item.productId))].join(",");

        async function loadCartProducts() {
            try {
                setStatus("loading");
                setError(null);

                const res = await fetch(`${BASE_URL}/api/cart?ids=${idsParam}`, {
                    headers: {Accept: "application/json"}, signal: controller.signal,
                });

                if (!res.ok) throw new Error("Failed to load cart products");

                const data = await res.json();

                const merged = cartItems
                    .map((cartItem) => {
                        const product = data.find((p) => p.id === cartItem.productId);
                        if (!product) return null;

                        const selectedVariantId = cartItem.variantId ?? null;
                        const selectedVariant = selectedVariantId != null ? product.variants?.find((v) => v.id === selectedVariantId) : null;
                        const unitPrice = selectedVariant?.price ?? product.price;

                        return {
                            ...product, quantity: cartItem.quantity ?? 1, selectedVariantId, selectedVariant, unitPrice
                        };
                    })
                    .filter(Boolean);

                setItems(merged);
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

    const updateQuantity = useCallback((productId, variantId, qty) => {
        const norm = variantId ?? null;

        setItems((prev) => prev.map((it) => it.id === productId && (it.selectedVariantId ?? null) === norm ? {
            ...it,
            quantity: qty
        } : it));
    }, []);

    const removeItem = useCallback((productId, variantId) => {
        const norm = variantId ?? null;
        setItems((prev) => prev.filter((it) => !(it.id === productId && (it.selectedVariantId ?? null) === norm)));
    }, []);

    const clearItems = useCallback(() => {
        setItems([]);
    }, []);

    return {
        items, setItems, status, error, updateQuantity, removeItem, clearItems,
    };
}