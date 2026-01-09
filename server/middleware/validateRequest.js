import {validationResult} from "express-validator";

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error();
        error.status = 400;
        error.errors = errors.array();
        return next(error);
    }
    next();
};