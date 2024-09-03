interface User{
    id:string;
    email:string;
    organization:string;
    active:boolean
}
export interface IAuthState{
    user:User;
    isCheckingAuth:boolean;
    isLoading:boolean;
    isAuthenticated:boolean;
    registerUser:Function;
    loginUser:Function;
}