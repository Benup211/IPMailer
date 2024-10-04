import {body,param} from "express-validator";

export class UploadValidator {
    static uploadFile() {
        return [
            body("image").notEmpty().withMessage("No file uploaded"),
        ];
    }
    static getUploadedFile() {
        return [
            param("fileName").notEmpty().withMessage("File name is required"),
        ];
    }
}