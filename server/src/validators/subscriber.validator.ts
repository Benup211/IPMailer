import { body } from "express-validator";

export class SubscriberValidator {
    static addSubscriber() {
        return [
            body("userID").notEmpty().withMessage("User ID is required"),
            body("userID").notEmpty().withMessage("User ID is required"),
        ];
    }
}
