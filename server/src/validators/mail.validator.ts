import { body } from "express-validator";

export class MailValidator{
    static Mail(){
        return[
            body("subject")
            .notEmpty()
            .withMessage("Subject is required")
            .isLength({max: 20})
            .withMessage("Subject must be less than 20 characters"),
            body("message")
            .notEmpty()
            .withMessage("Message is required")
        ];
    }
    static DeleteMail(){
        return[
            body("id")
            .notEmpty()
            .withMessage("Id is required")
        ]
    }
}