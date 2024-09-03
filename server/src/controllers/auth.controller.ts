import { Request, Response, NextFunction } from "express";
import { AuthRepository } from "../repository/auth.repository";
import { ResponseService,JwtService,UserService } from "../services";
export class AuthController {
    static async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, organization } = req.body;
            const user = await AuthRepository.findUserByEmail(email);
            if (user) {
                next(ResponseService.CreateErrorResponse("User already exists", 400));
            }
            const hashedPassword = await UserService.hashPassword(password);
            const newUser = await AuthRepository.createUser(email, hashedPassword, organization);
            return res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
    static async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await AuthRepository.findUserByEmail(email);
            if (!user) {
                next(ResponseService.CreateErrorResponse("User not found", 404));
            }
            const isPasswordValid = user ? await UserService.comparePassword(password, user.password) : false;
            if (!isPasswordValid) {
                next(ResponseService.CreateErrorResponse("Incorrect credentials", 400));
            }
            if(user && !user.active) {
                next(ResponseService.CreateErrorResponse("Email is not verified,Check your email for verification", 400));
            }
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}
