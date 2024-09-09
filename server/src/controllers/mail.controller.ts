import {Request,Response,NextFunction} from 'express';
import { MailRepository } from '../repository';

export class MailController{
    static async createMail(req:Request, res:Response,next:NextFunction){
        try{
            const {subject,message} = req.body;
            const userId = req.body.userID;
            const mail = await MailRepository.createMail(subject,message,userId);
            res.status(201).json({mail});
        }catch(error){
            next(error);
        }
    }
    static async getMails(req:Request, res:Response,next:NextFunction){
        try{
            const userId = req.body.userID;
            const mails = await MailRepository.findMailByUserId(userId);
            res.status(200).json({mails});
        }catch(error){
            next(error);
        }
    }
    static async deleteMail(req:Request, res:Response,next:NextFunction){
        try{
            const {id} = req.body;
            const userId = req.body.userID;
            const mail = await MailRepository.findMailById(id);
            if(mail){
                if(mail.userId === userId){
                    const deleteMail = await MailRepository.deleteMailById(id);
                    res.status(200).json({message:"Mail deleted successfully"});
                }
                else{
                    res.status(401).json({message:"Unauthorized access"});
                }
            }
            else{
                res.status(404).json({message:"Mail not found"});
            }
        }catch(error){
            next(error);
        }
    }
    static async createDraftMail(req:Request, res:Response,next:NextFunction){
        try{
            const {subject,message} = req.body;
            const userId = req.body.userID;
            const mail = await MailRepository.createDraftMail(subject,message,userId);
            res.status(201).json({mail});
        }catch(error){
            next(error);
        }
    }
    static async deleteDraftMail(req:Request, res:Response,next:NextFunction){
        try{
            const {id} = req.body;
            const userId = req.body.userID;
            const mail = await MailRepository.findDraftMailById(id);
            if(mail){
                if(mail.userId === userId){
                    const deleteMail = await MailRepository.deleteDraftMailById(id);
                    res.status(200).json({message:"Mail deleted successfully"});
                }
                else{
                    res.status(401).json({message:"Unauthorized access"});
                }
            }
            else{
                res.status(404).json({message:"Mail not found"});
            }
        }catch(error){
            next(error);
        }
    }
    static async getDraftMails(req:Request, res:Response,next:NextFunction){
        try{
            const userId = req.body.userID;
            const mails = await MailRepository.findDraftMailByUserId(userId);
            res.status(200).json({mails});
        }catch(error){
            next(error);
        }
    }

}