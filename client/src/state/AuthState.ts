import {create} from 'zustand';
import { IAuthState, IErrorResponse } from '../types';
import axios, { AxiosError } from "axios";
import {toast} from 'react-hot-toast';
const API_URL = "http://localhost:3000/api";

axios.defaults.withCredentials = true;
export const AuthState=create<IAuthState>((set)=>({
    user:{
        id:'',
        email:'',
        organization:'',
        active:false,
        createdAt:'',
        updatedAt:''
    },
    isAuthenticated:false,
    isCheckingAuth:false,
    isLoading:false,
    setAuthentication:async (isAuthenticated:boolean)=>{
        set({isAuthenticated:isAuthenticated});
    },
    registerUser:async (email:string,password:string,confirmPassword:string,organization:string)=>{
        set({isLoading:true});
        try{
            console.log(API_URL);
            const response=await axios.post(`${API_URL}/auth/register`,{email,password,confirmPassword,organization});
            toast.success('Account created successfully,Check Mail for Verification');
            set({isLoading:false});
            return response;
        }catch(err){
            const {response}=err as AxiosError<IErrorResponse>;
            set({isLoading:false});
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    loginUser:async (email:string,password:string)=>{
        set({isLoading:true});
        try{
            const response=await axios.post(`${API_URL}/auth/login`,{email,password});
            set({isLoading:false,user:response.data});
            toast.success("Check your email for 2FA Code");
            return response;
        }catch(err){
            const {response}=err as AxiosError<IErrorResponse>;
            set({isLoading:false});
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    logoutUser:async ()=>{
        set({isLoading:true});
        try{
            const response=await axios.get(`${API_URL}/auth/logout`);
            set({isLoading:false,isAuthenticated:false});
            toast.success(response.data.message);
            return response;
        }catch(err){
            const {response}=err as AxiosError<IErrorResponse>;
            set({isLoading:false});
            toast.error(response?.data.errorMessage as string);
            throw Error(response?.data.errorMessage);
        }
    },
    checkAuth:async ()=>{
        set({isCheckingAuth:true});
        try{
            const response=await axios.get(`${API_URL}/auth/getUser`);
            set({isAuthenticated:true,isCheckingAuth:false,user:response.data});
            return response;
        }catch(err){
            const {response}=err as AxiosError<IErrorResponse>;
            set({isAuthenticated:false,isCheckingAuth:false});
            throw Error(response?.data.errorMessage);
        }
    }
}));