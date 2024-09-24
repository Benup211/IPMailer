import { Request, Response,NextFunction } from 'express';
import { SubscriberRepository } from '../repository';
import { AuthRepository } from '../repository';
import { ResponseService } from '../services';
export class SubscriberController{

    static async getSubscribers(req:Request, res:Response,next:NextFunction){
        const take = Number(req.query.take) || 3;
        const skip = Number(req.query.skip) || 0;
        try{
            const userID = req.body.userID;
            const user = await AuthRepository.findUserById(userID);
            if(user){
                const subscribers = await SubscriberRepository.getSubscribers(userID,skip,take);
                res.status(200).json({subscribers});
            }
            else{
                next(ResponseService.CreateErrorResponse("User not found",404));
            }

        }catch(error){
            next(error);
        }
    }
    static async addSubscriber(req:Request, res:Response,next:NextFunction){
        try{
            const {email,apiKey} = req.body;
            const user = await AuthRepository.findUserByApiKey(apiKey);
            if(user){
                const findSubscriberExist=await SubscriberRepository.findSubscriberByEmail(email);
                if(findSubscriberExist){
                    next(ResponseService.CreateErrorResponse("Subscriber already exist",400));
                }
                else{
                    const subscriber = await SubscriberRepository.addSubscriber(email,user.id);
                    res.status(201).json({subscriber});
                }
            }
            else{
                next(ResponseService.CreateErrorResponse("User of given apikey not found",404));
            }
        }catch(error){
            next(error);
        }
    }
    static async deleteSubscriber(req:Request, res:Response,next:NextFunction){
        try{
            const {id,userID} = req.body;
            const deleteSubscriber = await SubscriberRepository.deleteSubscriber(id,userID);
            if(deleteSubscriber){
                res.status(200).json({message:"Subscriber deleted successfully"});
            }
            else{
                next(ResponseService.CreateErrorResponse("Subscriber not found",404));
            }
        }catch(error){
            next(error);
        }
    }
}