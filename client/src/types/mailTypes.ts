export interface IMail{
    id: string|number;
    subject: String;
    message:String;
    sendDate: Date;
}
export interface IMailState{
    isGettingMails: boolean;
    isAddingMail: boolean;
    isDeletingMail: boolean;
    isAddingDraftMail: boolean;
    valueFromDraftMail: IMail;
    mails: IMail[];
    draftMails: IMail[];
    setMails: (mail: IMail[]) => void;
    getMails: Function;
    addMail: Function;
    deleteMail: Function;
    getDraftMails: Function;
    addDraftMail: Function;
    deleteDraftMail: Function;
}
export interface IMails{
    mails: IMail[];
}