import {createOrder, getAllOrdersFromDb, getOrderByUserId, updateOrderStatusInDb} from "../services/orderService.js";
import {FRIENDLY_MESSAGES} from "../utils/messages.js";

export const placeOrder = async (req, res, next) => {
    try {
        const {shippingDetails, items, totals, applyGiftWrap} = req.body;

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

        const normalizedItems = items.map(item => ({
            product_id: item.id,
            variant_id: item.selectedVariantId || item.variant_id || null,
            quantity: item.quantity || 1,
            price: item.unitPrice || item.price
        }));

        const newOrder = await createOrder(orderData, normalizedItems);

        res.status(201).json({
            success: true, message: FRIENDLY_MESSAGES[201], orderId: newOrder.id
        });

    } catch (error) {
        next(error);
    }
};

export const getAllOrders = async (req, res, next) => {
    try {
        const orders = await getAllOrdersFromDb();

        if (!orders) {
            const error = new Error(FRIENDLY_MESSAGES[404]);
            error.status = 404;
            return next(error);
        }

        res.status(200).json({
            success: true, message: FRIENDLY_MESSAGES[200], data: orders
        })
    } catch (error) {
        next(error);
    }
}

export const getUserOrders = async (req, res, next) => {
    try {
        const userId = req.user.id;

        if (!userId) {
            return res.status(401).json({
                success: false, message: FRIENDLY_MESSAGES[401]
            });
        }

        const orders = await getOrderByUserId(userId);

        res.status(200).json({
            success: true, message: FRIENDLY_MESSAGES[200], data: orders
        });
    } catch (error) {
        next(error);
    }
}

export const updateOrderStatus = async (req, res, next) => {
    try {
        const {id} = req.params;
        const {status} = req.body;

        if (!status) {
            const error = new Error(FRIENDLY_MESSAGES[400] || "Status is required");
            error.statusCode = 400;
            throw error;
        }

        const updatedOrderStatus = await updateOrderStatusInDb(id, status);

        res.status(200).json({
            success: true, message: FRIENDLY_MESSAGES[200], data: updatedOrderStatus
        })

    } catch (error) {
        next(error);
    }
}