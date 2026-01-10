import {useEffect, useMemo, useState, useCallback} from "react";
import {useFormHandler} from "../useFormHandler.js";

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

export const useWishlist = (productId, initialInWishlist = undefined) => {
    const {loading, setLoading, message, setMessage, resetMessage, withMinDelay,} = useFormHandler();

    const [inWishlist, setInWishlist] = useState(!!initialInWishlist);
    const [action, setAction] = useState(initialInWishlist === undefined ? "init" : "idle");

    const token = useMemo(getToken, []);
    const userId = useMemo(() => {
        const payload = parseJwt(token);
        return payload?.id || payload?.sub || null;
    }, [token]);

    const isBusy = action !== "idle" || loading;

    // ---- Hydrate on mount / productId change ----
    useEffect(() => {
        let cancelled = false;

        if (!productId) {
            setAction("idle");
            return;
        }

        if (initialInWishlist !== undefined) {
            setAction("idle");
        } else if (userId) {
            const cached = localStorage.getItem(cacheKey(userId, productId));
            if (cached === "1") setInWishlist(true);
        }

        if (!token || !userId) {
            setAction("idle");
            return;
        }

        (async () => {
            try {
                const res = await fetch(
                    `${BASE_URL}/user/wishlist/status?productId=${productId}`,
                    {headers: {Authorization: `Bearer ${token}`}}
                );
                const data = await res.json().catch(() => ({}));

                if (!cancelled && res.ok && typeof data.inWishlist === "boolean") {
                    setInWishlist(data.inWishlist);
                    const key = cacheKey(userId, productId);
                    if (data.inWishlist) localStorage.setItem(key, "1");
                    else localStorage.removeItem(key);
                }
            } catch (e) {
                console.error("Wishlist hydrate error:", e);
            } finally {
                if (!cancelled) setAction("idle");
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [productId, userId, token, initialInWishlist]);

    // ---- Add ----
    const add = useCallback(async () => {
        if (!productId || isBusy || inWishlist) return;

        resetMessage();
        if (!token) {
            setMessage({type: "error", text: "You must be logged in"});
            return;
        }

        setAction("adding");
        setLoading(true);

        try {
            const response = await withMinDelay(fetch(`${BASE_URL}/user/wishlist`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({productId}),
            }));

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setInWishlist(true);
                if (userId) localStorage.setItem(cacheKey(userId, productId), "1");
                setMessage({
                    type: "success",
                    text:
                        data?.message ||
                        (data?.created
                            ? "This product has been successfully added to your wishlist! You can view all your saved items anytime from your wishlist page."
                            : "This product is already in your wishlist — you can find it there whenever you’re ready to check it out!"),
                });
            } else {
                if (response.status === 401)
                    setMessage({type: "error", text: "Unauthorized. Please log in again."});
                else if (response.status === 403)
                    setMessage({type: "error", text: "Forbidden. Your account is not allowed to do this."});
                else if (data?.errors)
                    setMessage({type: "error", text: data.errors.map(e => e.message)});
                else
                    setMessage({type: "error", text: data?.message || "Failed to add to wishlist"});
            }
        } catch (err) {
            console.error("Add to wishlist error:", err);
            setMessage({type: "error", text: "Error connecting to server"});
        } finally {
            setLoading(false);
            setAction("idle");
        }
    }, [productId, token, userId, isBusy, inWishlist, resetMessage, setMessage, setLoading, withMinDelay]);

    // ---- Remove ----
    const remove = useCallback(async () => {
        if (!productId || isBusy || !inWishlist) return;

        resetMessage();
        if (!token) {
            setMessage({type: "error", text: "You must be logged in"});
            return;
        }

        setAction("removing");
        setLoading(true);

        try {
            const response = await withMinDelay(fetch(
                `${BASE_URL}/user/wishlist/remove?productId=${productId}`,
                {method: "DELETE", headers: {Authorization: `Bearer ${token}`}}
            ));
            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setInWishlist(false);
                if (userId) localStorage.removeItem(cacheKey(userId, productId));
                setMessage({type: "success", text: data?.message || "Removed from your wishlist."});
            } else {
                if (response.status === 401)
                    setMessage({type: "error", text: "Unauthorized. Please log in again."});
                else if (response.status === 403)
                    setMessage({type: "error", text: "Forbidden. Your account is not allowed to do this."});
                else if (data?.errors)
                    setMessage({type: "error", text: data.errors.map(e => e.message)});
                else
                    setMessage({type: "error", text: data?.message || "Failed to remove from wishlist"});
            }
        } catch {
            setMessage({type: "error", text: "Error connecting to server"});
        } finally {
            setLoading(false);
            setAction("idle");
        }
    }, [productId, token, userId, isBusy, inWishlist, resetMessage, setMessage, setLoading, withMinDelay]);

    const toggle = useCallback(() => (inWishlist ? remove() : add()), [inWishlist, add, remove]);

    return {
        inWishlist,
        isBusy,
        message,
        toggleWishlist: toggle,
        dismissMessage: resetMessage,
    };
};
