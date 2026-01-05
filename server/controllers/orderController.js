import {createOrder} from "../services/orderService.js";
import {FRIENDLY_MESSAGES} from "../utils/messages.js";

export const placeOrder = async (req, res, next) => {
    try {
        const {shippingDetails, items, totals, applyGiftWrap} = req.body;

        if (!items || items.length === 0) {
            const error = new Error(FRIENDLY_MESSAGES[400]);
            error.status = 400;
            return next(error);
        }

        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
        const hasMissingFields = requiredFields.some(field => !shippingDetails[field] || shippingDetails[field].trim() === "");

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?\d{7,15}$/;
        const cleanPhone = shippingDetails.phone?.replace(/\s/g, '') || "";

        if (hasMissingFields || !emailRegex.test(shippingDetails.email) || !phoneRegex.test(cleanPhone)) {
            const error = new Error(FRIENDLY_MESSAGES[422]);
            error.status = 422;
            return next(error);
        }

        const orderData = {
            first_name: shippingDetails.firstName,
            last_name: shippingDetails.lastName,
            email: shippingDetails.email,
            phone_number: shippingDetails.phone,
            address: shippingDetails.address,
            city: shippingDetails.city,
            postal_code: shippingDetails.postalCode,
            country: shippingDetails.country,
            subtotal: totals.subtotal,
            shipping: totals.shipping,
            tax: totals.tax,
            total: totals.total,
            apply_gift_wrap: applyGiftWrap || false,
            user_id: req.user?.id || null
        };

        const normalizedItems = items.map(item => {
            const itemPrice = item.unitPrice || item.price;
            const variantId = item.selectedVariantId || item.variant_id || null;

            return {
                product_id: item.id, variant_id: variantId, quantity: item.quantity || 1, price: itemPrice
            };
        });

        const newOrder = await createOrder(orderData, normalizedItems);

        res.status(201).json({
            success: true, message: FRIENDLY_MESSAGES[201], orderId: newOrder.id
        });

    } catch (error) {
        next(error);
    }
};