import prisma from "../models/prisma.model";

export class AuthRepository {
    static async findUserByEmail(email: string) {
        return await prisma.user.findUnique({
            where: {
                email: email,
            }
        });
    }
    static async createUser(
        email: string,
        password: string,
        organization: string
    ) {
        return await prisma.user.create({
            data: {
                email: email,
                password: password,
                organization: organization,
            },
            select: {
                id: true,
                email: true,
                organization: true,
                active: true,
                apiKey: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    static async activateUser(userId: number | undefined) {
        return await prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                active: true,
            },
        });
    }
    static async findUserById(id: number) {
        return await prisma.user.findUnique({
            where: {
                id: id,
            },
            select: {
                id: true,
                email: true,
                organization: true,
                active: true,
                apiKey: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    static async findUserByApiKey(apiKey: string) {
        return await prisma.user.findUnique({
            where: {
                apiKey: apiKey,
            },
            select: {
                id: true,
                email: true,
                organization: true,
                active: true,
                apiKey: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
}
