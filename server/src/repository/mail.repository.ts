import prisma from "../models/prisma.model";

export class MailRepository {
    static async createMail(subject: string, message: string, userId: number) {
        return await prisma.mail.create({
            data: {
                subject: subject,
                message: message,
                userId: userId,
            },
            select: {
                id: true,
                subject: true,
                message: true,
                sendDate:true
            },
        });
    }
    static async findMailById(id: number) {
        return await prisma.mail.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                subject: true,
                message: true,
                sendDate: true,
                userId: true,
            },
        });
    }
    static async findMailByUserId(userId: number,skip?:number,take?:number) {
        return await prisma.mail.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                subject: true,
                message: true,
                sendDate: true,
            },
            skip:skip,
            take:take,
        });
    }
    static async deleteMailById(id: number){
        return await prisma.mail.delete({
            where: {
                id: id,
            },
        });
    }
    static async createDraftMail(subject: string, message: string, userId: number) {
        return await prisma.draftMail.create({
            data: {
                subject: subject,
                message: message,
                userId: userId,
            },
            select: {
                id: true,
                subject: true,
                message: true,
                sendDate:true
            },
        });
    }
    static async findDraftMailById(id: number) {
        return await prisma.draftMail.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                subject: true,
                message: true,
                sendDate: true,
                userId: true,
            },
        });
    }
    static async findDraftMailByUserId(userId: number,skip?:number,take?:number) {
        return await prisma.draftMail.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                subject: true,
                message: true,
                sendDate: true,
            },
            skip:skip,
            take:take,
        });
    }
    static async deleteDraftMailById(id: number){
        return await prisma.draftMail.delete({
            where: {
                id: id,
            },
        });
    }
    static async totalSendMails(userId: number) {
        return await prisma.mail.count({
            where: {
                userId: userId,
            },
        });
    }
    static async totalDraftMails(userId: number) {
        return await prisma.draftMail.count({
            where: {
                userId: userId,
            },
        });
    }
}