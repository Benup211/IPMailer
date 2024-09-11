import { Router } from "express";
import { GlobalMiddleware } from "../middleware/global.middleware";
import { ProxyController } from "../controllers/proxy.controller";
import { ProxyValidator } from "../validators/proxy.validator";
class Proxy {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get(
            "/get-proxy",
            GlobalMiddleware.CheckAuth,
            ProxyController.getProxyServers
        );
    }
    postRoutes() {
        this.router.post(
            "/create-proxy",
            GlobalMiddleware.CheckAuth,
            ProxyValidator.addProxy(),
            GlobalMiddleware.CheckValidationResult,
            ProxyController.addProxy
        );
        this.router.delete(
            "/delete-proxy/:id",
            GlobalMiddleware.CheckAuth,
            ProxyValidator.deleteProxy(),
            GlobalMiddleware.CheckValidationResult,
            ProxyController.deleteProxy
        );
    }
}
export default new Proxy().router;
