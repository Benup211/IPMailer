import e, { Request, Response, NextFunction } from "express";
import { TokenRepository,AuthRepository } from "../repository/";
import { ResponseService,JwtService, UserService } from "../services";
import { ETokenType } from "../types";
export class TokenController{
    static async verifyEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { verification_id } = req.params;
            const token = await TokenRepository.findTokenById(verification_id);
            if (!token) {
                next(ResponseService.CreateErrorResponse("Invalid token", 400));
            }
            if (token && token.expiry < new Date()) {
                next(ResponseService.CreateErrorResponse("Token expired", 400));
            }
            await AuthRepository.activateUser(token?.userId);
            await TokenRepository.deleteToken(token?.userId, ETokenType.VERIFICATION);
            return res.status(200).json({ message: "Email verified" });
        } catch (error) {
            next(error);
        }
    }
    static async verifyTwoFactor(req: Request, res: Response, next: NextFunction) {
        try {
            const { code,id } = req.body;
            const token = await TokenRepository.findToken(id, ETokenType.TWO_FACTOR);
            if (!token) {
                next(ResponseService.CreateErrorResponse("Invalid token", 400));
            }
            if (token && token.expiry < new Date()) {
                next(ResponseService.CreateErrorResponse("Token expired", 400));
            }
            if (token && token.token !== Number(code)) {
                next(ResponseService.CreateErrorResponse("Invalid code", 400));
            }
            await TokenRepository.deleteToken(id, ETokenType.TWO_FACTOR);
            await JwtService.sign(res, {userID:id}, process.env.JWT_SECRET as string, {expiresIn: "7d"});
            return res.status(200).json({ message: "Two factor verified" });
        } catch (error) {
            next(error);
        }
    }
    static async verifyResetPassword(req: Request, res: Response, next: NextFunction) {
        try{
            const { verification_id } = req.params;
            const {password} = req.body;
            const token = await TokenRepository.findTokenById(verification_id);
            if (!token) {
                next(ResponseService.CreateErrorResponse("Invalid token", 400));
            }
            if (token && token.expiry < new Date()) {
                next(ResponseService.CreateErrorResponse("Token expired", 400));
            }
            const hashedPassword = await UserService.hashPassword(password);
            await AuthRepository.changePassword(token?.userId as number,hashedPassword);
            await TokenRepository.deleteToken(token?.userId, ETokenType.PASSWORD_RESET);
            return res.status(200).json({ message: "Password Changed Sucessful" });
        } catch (error) {
            next(error);
        }
    }
}