import { Request,Response,NextFunction } from "express";
import { SmtpRepository } from "../repository";
export class SmtpController{
    static async createSmtp(req:Request,res:Response,next:NextFunction){
        try{
            const {host,port,username,password} = req.body;
            const userId = req.body.userID;
            const smtp = await SmtpRepository.createSmtp({host,port,username,password},userId);
            res.status(201).json({smtp});
        }catch(error){
            next(error);
        }
    }
    static async getSmtpByUserId(req:Request,res:Response,next:NextFunction){
        try{
            const userId = req.body.userID;
            const smtp = await SmtpRepository.getSmtpByUserId(userId);
            res.status(200).json({smtp});
        }catch(error){
            next(error);
        }
    }
    static async updateSmtp(req:Request,res:Response,next:NextFunction){
        try{
            const {host,port,username,password,id} = req.body;
            const smtp = await SmtpRepository.updateSmtp({host,port,username,password},id);
            res.status(200).json({smtp});
        }catch(error){
            next(error);
        }
    }
    static async deleteSmtp(req:Request,res:Response,next:NextFunction){
        try{
            const id = Number(req.params.id);
            await SmtpRepository.deleteSmtp(id);
            res.status(200).json({message:"Smtp deleted successfully"});
        }catch(error){
            next(error);
        }
    }
}