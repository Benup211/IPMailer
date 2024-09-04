import { param,body } from "express-validator";

export class TokenValidator {
    static verifyEmail() {
        return [
            param("verification_id").notEmpty().withMessage("Verification ID is required"),
        ];
    }
    static verifyTwoFactor() {
        return [
            body("code").notEmpty().withMessage("Code is required"),
            body("id").notEmpty().withMessage("ID is required"),
        ];
    }
}