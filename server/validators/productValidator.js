import { body } from "express-validator";

export const productValidation = [
    body("title")
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3, max: 100 }).withMessage("Title must be 3–100 characters long"),

    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 10, max: 1000 }).withMessage("Description must be 10–1000 characters long"),

    body("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ gt: 0, lt: 1000000 }).withMessage("Price must be a number greater than 0 and less than 1,000,000"),

    body("image")
        .optional()
        .isURL().withMessage("Image must be a valid URL if provided")
];
