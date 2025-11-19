import { useState, useCallback } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

export function useDeleteProduct({ onDeleted, delayMs = 2000 } = {}) {
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [pendingId, setPendingId] = useState(null);
    const [modalLoading, setModalLoading] = useState(false); // spinner only in modal

    const requestDelete = useCallback((id) => {
        setPendingId(id);
        setConfirmOpen(true);
    }, []);

    const cancelDelete = useCallback(() => {
        if (modalLoading) return;
        setConfirmOpen(false);
        setPendingId(null);
    }, [modalLoading]);

    const confirmDelete = useCallback(async () => {
        if (!pendingId) return;
        setModalLoading(true);

        try {
            const response = await fetch(`${BASE_URL}/api/products/${pendingId}`, {
                method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
            });
            let data = null;
            try {
                data = await response.json();
            } catch {
                // ignore empty body (e.g. 204)
            }

            if (!response.ok || !(data?.success ?? response.ok)) {
                const msg = data?.message || `Failed to delete product (HTTP ${response.status})`;
                throw new Error(msg);
            }

            await new Promise((r) => setTimeout(r, delayMs));
            onDeleted?.(pendingId);

            setConfirmOpen(false);
            setPendingId(null);
        } catch (err) {
            console.error("Error deleting product:", err);
            alert(err?.message || "Failed to delete product");
            setConfirmOpen(false);
            setPendingId(null);
        } finally {
            setModalLoading(false);
        }
    }, [pendingId, onDeleted, delayMs]);

    return {
        confirmOpen,
        pendingId,
        modalLoading,
        requestDelete,
        cancelDelete,
        confirmDelete,
    };
}
