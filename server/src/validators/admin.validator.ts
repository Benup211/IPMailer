import { body } from "express-validator";

export class AdminValidator{

    static loginAdmin(){
        return [
            body("username").notEmpty().withMessage("Username is required"),
            body("password").notEmpty().withMessage("Password is required")
        ];
    };
    static blockOrUnblockClient(){
        return [
            body("userID").notEmpty().withMessage("User id is required"),
            body("blocked").notEmpty().withMessage("Blocked is required")
        ];
    }
}