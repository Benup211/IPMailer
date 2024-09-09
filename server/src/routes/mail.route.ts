import { Router } from 'express';
import { GlobalMiddleware } from '../middleware/global.middleware';
import { MailValidator } from '../validators/mail.validator';
import { MailController } from "../controllers/mail.controller";

class MailRoute {
    public router:Router=Router();
    constructor(){
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes(){
        this.router.get('/get-mails',GlobalMiddleware.CheckAuth,MailController.getMails);
        this.router.get('/get-draft-mails',GlobalMiddleware.CheckAuth,MailController.getDraftMails);
    }
    postRoutes(){
        this.router.post('/create-mail',GlobalMiddleware.CheckAuth,MailValidator.Mail(),GlobalMiddleware.CheckValidationResult,MailController.createMail);
        this.router.post('/delete-mail',GlobalMiddleware.CheckAuth,MailValidator.DeleteMail(),GlobalMiddleware.CheckValidationResult,MailController.deleteMail);
        this.router.post('/create-draft-mail',GlobalMiddleware.CheckAuth,MailValidator.Mail(),GlobalMiddleware.CheckValidationResult,MailController.createDraftMail);
        this.router.post('/delete-draft-mail',GlobalMiddleware.CheckAuth,MailValidator.DeleteMail(),GlobalMiddleware.CheckValidationResult,MailController.deleteDraftMail);
    }
}
export default new MailRoute().router;