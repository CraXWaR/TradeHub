import {useMemo} from "react";

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FEE = 4.99;
const TAX_RATE = 0.1;

export function useCartTotals(items, applyGiftWrap) {
    const getItemUnitPrice = (item) => {
        const selectedVariant = item.variants?.find((variant) => variant.id === item.selectedVariantId);
        return selectedVariant?.price ?? item.price;
    };

    return useMemo(() => {
        const subtotalRaw = items.reduce((subtotal, item) => subtotal + getItemUnitPrice(item) * (item.quantity || 1), 0);
        const shipping = subtotalRaw === 0 || subtotalRaw >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

        const tax = +(subtotalRaw * TAX_RATE).toFixed(2);
        const giftWrapFee = applyGiftWrap ? 4 : 0;

        const total = +(subtotalRaw + shipping + tax + giftWrapFee).toFixed(2);

        return {
            subtotal: +subtotalRaw.toFixed(2), shipping, tax, total, freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        };
    }, [items, applyGiftWrap]);
}