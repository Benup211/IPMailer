interface User{
    id:string;
    email:string;
    organization:string;
    active:boolean;
    createdAt:string;
    updatedAt:string;
}
export interface IAuthState{
    user:User;
    isCheckingAuth:boolean;
    isLoading:boolean;
    isAuthenticated:boolean;
    setAuthentication:Function;
    registerUser:Function;
    loginUser:Function;
    logoutUser:Function;
    checkAuth:()=>Promise<any>;
}