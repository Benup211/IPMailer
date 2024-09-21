import { Request, Response, NextFunction } from "express";
import { AdminAuthRepository,AuthRepository } from "../repository/";
import { ResponseService, UserService, JwtService } from "../services";
import dotenv from "dotenv";
dotenv.config();
export class AdminController {
    static async loginAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            console.log(username, password);
            const admin = await AdminAuthRepository.findAdmin();
            console.log(admin);
            if (!admin) {
                const usernameFromEnv = process.env.ADMIN_USERNAME as string;
                const passwordFromEnv = process.env.ADMIN_PASSWORD as string;
                const hashedPassword = await UserService.hashPassword(
                    passwordFromEnv
                );
                const newAdmin = await AdminAuthRepository.createAdmin(
                    usernameFromEnv,
                    hashedPassword
                );
            }
            const adminFound = await AdminAuthRepository.findAdminByUsername(
                username
            );
            if (!adminFound) {
                next(
                    ResponseService.CreateErrorResponse(
                        "Invalid username or password",
                        401
                    )
                );
            }
            const isPasswordValid = adminFound
                ? await UserService.comparePassword(
                      password,
                      adminFound.password
                  )
                : false;
            if (!isPasswordValid) {
                next(
                    ResponseService.CreateErrorResponse(
                        "Invalid username or password",
                        401
                    )
                );
            }
            await JwtService.adminSign(
                res,
                { adminID: adminFound?.id },
                process.env.JWT_SECRET as string,
                { expiresIn: "7d" }
            );
            res.status(200).json({ admin: adminFound });
        } catch (error) {
            next(error);
        }
    }
    static async logoutAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("AdminToken");
            res.status(200).json({ message: "Logout successfully" });
        } catch (error) {
            next(error);
        }
    }
    static async getAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const id=req.body.adminID;
            const admin = await AdminAuthRepository.findAdminById(id);
            if(!admin){
                next(ResponseService.CreateErrorResponse("Admin not found",404));
            }
            res.status(200).json(admin);
        } catch (error) {
            next(error);
        }
    }
    static async getAllClients(req: Request, res: Response, next: NextFunction) {
        try {
            const clients = await AuthRepository.allUser();
            res.status(200).json({clients});
        } catch (error) {
            next(error);
        }
    }
    static async blockOrUnblockClient(req: Request, res: Response, next: NextFunction) {
        const {userID,blocked}=req.body;
        try {
            const user=await AuthRepository.findUserById(userID);
            if(!user){
                next(ResponseService.CreateErrorResponse("User not found",404));
            }
            const updatedUser=await AuthRepository.blockOrUnblockUser(userID,blocked);
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    }
}
