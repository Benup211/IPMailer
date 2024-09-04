import { Router } from 'express';
import { GlobalMiddleware } from '../middleware/global.middleware';
import { TokenController } from '../controllers/token.controller';
import { TokenValidator } from '../validators/token.validator';

class TokenRoute{
    public router:Router=Router();
    constructor(){
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes(){
        this.router.get('/verify-email/:verification_id',TokenValidator.verifyEmail(),GlobalMiddleware.CheckValidationResult,TokenController.verifyEmail);
    }
    postRoutes(){
        this.router.post('/verify-two-factor',TokenValidator.verifyTwoFactor(),GlobalMiddleware.CheckValidationResult,TokenController.verifyTwoFactor);
    }
}

export default new TokenRoute().router;