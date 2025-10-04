import {useEffect, useMemo, useState} from "react";
import {useFormHandler} from "./useFormHandler";

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

function cacheKey(userId, productId) {
    return `wl:${userId}:${productId}`;
}

export const useAddToWishlist = (productId, initialInWishlist = undefined) => {
    const {
        loading, setLoading, message, setMessage, resetMessage, withMinDelay,
    } = useFormHandler();

    const [inWishlist, setInWishlist] = useState(!!initialInWishlist);
    const [initLoading, setInitLoading] = useState(initialInWishlist === undefined);

    const token = useMemo(getToken, []);
    const userId = useMemo(() => {
        const payload = parseJwt(token);
        return payload?.id || payload?.sub || null;
    }, [token]);

    useEffect(() => {
        let cancelled = false;

        if (!productId) {
            setInitLoading(false);
            return;
        }

        if (initialInWishlist !== undefined) {
            setInitLoading(false);
        } else {
            if (userId) {
                const cached = localStorage.getItem(cacheKey(userId, productId));
                if (cached === "1") setInWishlist(true);
            }
        }

        if (!token || !userId) {
            setInitLoading(false);
            return;
        }

        (async () => {
            try {
                const res = await fetch(`${BASE_URL}/user/wishlist?productId=${productId}`, {headers: {Authorization: `Bearer ${token}`}});
                const data = await res.json().catch(() => ({}));

                if (!cancelled && res.ok && typeof data.inWishlist === "boolean") {
                    setInWishlist(data.inWishlist);

                    const key = cacheKey(userId, productId);
                    if (data.inWishlist) {
                        localStorage.setItem(key, "1");
                    } else {
                        localStorage.removeItem(key);
                    }
                }
            } catch (e) {
                console.error("Wishlist hydrate error:", e);
            } finally {
                if (!cancelled) setInitLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [productId, userId, token, initialInWishlist]);

    const addToWishlist = async () => {
        if (!productId || loading || inWishlist) return;

        setLoading(true);
        resetMessage();

        if (!token) {
            setLoading(false);
            setMessage({type: "error", text: "You must be logged in"});
            return;
        }

        try {
            const response = await withMinDelay(fetch(`${BASE_URL}/user/wishlist`, {
                method: "POST", headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${token}`,
                }, body: JSON.stringify({productId}),
            }));

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setInWishlist(true);

                if (userId) localStorage.setItem(cacheKey(userId, productId), "1");

                setMessage({
                    type: "success",
                    text: data?.message || (data?.created ? "This product has been successfully added to your wishlist! You can view all your saved items anytime from your wishlist page." : "This product is already in your wishlist — you can find it there whenever you’re ready to check it out!"),
                });
            } else {
                if (response.status === 401) {
                    setMessage({
                        type: "error", text: "Unauthorized. Please log in again.",
                    });
                } else if (response.status === 403) {
                    setMessage({
                        type: "error", text: "Forbidden. Your account is not allowed to do this.",
                    });
                } else if (data?.errors) {
                    const errorList = data.errors.map((e) => e.message);
                    setMessage({type: "error", text: errorList});
                } else {
                    setMessage({
                        type: "error", text: data?.message || "Failed to add to wishlist",
                    });
                }
            }
        } catch (err) {
            console.error("Add to wishlist error:", err);
            setMessage({type: "error", text: "Error connecting to server"});
        } finally {
            setLoading(false);
        }
    };

    return {inWishlist, loading, initLoading, message, addToWishlist, dismissMessage: resetMessage};
};
