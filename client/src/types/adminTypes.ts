export interface IAdmin{
    id: string;
    username: string;
    password?: string;
    active: boolean;
    createdAt: Date;
}

export interface IAdminState{
    admin: IAdmin;
    isAdminAuthenticated: boolean;
    isAdminCheckingAuth: boolean;
    isLoading: boolean;
    loginAdmin: Function;
    logoutAdmin: Function;
    checkAdminAuth:Function;
}