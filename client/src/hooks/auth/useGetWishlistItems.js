import {useCallback, useEffect, useMemo, useRef, useState} from "react";

const BASE_URL = import.meta.env.VITE_API_URL || '';

const getAuthData = () => {
    const token = localStorage.getItem("token")?.replace("Bearer ", "") || "";
    if (!token) return {token: "", userId: null};

    try {
        const payload = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
        return {token, userId: payload?.id || payload?.sub || null};
    } catch {
        return {token: "", userId: null};
    }
};

export const useGetWishlistItems = ({auto = true} = {}) => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(auto);
    const [error, setError] = useState(null);

    const {token, userId} = useMemo(getAuthData, []);
    const isMounted = useRef(true);

    const fetchWishlist = useCallback(async () => {
        if (!token || !userId) {
            setLoading(false);
            return;
        }

        const startTime = Date.now();
        const minWait = 1500;

        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`${BASE_URL}/user/wishlist`, {
                headers: {Authorization: `Bearer ${token}`}
            });

            const result = await response.json();

            const elapsed = Date.now() - startTime;
            if (elapsed < minWait) {
                await new Promise(resolve => setTimeout(resolve, minWait - elapsed));
            }

            if (isMounted.current) {
                if (result.success) {
                    const processedList = (result.items || []).reduce((accumulator, currentItem) => {
                        const productData = currentItem?.product;
                        if (productData) {
                            accumulator.push({
                                ...productData,
                                id: productData.id,
                                wishlistRecordId: currentItem.id
                            });
                        }
                        return accumulator;
                    }, []);

                    setItems(processedList);
                } else {
                    setError(result.message || "Failed to load wishlist");
                }
            }
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            if (isMounted.current) {
                setError("Could not load your wishlist. Please check your connection.");
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, [token, userId]);

    useEffect(() => {
        isMounted.current = true;
        if (auto) fetchWishlist();
        return () => {
            isMounted.current = false;
        };
    }, [auto, fetchWishlist]);

    return {
        items, loading, error, refetch: fetchWishlist, isAuthed: !!userId,
    };
};