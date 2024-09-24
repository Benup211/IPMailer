import { Request,Response,NextFunction } from "express";
import { ProxyRepository } from "../repository";

export class ProxyController{
    static async addProxy(req:Request,res:Response,next:NextFunction){
        try{
            const {host,port} = req.body;
            const userId = req.body.userID;
            const proxy = await ProxyRepository.addProxy(host,port,userId);
            res.status(201).json({proxy});
        }catch(error){
            next(error);
        }
    }
    static async getProxyServers(req:Request,res:Response,next:NextFunction){
        const take = Number(req.query.take)||3;
        const skip = Number(req.query.skip)||0;
        try{
            const userId = req.body.userID;
            const proxy = await ProxyRepository.getProxyServers(userId,skip,take);
            res.status(200).json({proxy});
        }catch(error){
            next(error);
        }
    }
    static async deleteProxy(req:Request,res:Response,next:NextFunction){
        try{
            const id = Number(req.params.id);
            const userId = req.body.userID;
            await ProxyRepository.deleteProxy(id,userId);
            res.status(200).json({message:"Proxy deleted successfully"});
        }catch(error){
            next(error);
        }
    }
}