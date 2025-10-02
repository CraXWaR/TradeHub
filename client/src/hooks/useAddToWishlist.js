import {useState} from "react";
import {useFormHandler} from "./useFormHandler";

const BASE_URL = import.meta.env.VITE_API_URL;

export const useAddToWishlist = (initialInWishlist = false) => {
    const [inWishlist, setInWishlist] = useState(!!initialInWishlist);

    const {
        loading,
        setLoading,
        message,
        setMessage,
        resetMessage,
        withMinDelay
    } = useFormHandler();

    const addToWishlist = async (productId) => {
        if (!productId || loading || inWishlist) return;

        setLoading(true);
        resetMessage();

        // get and normalize token
        let token = localStorage.getItem("token") || "";
        if (token.startsWith("Bearer ")) token = token.slice(7);

        if (!token) {
            setLoading(false);
            setMessage({type: "error", text: "You must be logged in"});
            return;
        }

        try {
            const response = await withMinDelay(
                fetch(`${BASE_URL}/user/wishlist`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({productId}),
                })
            );

            const data = await response.json().catch(() => ({}));

            if (response.ok) {
                setInWishlist(true);
                setMessage({
                    type: "success",
                    text: data?.message || (data?.created ? "Added to wishlist" : "Already in wishlist"),
                });
            } else {
                // show 401/403 distinctly (helps debugging)
                if (response.status === 401) {
                    setMessage({type: "error", text: "Unauthorized. Please log in again."});
                } else if (response.status === 403) {
                    setMessage({type: "error", text: "Forbidden. Your account is not allowed to do this."});
                } else if (data?.errors) {
                    const errorList = data.errors.map((e) => e.message);
                    setMessage({type: "error", text: errorList});
                } else {
                    setMessage({type: "error", text: data?.message || "Failed to add to wishlist"});
                }
            }
        } catch (err) {
            console.error("Add to wishlist error:", err);
            setMessage({type: "error", text: "Error connecting to server"});
        } finally {
            setLoading(false);
        }
    };

    return {inWishlist, loading, message, addToWishlist};
};
