import {useEffect, useState} from "react";
import useAuth from "../auth/useAuth.js";

const BASE_URL = import.meta.env.VITE_API_URL;

export function useCartProducts(cartItems) {
    const [items, setItems] = useState([]);
    const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const {isAuthenticated} = useAuth();

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            setItems([]);
            return;
        }

        if (isAuthenticated && cartItems.every(i => i.product)) {
            const merged = cartItems.map(cartItem => {
                const product = cartItem.product;
                const selectedVariantId = cartItem.variant_id ?? cartItem.variantId ?? null;
                const selectedVariant = selectedVariantId ? product.variants?.find(v => v.id === selectedVariantId) : null;
                const unitPrice = selectedVariant?.price ?? product.price;

                return {
                    ...product,
                    cartItemId: cartItem.id,
                    quantity: cartItem.quantity ?? 1,
                    selectedVariantId,
                    selectedVariant,
                    unitPrice
                };
            });
            setItems(merged);
            return;
        }

        const controller = new AbortController();
        const idsParam = [...new Set(cartItems.map((item) => item.productId))].join(",");

        async function loadCartProducts() {
            try {
                setStatus("loading");
                const res = await fetch(`${BASE_URL}/api/cart?ids=${idsParam}`, {
                    headers: {Accept: "application/json"}, signal: controller.signal,
                });

                if (!res.ok) throw new Error("Failed to load products");
                const data = await res.json();
                const productsArray = Array.isArray(data) ? data : (data.data || []);

                const merged = cartItems.map((cartItem) => {
                    const product = productsArray.find((p) => p.id === cartItem.productId);
                    if (!product) return null;

                    const selectedVariantId = cartItem.variantId ?? cartItem.variant_id ?? null;
                    const selectedVariant = selectedVariantId != null ? product.variants?.find((v) => v.id === selectedVariantId) : null;
                    const unitPrice = selectedVariant?.price ?? product.price;

                    return {
                        ...product, quantity: cartItem.quantity ?? 1, selectedVariantId, selectedVariant, unitPrice
                    };
                }).filter(Boolean);

                setItems(merged);
                setStatus("idle");
            } catch (err) {
                if (err.name === "AbortError") return;
                setStatus("error");
                setError(err);
            }
        }

        loadCartProducts();
        return () => controller.abort();
    }, [cartItems, isAuthenticated]);

    return {items, status, error};
}