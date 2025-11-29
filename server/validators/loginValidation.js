import {body} from "express-validator";

export const loginValidation = [body("email")
    .trim()
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Email is not valid"),

    body("password")
        .notEmpty().withMessage("Password is required")];
