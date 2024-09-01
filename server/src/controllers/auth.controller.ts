import { Request, Response, NextFunction } from "express";
import prisma from "../models/prisma.model";
import bcryptjs from "bcryptjs";

export class AuthController {
    static async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, organization } = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (user) {
                return res.status(400).json({ message: "User already exists" });
            }
            const hashedPassword = await bcryptjs.hash(password, 10);
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    password: hashedPassword,
                    organization: organization,
                },
                select: {
                    id: true,
                    email: true,
                    organization: true,
                    createdAt: true,
                    updatedAt: true,
                },
            });
            return res.status(201).json(newUser);
        } catch (error) {
            next(error);
        }
    }
    static async loginUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password } = req.body;
            const user = await prisma.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }
            const isPasswordValid = await bcryptjs.compare(
                password,
                user.password
            );
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
