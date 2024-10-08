import { body } from "express-validator";

export class SubscriberValidator {
    static addSubscriber() {
        return [
            body("email").notEmpty().withMessage("User ID is required"),
            body("apiKey").notEmpty().withMessage("User ID is required"),
        ];
    }
    static deleteSubscriber() {
        return [
            body("id").notEmpty().withMessage("Subscriber ID is required"),
            body("userID").notEmpty().withMessage("User ID is required"),
        ];
    }
}
