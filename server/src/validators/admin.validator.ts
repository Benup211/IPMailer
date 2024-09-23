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
    static deleteClient(){
        return [
            body("userID").notEmpty().withMessage("User id is required")
        ];
    }
    static addClient() {
        return [
            body("email")
            .notEmpty()
            .withMessage("Email is required").isEmail().withMessage("Invalid Email Address"),
            body("password")
                .notEmpty()
                .withMessage("Password is required")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
                )
                .withMessage(
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
                ),
            body("confirmPassword")
                .notEmpty()
                .withMessage("Confirm Password is required")
                .custom((value, { req }) => value === req.body.password)
                .withMessage(
                    "Confirm Password must be the same as the Password"
                ),
            body("organization")
                .notEmpty()
                .withMessage("Organization is required"),
            body("active")
                .notEmpty()
                .withMessage("Active is required")
        ];
    }
    static loginClient(){
        return [
            body("id").notEmpty().withMessage("Id is required")
        ];
    }
}