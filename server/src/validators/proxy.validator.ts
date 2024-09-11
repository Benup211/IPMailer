import { body, param } from "express-validator";

export class ProxyValidator {
    static addProxy() {
        return [
            body("host")
                .isString()
                .withMessage("Host must be a string")
                .notEmpty()
                .withMessage("Host is required"),
            body("port")
                .isNumeric()
                .withMessage("Port must be a number")
                .notEmpty()
                .withMessage("Port is required"),
        ];
    }
    static deleteProxy() {
        return [
            param("id")
                .isNumeric()
                .withMessage("Id must be a number")
                .notEmpty()
                .withMessage("Id is required"),
        ];
    }
}
