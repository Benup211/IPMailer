import nodemailer from "nodemailer";
import dotenv from 'dotenv';
dotenv.config();
import { WELCOME_EMAIL_AND_VERIFY_TEMPLATE,TWO_FA_CODE_TEMPLATE,ADMIN_REGISTER_WELCOME_TEMPLATE,RESET_PASSWORD_TEMPLATE } from "./email.template";
import {ISmtpForMail,IProxyForMail,ISubscriber} from '../types';

const verification_link = process.env.OriginURL as string;

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
            html: WELCOME_EMAIL_AND_VERIFY_TEMPLATE.replace("{verification_link}", `${verification_link}/user/verify-email/${verification_id}`),
        });
    } catch (error) {
        console.log("error in sending mail", error);
    }
};

export const sendResetPasswordLink = async (to: string,verification_id: string) => {
    try {
        await transporter.sendMail({
            from:  process.env.SMTP_USER,
            to: to,
            subject: "Reset Password OF IPMailer",
            html: RESET_PASSWORD_TEMPLATE.replace("{reset_password_link}", `${verification_link}/user/reset-password/${verification_id}`),
        });
    } catch (error) {
        console.log("error in sending mail", error);
    }
};

export const sendAdminRegisterMail=async(to:string,password:string)=>{
    try {
        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: to,
            subject: "Your Account has been created",
            html: ADMIN_REGISTER_WELCOME_TEMPLATE
            .replace("{user_email}", to)
            .replace("{user_password}", password)
            .replace("{login_link}", `${verification_link}/user/login`),
        });
    } catch (error) {
        console.log("error in sending mail", error);
    }
}

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

export const sendMail = (to: ISubscriber[],subject: string,message: string,smtp:ISmtpForMail[],proxy:IProxyForMail[]) => {

    if(proxy.length===0){
        to.forEach(async (subscriber) => {
            try {
                const smtpServer = smtp[Math.floor(Math.random() * smtp.length)];
                const transporter = nodemailer.createTransport({
                    host: smtpServer.host as string,
                    port: smtpServer.port as number,
                    secure: true,
                    auth: {
                        user: smtpServer.username as string,
                        pass: smtpServer.password as string,
                    },
                } as nodemailer.TransportOptions);
                await transporter.sendMail({
                    from: smtpServer.username as string,
                    to: subscriber.email as string,
                    subject: subject as string,
                    html: message as string,
                });
            } catch (error) {
                console.log("error in sending mail", error);
            }
        });
    }
    else{
        to.forEach(async (subscriber) => {
            try {
                const proxyServer = proxy[Math.floor(Math.random() * proxy.length)];
                const smtpServer = smtp[Math.floor(Math.random() * smtp.length)];
                const transporter = nodemailer.createTransport({
                    host: smtpServer.host as string,
                    port: smtpServer.port as number,
                    secure: true,
                    proxy: `http://${proxyServer.host}:${proxyServer.port}` as string,
                    auth: {
                        user: smtpServer.username as string,
                        pass: smtpServer.password as string,
                    },
                } as nodemailer.TransportOptions);
                await transporter.sendMail({
                    from: smtpServer.username as string,
                    to: subscriber.email as string,
                    subject: subject as string,
                    html: message as string,
                });
            } catch (error) {
                console.log("error in sending mail", error);
            }
        });
    }
}