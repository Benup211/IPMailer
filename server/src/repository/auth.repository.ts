import prisma from "../models/prisma.model";

export class AuthRepository{
    static async findUserByEmail(email: string){
        return await prisma.user.findUnique({
            where: {
                email: email,
            },
        });
    }
    static async createUser(email: string, password: string, organization: string){
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
                createdAt: true,
                updatedAt: true,
            },
        });
    }
}