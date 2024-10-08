export interface ISmtpServer{
    id: number;
    host: string;
    port: number;
    username: string;
    password?: string;
    addedAt: Date;
}

export interface ISmtpServerState{
    smtpServers: ISmtpServer[];
    isGettingSmtpServers: boolean;
    seletedSmtpServer:ISmtpServer;
    skip:number;
    take:number;
    selectedPage:number;
    setSkip:(page:number)=>void;
    setSelectedPage:(page:number)=>void;
    setSeletedSmtpServer:(id:number)=>void;
    isDeletingSmtp:boolean;
    isUpdatingSmtp:boolean;
    isCreatingSmtp:boolean;
    gettingSmtp:Function;
    addSmtpServer: Function;
    deleteSmtpServer: (id: number) => void;
    updateSmtpServer: Function;
}

export interface ISmtpServerProps{
    smtpServer: ISmtpServer[];
}