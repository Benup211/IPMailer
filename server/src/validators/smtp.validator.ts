import { body,param } from "express-validator";
export class SmtpValidator {
    static createSmtp() {
        return [
            body("host").isString().notEmpty().withMessage("Host is required"),
            body("port").isNumeric().notEmpty().withMessage("Port is required"),
            body("username")
                .isString()
                .notEmpty()
                .withMessage("Username is required"),
            body("password")
                .isString()
                .notEmpty()
                .withMessage("Password is required"),
        ];
    }
    static updateSmtp() {
        return [
            body("host").isString().notEmpty().withMessage("Host is required"),
            body("port").isNumeric().notEmpty().withMessage("Port is required"),
            body("username")
                .isString()
                .notEmpty()
                .withMessage("Username is required"),
            body("password")
                .isString()
                .notEmpty()
                .withMessage("Password is required"),
            body("id").isNumeric().notEmpty().withMessage("Id is required"),
        ];
    }
    static deleteSmtp() {
        return [
            param("id").isNumeric().notEmpty().withMessage("Id is required")
        ];
    }
}
