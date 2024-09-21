import { Router } from "express";
import { GlobalMiddleware } from "../middleware/global.middleware";
import { AdminController } from "../controllers/admin.controller";
import { AdminValidator } from "../validators/admin.validator";
class AdminAuthRoute {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
        this.putRoutes();
    }
    getRoutes() {
        this.router.get(
            "/clients",
            GlobalMiddleware.CheckAdminAuth,
            AdminController.getAllClients
        );
        this.router.get("/logout", AdminController.logoutAdmin);
        this.router.get(
            "/getAdmin",
            GlobalMiddleware.CheckAdminAuth,
            AdminController.getAdmin
        );
    }
    postRoutes() {
        this.router.post(
            "/login",
            AdminValidator.loginAdmin(),
            GlobalMiddleware.CheckValidationResult,
            AdminController.loginAdmin
        );
    }
    putRoutes() {
        this.router.put(
            "/block-or-unblock-user",
            AdminValidator.blockOrUnblockClient(),
            GlobalMiddleware.CheckValidationResult,
            GlobalMiddleware.CheckAdminAuth,
            AdminController.blockOrUnblockClient
        );
    }
}
export default new AdminAuthRoute().router;
