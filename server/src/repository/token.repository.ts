import prisma  from '../models/prisma.model';
import { ETokenType } from '../types';
export class TokenRepository{
    static async createToken(userId: number, tokenType: ETokenType){
        return await prisma.token.create({
            data:{
                userId:userId,
                type:tokenType,
                token: Math.floor(100000 + Math.random() * 900000),
                expiry: new Date(Date.now() + 1000 * 60 * 60 * 24),
            }
        })
    }
    static async findToken(userId: number, tokenType: ETokenType){
        return await prisma.token.findFirst({
            where:{
                userId:userId,
                type:tokenType
            }
        })
    }
    static async deleteToken(userId: number|undefined, tokenType: ETokenType){
        return await prisma.token.deleteMany({
            where:{
                userId:userId,
                type:tokenType
            }
        })
    }
    static async findTokenById(id: string){
        return await prisma.token.findUnique({
            where:{
                id:id
            }
        })
    }
    static async updateToken(id: string, token: number, expiry: Date){
        return await prisma.token.update({
            where:{
                id:id
            },
            data:{
                token:token,
                expiry:expiry
            }
        })
    }
}