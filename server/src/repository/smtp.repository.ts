import prisma from "../models/prisma.model";
import { Smtp } from "../types";
export class SmtpRepository {
    static async createSmtp(smtp: Smtp, userId: number) {
        {
            return await prisma.smtpServer.create({
                data: {
                    host: smtp.host,
                    port: smtp.port,
                    username: smtp.username,
                    password: smtp.password,
                    userId: userId,
                },
                select: {
                    id: true,
                    host: true,
                    port: true,
                    username: true,
                    addedAt: true,
                },
            });
        }
    }
    static async getSmtpByUserId(userId: number) {
        {
            return await prisma.smtpServer.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    id: true,
                    host: true,
                    port: true,
                    username: true,
                    addedAt: true,
                },
            });
        }
    }
    static async getSmtpByUserIdForMail(userId: number) {
        {
            return await prisma.smtpServer.findMany({
                where: {
                    userId: userId,
                },
                select: {
                    id: true,
                    host: true,
                    port: true,
                    username: true,
                    password: true,
                    addedAt: true,
                },
            });
        }
    }
    static async updateSmtp(smtp: Smtp, id: number) {
        {
            return await prisma.smtpServer.update({
                where: {
                    id: id,
                },
                data: {
                    host: smtp.host,
                    port: smtp.port,
                    username: smtp.username,
                    password: smtp.password,
                },
                select: {
                    id: true,
                    host: true,
                    port: true,
                    username: true,
                    addedAt: true,
                },
            });
        }
    }
    static async deleteSmtp(id: number) {
        {
            return await prisma.smtpServer.delete({
                where: {
                    id: id,
                },
            });
        }
    }
    static async totalSmtps(userId: number) {
        {
            return await prisma.smtpServer.count({
                where: {
                    userId: userId,
                },
            });
        }
    }
}
