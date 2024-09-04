import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();
import { WELCOME_EMAIL_AND_VERIFY_TEMPLATE,TWO_FA_CODE_TEMPLATE } from "./email.template";
import exp from "constants";

const verification_link = "http://localhost:5173";

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST as string,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
        user: process.env.SMTP_USER as string,
        pass: process.env.SMTP_PASSWORD as string,
    },
});

export const sendVerifyMail = async (to: string,verification_id: string) => {
    try {
        await transporter.sendMail({
            from:  process.env.SMTP_USER,
            to: to,
            subject: "Verify your email",
            html: WELCOME_EMAIL_AND_VERIFY_TEMPLATE.replace("{verification_link}", `${verification_link}/verify-email/${verification_id}`),
        });
    } catch (error) {
        console.log("error in sending mail", error);
    }
};
export const sendTwoFACode = async (to: string,code: string) => {
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: "Your 2FA Code",
            html: TWO_FA_CODE_TEMPLATE.replace("{2fa_code}", code),
        });
    } catch (error) {
        console.log("error in sending mail", error);
    }
}
