import {FRIENDLY_MESSAGES} from "../utils/messages.js";

export function errorHandler(err, req, res, next) {
    let status = err?.status || 500;

    const rawMessage = String(err?.message || "");
    const rawDetail = String(err?.detail || "");

    if (!err?.status) {
        if (rawDetail === "Unauthorized" || rawMessage === "Unauthorized") status = 401;
        else if (rawDetail === "Product not found" || rawMessage === "Product not found") status = 404;
        else if (/invalid|required/i.test(rawDetail) || /invalid|required/i.test(rawMessage)) status = 400;
    }

    const message = FRIENDLY_MESSAGES[status] || FRIENDLY_MESSAGES[500];

    console.error("[Error]", {
        status,
        path: req.originalUrl,
        method: req.method,
        rawMessage,
        rawDetail,
        stack: err?.stack,
    });

    res.status(status).json({message});
}
