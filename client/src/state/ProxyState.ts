import { create } from "zustand";
import { IProxyServerState, IErrorResponse } from "../types";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;
export const useProxyStore = create<IProxyServerState>((set) => ({
    proxyServers: [],
    isGettingProxyServers: false,
    skip: 0,
    take: 3,
    selectedPage: 1,
    setSkip: (page: number) => {
        set((state) => ({
            skip: (page - 1) * state.take,
        }));
    },
    setSelectedPage: (page: number) => {
        set({ selectedPage: page });
    },
    isDeletingProxy: false,
    isCreatingProxy: false, 
    gettingProxy: async () => {
        set({ isGettingProxyServers: true });
        try {
            const response = await axios.get(`${API_URL}/proxy/get-proxy`,{
                params: { skip: useProxyStore.getState().skip, take: useProxyStore.getState().take }
            });
            set({
                proxyServers: response.data.proxy,
                isGettingProxyServers: false,
            });
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isGettingProxyServers: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    addProxyServer: async (host: string, port: number) => {
        set({ isCreatingProxy: true });
        try {
            const response = await axios.post(`${API_URL}/proxy/create-proxy`, {
                host,
                port,
            });
            set((state) => ({
                proxyServers: [...state.proxyServers, response.data.proxy],
                isCreatingProxy: false,
            }));
            toast.success("Proxy Added Sucessfully");
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isCreatingProxy: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    deleteProxyServer: async (id: number) => {
        set({ isDeletingProxy: true });
        try {
            const response = await axios.delete(`${API_URL}/proxy/delete-proxy/${id}`);
            set((state) => ({
                proxyServers: state.proxyServers.filter((proxy) => proxy.id !== id),
                isDeletingProxy: false,
            }));
            toast.success("Proxy Deleted Sucessfully");
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isDeletingProxy: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    }
}));
