import {useState, useEffect} from 'react';

const BASE_URL = import.meta.env.VITE_API_URL;

export const useUserOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserOrders = async () => {
            try {
                setLoading(true);
                setError(null);
                const token = localStorage.getItem("token");

                await new Promise(resolve => setTimeout(resolve, 3000));

                const response = await fetch(`${BASE_URL}/api/orders/my-orders`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                const result = await response.json();

                if (result.success) {
                    setOrders(result.data);
                } else {
                    setError(result.message);
                }
                // eslint-disable-next-line no-unused-vars
            } catch (err) {
                setError("Could not load your orders. Please check your connection.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserOrders();
    }, []);

    return {orders, loading, error};
};