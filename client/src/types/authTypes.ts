interface User{
    id:string;
    email:string;
    organization:string;
    active:boolean;
    createdAt:Date;
    updatedAt:Date;
}
interface Stat{
    subscribers:number;
    drafts:number;
    mails:number;
    smtps:number;
    proxys:number;
}
export interface IAuthState{
    user:User;
    stat:Stat;
    isCheckingAuth:boolean;
    isLoading:boolean;
    isAuthenticated:boolean;
    setAuthentication:Function;
    registerUser:Function;
    loginUser:Function;
    logoutUser:Function;
    checkAuth:()=>Promise<any>;
    increaseStat:Function;
    decreaseStat:Function;
}