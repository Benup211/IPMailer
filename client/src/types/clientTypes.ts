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
    isGettingClients: boolean;
    isDeletingClient:boolean;
    isCreatingClient:boolean;
    isblockOrUnblockClient:boolean;
    gettingClients:Function;
    addClient: Function;
    deleteClient: (id: number) => void;
    blockOrUnblockClient: (id: number, blocked: boolean) => void;
}

export interface IClientProps{
    clients: IClient[];
}