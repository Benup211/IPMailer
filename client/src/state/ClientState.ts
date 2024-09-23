import { create } from "zustand";
import { ICLientState, IErrorResponse } from "../types";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

axios.defaults.withCredentials = true;
const API_URL = import.meta.env.VITE_API_URL;

export const useClientStore = create<ICLientState>((set) => ({
    clients: [],
    isGettingClients: false,
    isDeletingClient: false,
    isCreatingClient: false,
    isblockOrUnblockClient: false,
    setClient: (client) => {
        set((state) => ({
            clients: [...state.clients, ...client],
        }));
    },
    gettingClients: async () => {
        set({ isGettingClients: true });
        try {
            const response = await axios.get(`${API_URL}/admin/clients`);
            set({ clients: response.data.clients, isGettingClients: false });
            return response.data.clients;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            toast.error(response?.data.errorMessage as string);
            set({ isGettingClients: false });
            throw Error(response?.data.errorMessage);
        }
    },
    addClient: async (
        email: string,
        password: string,
        confirmPassword: string,
        organization: string
    ) => {
        set({ isCreatingClient: true });
        try {
            const response = await axios.post(`${API_URL}/admin/add-client`, {
                email,
                password,
                confirmPassword,
                organization,
                active: true,
            });
            toast.success("Client created successfully");
            set({ isCreatingClient: false,setClient: response.data.client });
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            toast.error(response?.data.errorMessage as string);
            set({ isCreatingClient: false });
            throw Error(response?.data.errorMessage);
        }
    },
    deleteClient: async (userID: number | string) => {
        set({ isDeletingClient: true });
        try {
            const response = await axios.post(
                `${API_URL}/admin/delete-client`,
                {
                    userID,
                }
            );
            set({ isDeletingClient: false });
            toast.success("Client deleted successfully");
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            toast.error(response?.data.errorMessage as string);
            set({ isDeletingClient: false });
            throw Error(response?.data.errorMessage);
        }
    },
    blockOrUnblockClient: async (id: number, blocked: boolean) => {
        set({ isblockOrUnblockClient: true });
        try {
            const response = await axios.put(
                `${API_URL}/admin/block-or-unblock-user`,
                { userID: id, blocked }
            );
            set({ isblockOrUnblockClient: false });
            toast.success(
                `Client ${blocked ? "blocked" : "unblocked"} successfully`
            );
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            toast.error(response?.data.errorMessage as string);
            set({ isblockOrUnblockClient: false });
            throw Error(response?.data.errorMessage);
        }
    },
}));
