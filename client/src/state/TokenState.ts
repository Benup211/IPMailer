import {create} from 'zustand';
import { ITokenTypes, IErrorResponse } from '../types';
import axios, { AxiosError } from "axios";
import {toast} from 'react-hot-toast';
// const API_URL = "http://localhost:3000/api";
const API_URL = "https://ipmailer.onrender.com/api";

axios.defaults.withCredentials = true;
export const TokenState=create<ITokenTypes>((set)=>({
    isLoading:false,
    error:false,
    verifyEmail:async (token:string)=>{
        set({isLoading:true});
        try{
            const response=await axios.get(`${API_URL}/token/verify-email/${token}`);
            toast.success('Email Verified Successfully');
            set({isLoading:false,error:false});
            return response;
        }catch(err){
            const {response}=err as AxiosError<IErrorResponse>;
            set({isLoading:false,error:true});
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    verifyTwoFactor:async (code:string,id:string)=>{
        set({isLoading:true});
        try{
            const response=await axios.post(`${API_URL}/token/verify-two-factor`,{code,id});
            toast.success('Two Factor Verified Successfully');
            set({isLoading:false});
            return response;
        }catch(err){
            const {response}=err as AxiosError<IErrorResponse>;
            set({isLoading:false});
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    }
}));