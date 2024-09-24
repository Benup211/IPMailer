export interface IClient{
    id: number;
    email: string;
    organization: string;
    active: boolean;
    blocked: boolean;
    createdAt: Date;
}
export interface ICLientState{
    clients: IClient[];
    skip: number;
    take: number;
    selectedPage: number;
    setSelectedPage:Function;
    isGettingClients: boolean;
    isDeletingClient:boolean;
    isCreatingClient:boolean;
    isblockOrUnblockClient:boolean;
    setClient: (Subscriber: IClient[])=>void;
    gettingClients:Function;
    addClient: Function;
    deleteClient: (id: number) => void;
    blockOrUnblockClient: (id: number, blocked: boolean) => void;
    setSkip: (page:number) => void;
}

export interface IClientProps{
    clients: IClient[];
}