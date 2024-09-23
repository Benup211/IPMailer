import { create } from "zustand";
import { IAdminState, IErrorResponse } from "../types";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;
export const useAdminStore = create<IAdminState>((set) => ({
    admin: {
        id: "",
        username: "",
        active: false,
        createdAt: new Date(),
    },
    admin_stats: {
        clients: 0,
    },
    isAdminAuthenticated: false,
    isAdminCheckingAuth: false,
    isLoading: false,
    loginAdmin: async (username: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${API_URL}/admin/login`, {
                username,
                password,
            });
            set({
                admin: response.data.admin,
                isAdminAuthenticated: true,
            });
            set({ isLoading: false });
            toast.success("Logged in successfully");
            return response.data.admin;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            toast.error(response?.data.errorMessage as string);
            set({ isLoading: false });
            throw Error(response?.data.errorMessage);
        }
    },
    logoutAdmin: async () => {
        set({ isLoading: true });
        try {
            await axios.get(`${API_URL}/admin/logout`);
            set({
                admin: {
                    id: "",
                    username: "",
                    active: false,
                    createdAt: new Date(),
                },
                isAdminAuthenticated: false,
            });
            set({ isLoading: false });
            toast.success("Logged out successfully");
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            toast.error(response?.data.errorMessage as string);
            set({ isLoading: false });
            throw Error(response?.data.errorMessage);
        }
    },
    checkAdminAuth: async () => {
        set({ isAdminCheckingAuth: true });
        try {
            const response = await axios.get(`${API_URL}/admin/getAdmin`);
            set({
                admin: response.data.admin,
                isAdminAuthenticated: true,
                admin_stats: response.data.stats,
            });
            set({ isAdminCheckingAuth: false });
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            toast.error(response?.data.errorMessage as string);
            set({ isAdminCheckingAuth: false });
            throw Error(response?.data.errorMessage);
        }
    },
    increaseStat: (key: keyof IAdminState["admin_stats"]) => {
        set((state) => ({
            admin_stats: {
                ...state.admin_stats,
                [key]: state.admin_stats[key] + 1,
            },
        }));
    },
    decreaseStat: (key: keyof IAdminState["admin_stats"]) => {
        set((state) => {
            if (state.admin_stats[key] > 0) {
                return {
                    admin_stats: {
                        ...state.admin_stats,
                        [key]: state.admin_stats[key] - 1,
                    },
                };
            } else {
                return state;
            }
        });
    },
    loginClient: async (id: number | string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${API_URL}/admin/login-client`, {
                id,
            });
            set({ isLoading: false });
            toast.success(response.data.message);
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            toast.error(response?.data.errorMessage as string);
            set({ isLoading: false });
            throw Error(response?.data.errorMessage);
        }
    },
}));
