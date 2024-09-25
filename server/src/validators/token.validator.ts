import { param, body } from "express-validator";

export class TokenValidator {
    static verifyEmail() {
        return [
            param("verification_id")
                .notEmpty()
                .withMessage("Verification ID is required"),
        ];
    }
    static verifyTwoFactor() {
        return [
            body("code").notEmpty().withMessage("Code is required"),
            body("id").notEmpty().withMessage("ID is required"),
        ];
    }
    static verifyResetPassword() {
        return [
            param("verification_id")
                .notEmpty()
                .withMessage("Verification ID is required"),
            body("password").notEmpty().withMessage("Password is required"),
            body("confirmPassword")
                .notEmpty()
                .withMessage("Confirm Password is required")
                .custom((value, { req }) => value === req.body.password)
                .withMessage(
                    "Confirm Password must be the same as the Password"
                ),
        ];
    }
}
