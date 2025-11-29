import {body} from "express-validator";

export const registerValidation = [body("name")
    .trim()
    .notEmpty().withMessage("Name is required")
    .isLength({min: 2, max: 50}).withMessage("Name must be 2–50 characters long"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Email is not valid"),

    body("password")
        .notEmpty().withMessage("Password is required")
        .isLength({min: 6, max: 100}).withMessage("Password must be at least 6 characters"),

    body("confirmPassword")
        .notEmpty().withMessage("Confirm Password is required")
        .custom((value, {req}) => {
            if (value !== req.body.password) {
                throw new Error("Passwords do not match");
            }
            return true;
        })];
