import { Router } from "express";
import { GlobalMiddleware } from "../middleware/global.middleware";
import { SmtpController } from "../controllers/smtp.controller";
import { SmtpValidator } from "../validators/smtp.validator";
class Smtp {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get(
            "/get-smtp",
            GlobalMiddleware.CheckAuth,
            SmtpController.getSmtpByUserId
        );
    }
    postRoutes() {
        this.router.post(
            "/create-smtp",
            GlobalMiddleware.CheckAuth,
            SmtpValidator.createSmtp(),
            GlobalMiddleware.CheckValidationResult,
            SmtpController.createSmtp
        );
        this.router.put(
            "/update-smtp",
            GlobalMiddleware.CheckAuth,
            SmtpValidator.updateSmtp(),
            GlobalMiddleware.CheckValidationResult,
            SmtpController.updateSmtp
        );
        this.router.delete(
            "/delete-smtp/:id",
            GlobalMiddleware.CheckAuth,
            SmtpValidator.deleteSmtp(),
            GlobalMiddleware.CheckValidationResult,
            SmtpController.deleteSmtp
        );
    }
}
export default new Smtp().router;
