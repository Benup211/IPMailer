export interface ISubscriber{
    id: string|number;
    email: String;
    createdAt: Date;
}
export interface ISubscriberState{
    isGettingSubscribers: boolean;
    isDeletingSubscriber: boolean;
    isAddingSubscriber: boolean;
    subscribers: ISubscriber[];
    setSubscribers: (Subscriber: ISubscriber[])=>void;
    getSubscribers: Function;
    addSubscriber: Function;
    deleteSubscriber: Function;
}

export interface ISubscribers{
    subscribers: ISubscriber[];
}