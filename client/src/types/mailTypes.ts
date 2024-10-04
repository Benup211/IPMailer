export interface IMail{
    id: string|number;
    subject: string;
    message:string;
    sendDate: Date;
}
export interface IMailState{
    skip:number;
    take:number;
    selectedPage:number;
    setSkip: (page:number) => void;
    setSelectedPage: (page:number) => void;
    skipDraft: number;
    takeDraft: number;
    selectedPageDraft: number;
    setSkipDraft: (page:number) => void;
    setSelectedPageDraft: (page:number) => void;
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