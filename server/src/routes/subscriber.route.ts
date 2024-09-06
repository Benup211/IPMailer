import { Router } from 'express';
import { GlobalMiddleware } from '../middleware/global.middleware';
import { SubscriberController } from '../controllers/subscriber.controller';
import {SubscriberValidator  } from '../validators/subscriber.validator';

class SubscriberRoute{
    public router:Router=Router();
    constructor(){
        this.getRoutes();
        this.postRoutes();
    }
    getRoutes(){
        this.router.get('/get-subscribers',GlobalMiddleware.CheckAuth,SubscriberController.getSubscribers);
    }
    postRoutes(){
        this.router.post('/add-subscriber',SubscriberValidator.addSubscriber(),GlobalMiddleware.CheckValidationResult,SubscriberController.addSubscriber);
        this.router.post('/delete-subscriber',SubscriberValidator.deleteSubscriber(),GlobalMiddleware.CheckValidationResult,GlobalMiddleware.CheckAuth,SubscriberController.deleteSubscriber);
    }
}

export default new SubscriberRoute().router;