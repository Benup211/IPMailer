import { Router } from "express";
import { UploadController } from "../controllers/upload.controller";
import { upload } from "../services";
import { UploadValidator } from "../validators/upload.validator";
import { GlobalMiddleware } from "../middleware/global.middleware";
class UploadRoute {
    public router: Router = Router();
    constructor() {
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes() {
        this.router.get(
            "/get/:fileName",
            UploadController.getUploadedFile
        );
    }
    postRoutes() {
        this.router.post(
            "/upload",
            upload.single("image"),
            (req, res, next) => {
                UploadController.uploadFile(req, res, next);
            }
        );
    }
}

export default new UploadRoute().router;
