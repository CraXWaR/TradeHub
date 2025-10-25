import { useState, useCallback } from "react";

export function useCart() {
    const [isBusy, setIsBusy] = useState(false);

    const addToCart = useCallback(async (productId) => {
        setIsBusy(true);
        try {
            // placeholder logic to test — wire API in future
            console.log("Adding product", productId, "to cart...");
            await new Promise((r) => setTimeout(r, 800));
            alert(`Product ${productId} added to cart!`);
        } catch (err) {
            console.error(err);
            alert("Failed to add to cart.");
        } finally {
            setIsBusy(false);
        }
    }, []);

    return { addToCart, isBusy };
}
