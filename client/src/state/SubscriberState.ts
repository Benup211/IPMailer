import {create} from 'zustand';
import {ISubscriberState,IErrorResponse} from '../types';
import axios,{AxiosError} from 'axios';
import {toast} from 'react-hot-toast';

const API_URL = "http://localhost:3000/api";

axios.defaults.withCredentials=true;
export const useSubscriberStore = create<ISubscriberState>((set) => ({
  isGettingSubscribers: false,
  isAddingSubscriber: false,
  subscribers: [],
  setSubscribers:(subscriber)=>{
    set((state)=>({subscribers:[...state.subscribers,...subscriber]}));
  },
  getSubscribers:async()=>{
    set({isGettingSubscribers:true});
    try{
      const response = await axios.get(`${API_URL}/subscriber/get-subscribers`);
      set({subscribers:response.data.subscribers,isGettingSubscribers:false});
      console.log(response.data.subscribers);
      return response;
    }catch(err){
      const {response} = err as AxiosError<IErrorResponse>;
      set({isGettingSubscribers:false});
      toast.error(response?.data.errorMessage as string);
      throw Error(response?.data.errorMessage);
    }
  },
  addSubscriber:async(email:string,userID:string|number)=>{
    set({isAddingSubscriber:true});
    try{
      const response = await axios.post(`${API_URL}/subscriber/add-subscriber`,{email,userID});
      set({isAddingSubscriber:false,setSubscribers:response.data.subscriber});
      return response;
    }catch(err){
      const {response} = err as AxiosError<IErrorResponse>;
      set({isAddingSubscriber:false});
      toast.error(response?.data.errorMessage as string);
      throw Error(response?.data.errorMessage);
    }
  }
}));