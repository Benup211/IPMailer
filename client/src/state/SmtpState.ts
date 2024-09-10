import { create } from "zustand";
import { ISmtpServerState, IErrorResponse } from "../types";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:3000/api";

axios.defaults.withCredentials = true;
export const useSmtpStore = create<ISmtpServerState>((set) => ({
    smtpServers: [],
    isGettingSmtpServers: false,
    isDeletingSmtp:false,
    isUpdatingSmtp:false,
    isCreatingSmtp:false,
    gettingSmtp:async()=>{
        set({isGettingSmtpServers:true})
        try{
            const response=await axios.get(`${API_URL}/smtp/get-smtp`);
            set({
                smtpServers:response.data.smtp,
                isGettingSmtpServers:false
            })
            console.log(response.data.smtp)
        }catch(err){
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isGettingSmtpServers: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    addSmtpServer: async (host:string,port:number,username:string,password:string) => {
        set({ isCreatingSmtp: true });
        try {
            const response = await axios.post(`${API_URL}/smtp/create-smtp`, {
                host,port,username,password
            });
            set((state)=>({
                smtpServers: [...state.smtpServers,response.data.smtp],
                isCreatingSmtp: false,
            }));
            toast.success("Server Added Sucessfully");
            console.log(response.data.smtp);
            return response;
        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isCreatingSmtp: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    deleteSmtpServer: async(id) => {
        try {
            const response = await axios.delete(`${API_URL}/smtp/delete-smtp/${id}`);
            set((state)=>({
                smtpServers: state.smtpServers.filter((smtp)=>smtp.id!==id),
                isDeletingSmtp: false,
            }));
            toast.success("Server Deleted Sucessfully");
            console.log(response.data.smtp);
            return response;

        } catch (err) {
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isDeletingSmtp: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    updateSmtpServer: async(host:string,port:number,username:string,password:string,id:number) => {
        try{
            const response = await axios.put(`${API_URL}/update-smtp`,
                {host,port,username,password}
            );
            set((state)=>({
                smtpServers: state.smtpServers.map((smtp)=>{
                    return smtp.id===id ? response.data.smtp : smtp;
                }),
                isUpdatingSmtp: false,
            }));
            toast.success("Server Updated Sucessfully");
            console.log(response.data.smtp);
            return response;
    
        }catch(err){
            const { response } = err as AxiosError<IErrorResponse>;
            set({ isUpdatingSmtp: false });
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
}));