import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

function getToken() {
    let token = localStorage.getItem("token") || "";
    if (token.startsWith("Bearer ")) token = token.slice(7);
    return token;
}

function parseJwt(token) {
    try {
        const [, payload] = token.split(".");
        return JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/")));
    } catch {
        return null;
    }
}

export function useGetWishlistItems({ auto = true } = {}) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(auto);
    const [error, setError] = useState("");

    const token = useMemo(getToken, []);
    const user = useMemo(() => parseJwt(token), [token]);
    const userId = user?.id || user?.sub || null;

    const abortRef = useRef(null);

    const fetchWishlist = useCallback(async () => {
        if (!token || !userId) {
            setItems([]);
            setLoading(false);
            setError("");
            return;
        }

        setLoading(true);
        setError("");

        if (abortRef.current) abortRef.current.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const res = await fetch(`${BASE_URL}/user/wishlist`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                signal: controller.signal,
            });

            const data = await res.json().catch(() => ({}));

            if (res.ok && Array.isArray(data.items)) {
                const list = data.items
                    .map((i) => {
                        const p = i?.product ?? {};
                        const id = p.id ?? p._id ?? i?.productId;
                        return id ? { ...p, id } : null;
                    })
                    .filter(Boolean);
                setItems(list);
            } else {
                setItems([]);
                setError(data?.message || "Failed to load wishlist");
            }
        } catch (e) {
            if (e.name !== "AbortError") {
                console.error("Fetch wishlist error:", e);
                setError("Error connecting to server");
            }
        } finally {
            setLoading(false);
        }
    }, [token, userId]);

    useEffect(() => {
        if (auto) fetchWishlist();
        return () => abortRef.current?.abort();
    }, [auto, fetchWishlist]);

    const refetch = useCallback(() => {
        if (!loading) return fetchWishlist();
    }, [loading, fetchWishlist]);

    return {
        items,
        loading,
        error,
        refetch,
        isAuthed: !!(token && userId),
    };
}
