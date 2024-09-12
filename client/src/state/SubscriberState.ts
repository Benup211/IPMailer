import { create } from "zustand";
import { ISubscriberState, IErrorResponse } from "../types";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

// const API_URL = "http://localhost:3000/api";
const API_URL = "https://ipmailer.onrender.com/api";

axios.defaults.withCredentials = true;
export const useSubscriberStore = create<ISubscriberState>((set) => ({
    isGettingSubscribers: false,
    isAddingSubscriber: false,
    isDeletingSubscriber: false,
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
    addSubscriber: async (email: string, userID: string | number) => {
        set({ isAddingSubscriber: true });
        try {
            const response = await axios.post(
                `${API_URL}/subscriber/add-subscriber`,
                { email, userID }
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
