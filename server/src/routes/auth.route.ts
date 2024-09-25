import { Router } from 'express';
import { GlobalMiddleware } from '../middleware/global.middleware';
import { AuthController } from '../controllers/auth.controller';
import { AuthValidator } from '../validators/auth.validator';
class AuthRoute{
    public router:Router=Router();
    constructor(){
        this.getRoutes();
        this.postRoutes();
        this.deleteRoutes();
    }
    getRoutes(){
        this.router.get('/logout',AuthController.logoutUser);
        this.router.get('/getUser',GlobalMiddleware.CheckAuth,AuthController.getUser);
    }
    postRoutes(){
        this.router.post('/register',AuthValidator.registerUser(),GlobalMiddleware.CheckValidationResult,AuthController.registerUser);
        this.router.post('/login',AuthValidator.loginUser(),GlobalMiddleware.CheckValidationResult,AuthController.loginUser);
        this.router.post('/reset-password',AuthValidator.resetPassword(),GlobalMiddleware.CheckValidationResult,AuthController.resetPassowrdLink);
        this.router.post('/change-password',AuthValidator.changePassword(),GlobalMiddleware.CheckValidationResult,GlobalMiddleware.CheckAuth,AuthController.changePassword);
    }
    deleteRoutes(){
        this.router.delete('/delete-user',GlobalMiddleware.CheckAuth,AuthController.deleteUser);
    }
}
export default new AuthRoute().router;