import {useState, useEffect, useCallback} from 'react';

const BASE_URL = import.meta.env.VITE_API_URL;

export const useOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const fetchOrders = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            // simulating fake loading state
            await new Promise(resolve => setTimeout(resolve, 3000));

            const response = await fetch(`${BASE_URL}/api/orders`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Грешка при зареждане");
            }

            const result = await response.json();

            if (result.success) {
                setOrders(result.data);
            }
        } catch (err) {
            setError(err.message);
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

    const openOrder = (order) => {
        setSelectedOrder(order);
    };

    const closePanel = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedOrder(null);
            setIsClosing(false);
        }, 400);
    };

    return {
        orders, loading, error, selectedOrder, isClosing, fetchOrders, openOrder, closePanel
    };
};