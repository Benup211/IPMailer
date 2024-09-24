export interface ISubscriber{
    id: string|number;
    email: String;
    createdAt: Date;
}
export interface ISubscriberState{
    isGettingSubscribers: boolean;
    skip: number;
    take: number;
    selectedPage: number;
    setSelectedPage: (page: number) => void;
    setSkip: (page: number) => void;
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