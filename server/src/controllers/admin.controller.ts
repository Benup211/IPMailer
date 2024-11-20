import { Request, Response, NextFunction } from "express";
import { AdminRepository,AuthRepository } from "../repository/";
import { ResponseService, UserService, JwtService } from "../services";
import {sendAdminRegisterMail} from '../services/mail.service';
import dotenv from "dotenv";
dotenv.config();
export class AdminController {
    static async loginAdmin(req: Request, res: Response, next: NextFunction) {
        try {
            const { username, password } = req.body;
            const admin = await AdminRepository.findAdmin();
            if (!admin) {
                const usernameFromEnv = process.env.ADMIN_USERNAME as string;
                const passwordFromEnv = process.env.ADMIN_PASSWORD as string;
                const hashedPassword = await UserService.hashPassword(
                    passwordFromEnv
                );
                const newAdmin = await AdminRepository.createAdmin(
                    usernameFromEnv,
                    hashedPassword
                );
            }
            const adminFound = await AdminRepository.findAdminByUsername(
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
            const admin = await AdminRepository.findAdminById(id);
            if(!admin){
                next(ResponseService.CreateErrorResponse("Admin not found",404));
            }
            const clients=await AuthRepository.countUsers();
            res.status(200).json({admin,stats:{clients}});
        } catch (error) {
            next(error);
        }
    }
    static async getAllClients(req: Request, res: Response, next: NextFunction) {
        const skip = Number(req.query.skip) || 0; 
        const take = Number(req.query.take) || 5;
        try {
            const clients = await AuthRepository.allUser(skip,take);
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
    static async deleteClient(req: Request, res: Response, next: NextFunction) {
        const {userID}=req.body;
        try {
            const user=await AuthRepository.findUserById(userID);
            if(!user){
                next(ResponseService.CreateErrorResponse("User not found",404));
            }
            const deletedUser=await AuthRepository.deleteUser(userID);
            res.status(200).json(deletedUser);
        } catch (error) {
            next(error);
        }
    }
    static async addClient(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, organization,password,active } = req.body;
            const checkClient=await AuthRepository.findUserByEmail(email);
            if(checkClient){
                next(ResponseService.CreateErrorResponse("User already exists",400));
            }
            const hashedPassword = await UserService.hashPassword(password);
            const client = await AuthRepository.addUserByAdmin(
                email,
                organization,
                active,
                hashedPassword
            );
            sendAdminRegisterMail(client.email,password);
            res.status(201).json(client);
        } catch (error) {
            next(error);
        }
    }
    static async loginClient(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body;
            await JwtService.sign(res, {userID:id}, process.env.JWT_SECRET as string, {expiresIn: "7d"});
            res.status(200).json({message: "Login successful"});
        } catch (error) {
            next(error);
        }
    }
}
