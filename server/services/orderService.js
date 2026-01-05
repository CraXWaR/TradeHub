import {Order, OrderItem, sequelize} from "../models/index.js";

export const createOrder = async (orderData, items) => {
    const transaction = await sequelize.transaction();
    console.log(orderData.phone_number);
    try {
        const order = await Order.create(orderData, {transaction});

        const orderItemsData = items.map(item => ({
            order_id: order.id,
            product_id: item.product_id,
            variant_id: item.variant_id || null,
            quantity: item.quantity,
            price: item.price
        }));

        await OrderItem.bulkCreate(orderItemsData, {transaction});
        await transaction.commit();

        return order.get({plain: true});
    } catch (error) {
        if (transaction) await transaction.rollback();

        throw {
            status: error.status || 500,
            message: "Failed to create order",
            detail: error.message || "An unexpected error occurred during checkout",
            stack: error.stack
        };
    }
};