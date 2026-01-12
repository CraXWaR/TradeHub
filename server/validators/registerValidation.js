import {body} from "express-validator";

export const registerValidation = [body("name")
        .trim()
        .notEmpty().withMessage("Name is required")
        .isLength({min: 2, max: 50}).withMessage("Name must be 2–50 characters long"),

        body("email")
            .trim()
            .notEmpty().withMessage("Email is required")
            .isEmail().withMessage("Please enter a valid email address")
            .isLength({max: 255}).withMessage("Email is too long")
            .normalizeEmail({
                all_lowercase: true,
                gmail_remove_dots: false,
            })
            .custom((value) => {
                const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                const domain = value.split('@')[1];
                if (domain && !domainPattern.test(domain)) {
                    throw new Error("Email domain is invalid");
                }
                return true;
            }),

        body("password")
            .notEmpty().withMessage("Password is required")
            .isLength({min: 8}).withMessage("Password must be at least 8 characters long")
            .custom((value) => {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

                if (!passwordRegex.test(value)) {
                    throw new Error(
                        "Password must contain at least one uppercase letter, one number, and one special character"
                    );
                }
                return true;
            }),

        body("confirmPassword")
            .trim()
            .notEmpty().withMessage("Confirm Password is required")
            .custom((value, {req}) => {
                if (value !== req.body.password) {
                    throw new Error("Passwords do not match");
                }
                return true;
            })
    ]
;