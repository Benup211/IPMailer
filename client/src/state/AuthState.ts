import { create } from "zustand";
import { IAuthState, IErrorResponse } from "../types";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;
export const AuthState = create<IAuthState>((set) => ({
    user: {
        id: "",
        email: "",
        organization: "",
        apiKey: "",
        active: false,
        blocked: false,
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    stat: {
        subscribers: 0,
        drafts: 0,
        mails: 0,
        smtps: 0,
        proxys: 0,
    },
    isAuthenticated: false,
    isCheckingAuth: false,
    isLoading: false,
    setAuthentication: async (isAuthenticated: boolean) => {
        set({ isAuthenticated: isAuthenticated });
    },
    registerUser: async (
        email: string,
        password: string,
        confirmPassword: string,
        organization: string
    ) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${API_URL}/auth/register`, {
                email,
                password,
                confirmPassword,
                organization,
            });
            toast.success(
                "Account created successfully,Check Mail for Verification"
            );
            set({ isLoading: false });
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    loginUser: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(`${API_URL}/auth/login`, {
                email,
                password,
            });
            set({ isLoading: false, user: response.data });
            toast.success("Check your email for 2FA Code");
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    logoutUser: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get(`${API_URL}/auth/logout`);
            set({
                isLoading: false,
                isAuthenticated: false,
                user: {
                    id: "",
                    email: "",
                    organization: "",
                    apiKey: "",
                    active: false,
                    blocked: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            toast.success(response.data.message);
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axios.get(`${API_URL}/auth/getUser`);
            set({
                isAuthenticated: true,
                user: response.data.user,
                isCheckingAuth: false,
                stat: response.data.stat,
            });
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isAuthenticated: false, isCheckingAuth: false });
            throw Error(response?.data.errorMessage);
        }
    },
    increaseStat: (key: keyof IAuthState["stat"]) => {
        set((state) => ({
            stat: {
                ...state.stat,
                [key]: state.stat[key] + 1,
            },
        }));
    },
    decreaseStat: (key: keyof IAuthState["stat"]) => {
        set((state) => {
            if (state.stat[key] > 0) {
                return {
                    stat: {
                        ...state.stat,
                        [key]: state.stat[key] - 1,
                    },
                };
            } else {
                return state;
            }
        });
    },
    forgetPassword: async (email: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(
                `${API_URL}/auth/reset-password`,
                {
                    email,
                }
            );
            set({ isLoading: false });
            toast.success(response.data.message);
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    changePassword: async (password: string, confirmPassword: string) => {
        set({ isLoading: true });
        try {
            const response = await axios.post(
                `${API_URL}/auth/change-password`,
                {
                    password,
                    confirmPassword,
                }
            );
            set({ isLoading: false });
            toast.success(response.data.message);
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    deleteUser: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.delete(`${API_URL}/auth/delete-user`);
            set({
                isLoading: false,
                isAuthenticated: false,
                user: {
                    id: "",
                    email: "",
                    organization: "",
                    apiKey: "",
                    active: false,
                    blocked: false,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                },
            });
            toast.success(response.data.message);
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isLoading: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
}));
