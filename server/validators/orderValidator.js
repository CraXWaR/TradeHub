import {FRIENDLY_MESSAGES} from "../utils/messages.js";

export const orderValidator = (req, res, next) => {
    const {shippingDetails, items} = req.body;

    if (!items || items.length === 0) {
        const error = new Error(FRIENDLY_MESSAGES[400]);
        error.status = 400;
        return next(error);
    }

    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'postalCode', 'country'];
    const hasMissingFields = requiredFields.some(field => !shippingDetails?.[field] || shippingDetails[field].trim() === "");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?\d{7,15}$/;
    const cleanPhone = shippingDetails?.phone?.replace(/\s/g, '') || "";

    if (hasMissingFields || !emailRegex.test(shippingDetails?.email) || !phoneRegex.test(cleanPhone)) {
        const error = new Error(FRIENDLY_MESSAGES[422]);
        error.status = 422;
        return next(error);
    }

    next();
};