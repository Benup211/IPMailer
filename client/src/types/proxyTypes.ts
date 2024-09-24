export interface IProxyServer{
    id: number;
    host: string;
    port: number;
    addedAt: Date;
}

export interface IProxyServerState{
    proxyServers: IProxyServer[];
    skip:number;
    take:number;
    selectedPage:number;
    setSkip:(page:number)=>void;
    setSelectedPage:(page:number)=>void;
    isGettingProxyServers: boolean;
    isDeletingProxy:boolean;
    isCreatingProxy:boolean;
    gettingProxy:Function;
    addProxyServer: Function;
    deleteProxyServer: (id: number) => void;
}

export interface IProxyServerProps{
    proxyServer: IProxyServer[];
}