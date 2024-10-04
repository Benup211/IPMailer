import { ResponseService } from "../services";
import { Request, Response, NextFunction } from "express";
import path from "path";
export class UploadController{

    static async uploadFile(req: Request, res: Response, next: NextFunction) {
        try {
            if(!req.file){
                return ResponseService.CreateErrorResponse("No file uploaded", 400);
            }
            return ResponseService.CreateSuccessResponse(req.file.path, 200, res);
        } catch (error) {
            next(error);
        }
    }
    static async getUploadedFile(req: Request, res: Response, next: NextFunction) {
        try{
            const fileName=req.params.fileName;
            const ImagePath = path.join(__dirname, "../../public/mailImage", fileName);
            res.sendFile(ImagePath, (err) => {
                res.status(404).json({ message: "File not found" });
            });

        }catch(error){
            next(error);
        }
    }
}