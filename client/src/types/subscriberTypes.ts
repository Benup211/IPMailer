export interface ISubscriber{
    id: string|number;
    email: String;
    createdAt: Date;
}
export interface ISubscriberState{
    isGettingSubscribers: boolean;
    isAddingSubscriber: boolean;
    subscribers: ISubscriber[];
    setSubscribers: (Subscriber: ISubscriber[])=>void;
    getSubscribers: Function;
    addSubscriber: Function;
}

export interface ISubscribers{
    subscribers: ISubscriber[];
}