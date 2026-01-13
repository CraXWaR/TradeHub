import {useState, useEffect, useRef, useCallback} from 'react';

const BASE_URL = import.meta.env.VITE_API_URL || '';

export const useUserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const isMounted = useRef(true);

    const fetchUserOrders = useCallback(async () => {
        const startTime = Date.now();
        const minWait = 1500;

        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token");

            const response = await fetch(`${BASE_URL}/api/orders/my-orders`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });

            const result = await response.json();

            const elapsed = Date.now() - startTime;
            if (elapsed < minWait) {
                await new Promise(resolve => setTimeout(resolve, minWait - elapsed));
            }

            if (isMounted.current) {
                if (result.success) {
                    setOrders(result.data || []);
                } else {
                    setError(result.message || "Failed to fetch orders");
                }
            }
            // eslint-disable-next-line no-unused-vars
        } catch (err) {
            if (isMounted.current) {
                setError("Could not load your orders. Please check your connection.");
            }
        } finally {
            if (isMounted.current) {
                setLoading(false);
            }
        }
    }, [])

    useEffect(() => {
        isMounted.current = true;
        fetchUserOrders();
        return () => {
            isMounted.current = false;
        };
    }, [fetchUserOrders]);

    return {orders, loading, error, refetch: fetchUserOrders};
};