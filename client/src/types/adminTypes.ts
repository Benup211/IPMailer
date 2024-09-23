export interface IAdmin{
    id: string;
    username: string;
    password?: string;
    active: boolean;
    createdAt: Date;
}
interface Stat{
    clients:number;
}
export interface IAdminState{
    admin: IAdmin;
    admin_stats: Stat;
    isAdminAuthenticated: boolean;
    isAdminCheckingAuth: boolean;
    isLoading: boolean;
    loginAdmin: Function;
    logoutAdmin: Function;
    checkAdminAuth:Function;
    increaseStat:Function;
    decreaseStat:Function;
    loginClient:Function;
}