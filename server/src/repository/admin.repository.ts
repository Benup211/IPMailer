import prisma from "../models/prisma.model";

export class AdminRepository {
    static async findAdmin(){
        return await prisma.admin.findFirst();
    }
    static async createAdmin(username: string, password: string){
        return await prisma.admin.create({
            data:{
                username: username,
                password: password
            },
            select:{
                id:true,
                username:true,
                password:true,
                active:true,
                createdAt:true
            }
        });
    }
    static async findAdminByUsername(username: string){
        return await prisma.admin.findUnique({
            where:{
                username: username
            },
            select:{
                id:true,
                username:true,
                active:true,
                password:true,
                createdAt:true
            }
        });
    }
    static async findAdminById(id: number){
        return await prisma.admin.findUnique({
            where:{
                id: id
            },
            select:{
                id:true,
                username:true,
                active:true,
                password:true,
                createdAt:true
            }
        });
    }
}