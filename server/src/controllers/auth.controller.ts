import { Request, Response, NextFunction } from "express";
import prisma from "../models/prisma.model";
import { UserService } from "../services/user.service";
import { AuthRepository } from "../repository/auth.repository";

export class AuthController {
    static async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, organization } = req.body;
            const user = await AuthRepository.findUserByEmail(email);
            if (user) {
                return res.status(400).json({ message: "User already exists" });
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
                return res.status(400).json({ message: "User not found" });
            }
            const isPasswordValid = await UserService.comparePassword(password, user.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid password" });
            }
            if(!user.active) {
                return res.status(400).json({ message: "User is not active" });
            }
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
}
