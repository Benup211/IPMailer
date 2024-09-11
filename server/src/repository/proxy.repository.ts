import prisma from "../models/prisma.model";
export class ProxyRepository {
    static async addProxy(host: string, port: number, userId: number) {
        return await prisma.proxyServer.create({
            data: {
                host: host,
                port: port,
                userId: userId,
            },
            select: {
                id: true,
                host: true,
                port: true,
                addedAt: true,
            },
        });
    }
    static async deleteProxy(id: number,userId: number) {
        return await prisma.proxyServer.delete({
            where: {
                id: id,
                userId: userId,
            },
        });
    }
    static async getProxyServers(userId: number) {
        return await prisma.proxyServer.findMany({
            where: {
                userId: userId,
            },
            select: {
                id: true,
                host: true,
                port: true,
                addedAt: true,
            },
        });
    }
    static async totalProxys(userId: number) {
        return await prisma.proxyServer.count({
            where: {
                userId: userId,
            },
        });
    }
}