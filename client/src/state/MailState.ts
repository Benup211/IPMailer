import {create} from 'zustand';
import {IMailState,IErrorResponse} from '../types';
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";

const API_URL = "http://localhost:3000/api";

axios.defaults.withCredentials = true;
export const useMailStore=create<IMailState>((set)=>({
    isGettingMails: false,
    isAddingMail:false,
    isAddingDraftMail:false,
    isDeletingMail: false,
    mails:[],
    draftMails:[],
    valueFromDraftMail:{
        id:0,
        subject:"",
        message:"",
        sendDate:new Date()
    },
    setMails: (mail) => {
        set((state) => ({
            mails: [...state.mails,...mail],
        }));
    },
    getMails:async()=>{
        set({isGettingMails:true});
        try{
            const response=await axios.get(
                `${API_URL}/mail/get-mails`
            );
            set({
                mails:response.data.mails,
                isGettingMails:false,
            });
            console.log(response.data.mails);
            return response;
        }catch(err){
            const {response}=err as AxiosError<IErrorResponse>;
            set({isGettingMails:false});
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    addMail:async(subject:string,message:string)=>{
        set({isAddingMail:true});
        try{
            const response=await axios.post(
                `${API_URL}/mail/create-mail`,
                {subject,message}
            );
            set({
                isAddingMail:false,
                setMails:response.data.mail,
                valueFromDraftMail:{
                    id:0,
                    subject:"",
                    message:"",
                    sendDate:new Date()
                }
            });
            toast.success("Mail added successfully");
            return response;
        }catch(err){
            const {response}=err as AxiosError<IErrorResponse>;
            set({isAddingMail:false});
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    deleteMail:async(id:string|number)=>{
        set({isDeletingMail:true});
        try{
            const response=await axios.post(
                `${API_URL}/mail/delete-mail`,
                {id}
            );
            set((state)=>(
                {
                    isDeletingMail:false,
                    mails:state.mails.filter((mail)=>mail.id!==id)
                }
            ));
            toast.success("Mail deleted successfully");
            return response;
        }catch(err){
            const {response}=err as AxiosError<IErrorResponse>;
            set({isDeletingMail:false});
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    getDraftMails:async()=>{
        set({isGettingMails:true});
        try{
            const response=await axios.get(
                `${API_URL}/mail/get-draft-mails`
            );
            set({
                draftMails:response.data.mails,
                isGettingMails:false,
            });
            console.log(response.data.mails);
            return response;
        }catch(err){
            const {response}=err as AxiosError<IErrorResponse>;
            set({isGettingMails:false});
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    addDraftMail:async(subject:string,message:string)=>{
        set({isAddingDraftMail:true});
        try{
            const response=await axios.post(
                `${API_URL}/mail/create-draft-mail`,
                {subject,message}
            );
            set({
                isAddingDraftMail:false,
                setMails:response.data.mail,
                valueFromDraftMail:{
                    id:0,
                    subject:"",
                    message:"",
                    sendDate:new Date()
                }
            });
            toast.success("Draft Mail added successfully");
            return response;
        }catch(err){
            const {response}=err as AxiosError<IErrorResponse>;
            set({isAddingDraftMail:false});
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    deleteDraftMail:async(id:string|number)=>{
        set({isDeletingMail:true});
        try{
            const response=await axios.post(
                `${API_URL}/mail/delete-draft-mail`,
                {id}
            );
            set((state)=>(
                {
                    isDeletingMail:false,
                    valueFromDraftMail:state.draftMails.filter((mail)=>mail.id===id)[0],
                    draftMails:state.draftMails.filter((mail)=>mail.id!==id)
                }
            ));
            toast.success("Draft Mail deleted successfully");
            return response;
        }catch(err){
            const {response}=err as AxiosError<IErrorResponse>;
            set({isDeletingMail:false});
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    }
}))