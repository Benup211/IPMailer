import { create } from "zustand";
import { ISubscriberState, IErrorResponse } from "../types";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const API_URL = import.meta.env.VITE_API_URL;

axios.defaults.withCredentials = true;
export const useSubscriberStore = create<ISubscriberState>((set) => ({
    isGettingSubscribers: false,
    isAddingSubscriber: false,
    isDeletingSubscriber: false,
    skip: 0,
    take: 3,
    selectedPage: 1,
    setSelectedPage: (page: number) => {
        set({ selectedPage: page });
    },
    setSkip: (page: number) => {
        set((state) => ({
            skip: (page - 1) * state.take,
        }));
    },
    subscribers: [],
    setSubscribers: (subscriber) => {
        set((state) => ({
            subscribers: [...state.subscribers, ...subscriber],
        }));
    },
    getSubscribers: async () => {
        set({ isGettingSubscribers: true });
        try {
            const response = await axios.get(
                `${API_URL}/subscriber/get-subscribers`
                ,{
                    params: { skip: useSubscriberStore.getState().skip, take: useSubscriberStore.getState().take }
                }
            );
            set({
                subscribers: response.data.subscribers,
                isGettingSubscribers: false,
            });
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isGettingSubscribers: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    addSubscriber: async (email: string, apiKey: string | number) => {
        set({ isAddingSubscriber: true });
        try {
            const response = await axios.post(
                `${API_URL}/subscriber/add-subscriber`,
                { email, apiKey }
            );
            set({
                isAddingSubscriber: false,
                setSubscribers: response.data.subscriber,
            });
            toast.success("Subscriber added successfully");
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isAddingSubscriber: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    deleteSubscriber: async (id: string | number, userID: string | number) => {
        set({ isDeletingSubscriber: true });
        try {
            const response = await axios.post(
                `${API_URL}/subscriber/delete-subscriber`,
                { id, userID }
            );
            set((state)=>({
                isDeletingSubscriber: false,
                subscribers: state.subscribers.filter((subscriber)=>subscriber.id!==id)
            }));
            toast.success("Subscriber deleted successfully");
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isDeletingSubscriber: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
}));
