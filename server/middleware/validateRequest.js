import {validationResult} from "express-validator";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("invalid: Validation failed");
        error.status = 400;
        error.errors = errors.array().map(err => err.msg);
        return next(error);
    }
    next();
};