import {FRIENDLY_MESSAGES} from "../utils/messages.js";

export function errorHandler(err, req, res, next) {
    const status = err?.status || 500;
    const rawMessage = err?.message || "";

    let validationErrors = null;
    if (err.errors && Array.isArray(err.errors)) {
        validationErrors = err.errors.map(e => e.msg || e);
    }

    let message;

    if (validationErrors && validationErrors.length > 0) {
        message = validationErrors[0];
    } else if (rawMessage && rawMessage !== "Unauthorized" && !rawMessage.includes("500")) {
        message = rawMessage.replace("invalid: ", "");
    } else {
        message = FRIENDLY_MESSAGES[status] || FRIENDLY_MESSAGES[500];
    }

    res.status(status).json({
        success: false,
        message: message,
        errors: validationErrors
    });
}