import { useState, useCallback } from "react";

const BASE_URL = import.meta.env.VITE_API_URL || '';

export function useRestoreProduct({ onRestored, delayMs = 2000 } = {}) {
    const [loading, setLoading] = useState(false);

    const restoreProduct = useCallback(async (id) => {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}/api/products/${id}/restore`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const data = await response.json();

            if (!response.ok || !data?.success) {
                throw new Error(data?.message || `Failed to restore product (HTTP ${response.status})`);
            }
            
            await new Promise((r) => setTimeout(r, delayMs));
            onRestored?.(id);
        } catch (err) {
            console.error("Error restoring product:", err);
            alert(err?.message || "Failed to restore product");
        } finally {
            setLoading(false);
        }
    }, [onRestored]);

    return { restoreProduct, loading };
}