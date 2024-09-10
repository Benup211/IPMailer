import { Request, Response, NextFunction } from "express";
import { AuthRepository, TokenRepository,SubscriberRepository,MailRepository,SmtpRepository } from "../repository/";
import { ResponseService, UserService } from "../services";
import { sendVerifyMail, sendTwoFACode } from "../services/mail.service";
import { ETokenType } from "../types";
export class AuthController {
    static async registerUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, password, organization } = req.body;
            const user = await AuthRepository.findUserByEmail(email);
            if (user) {
                next(
                    ResponseService.CreateErrorResponse(
                        "User already exists",
                        400
                    )
                );
            }
            const hashedPassword = await UserService.hashPassword(password);
            const newUser = await AuthRepository.createUser(
                email,
                hashedPassword,
                organization
            );
            const token = await TokenRepository.createToken(
                newUser.id,
                ETokenType.VERIFICATION
            );
            sendVerifyMail(newUser.email, token.id);
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
                return next(
                    ResponseService.CreateErrorResponse("User not found", 404)
                );
            }
            const isPasswordValid = user
                ? await UserService.comparePassword(password, user.password)
                : false;
            if (!isPasswordValid) {
                next(
                    ResponseService.CreateErrorResponse(
                        "Incorrect credentials",
                        400
                    )
                );
            }
            if (user && !user.active) {
                next(
                    ResponseService.CreateErrorResponse(
                        "Email is not verified,Check your email for verification",
                        400
                    )
                );
            }
            if (user) {
                const tokenExist = await TokenRepository.findToken(
                    user.id,
                    ETokenType.TWO_FACTOR
                );
                if (!tokenExist) {
                    const token = await TokenRepository.createToken(
                        user.id,
                        ETokenType.TWO_FACTOR
                    );
                    sendTwoFACode(user.email, token.token.toString());
                } else {
                    tokenExist.token = Math.floor(
                        100000 + Math.random() * 900000
                    );
                    tokenExist.expiry = new Date(Date.now() + 1000 * 60 * 10);
                    await TokenRepository.updateToken(
                        tokenExist.id,
                        tokenExist.token,
                        tokenExist.expiry
                    );
                    sendTwoFACode(user.email, tokenExist.token.toString());
                }
            }
            return res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    }
    static async logoutUser(req: Request, res: Response, next: NextFunction) {
        try {
            res.clearCookie("Token");
            res.status(200).json({ message: "Logout successfully" });
        } catch (error) {
            next(error);
        }
    }
    static async getUser(req: Request, res: Response, next: NextFunction) {
        try {
            const user = await AuthRepository.findUserById(req.body.userID);
            const subscribers = await SubscriberRepository.totalSubscribers(req.body.userID);
            const drafts = await MailRepository.totalDraftMails(req.body.userID);
            const mails = await MailRepository.totalSendMails(req.body.userID);
            const smtps = await SmtpRepository.totalSmtps(req.body.userID);
            const proxys = 0;
            const stat = { subscribers, drafts, mails, smtps, proxys };
            return res.status(200).json({user,stat});
        } catch (error) {
            next(error);
        }
    }
}
