import prisma from "../models/prisma.model";
export class SubscriberRepository {
    static async getSubscribers(userID: string | number) {
        return await prisma.subscriber.findMany({
            where: {
                userId: parseInt(userID.toString()),
            },
            select: {
                id: true,
                email: true,
                createdAt: true,
            },
        });
    }
    static async addSubscriber(email: string, userID: string | number) {
        return await prisma.subscriber.create({
            data: {
                email,
                userId: parseInt(userID.toString()),
            },
        });
    }
    static async findSubscriberByEmail(email: string) {
        return await prisma.subscriber.findFirst({
            where: {
                email,
            },
        });
    }
    static async deleteSubscriber(id: string | number, userID: string | number) {
        return await prisma.subscriber.delete({
            where: {
                id: id as number,
                userId: userID as number,
            },
        });
    }
    static async totalSubscribers(userID: string | number) {
        return await prisma.subscriber.count({
            where: {
                userId: parseInt(userID.toString()),
            },
        });
    }
}
