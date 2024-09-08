export interface IMail{
    id: string|number;
    title: String;
    sendDate: Date;
}

export interface IMails{
    mails: IMail[];
}