import { useParams } from "react-router-dom";
import { TokenState } from "../../../state/TokenState";
import {useRef,useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
export const VerificationPage=()=>{
    const {isLoading,error,verifyEmail}=TokenState();
    const {id}=useParams();
    const navigate=useNavigate();
    const isMounted=useRef(false);
    useEffect(()=>{
        if(isMounted.current){
            return;
        }else{
            try{
               verifyEmail(id);
               navigate('/user/login');
            }catch(err){
                console.log(err);
            }
            isMounted.current=true;
        }
    },[]);
    if(isLoading){
        return(
            <div className="flex-1 overflow-auto relative z-10 h-screen w-screen flex justify-center items-center">
                <Loader className="w-6 h-6 animate-spin  mx-auto text-white" />
            </div>
        )
    }
    return(
        <div className="flex-1 overflow-auto relative z-10 h-screen w-screen flex justify-center items-center">
            {error?<h1 className="text-white-900">Error Occured</h1>:<h1 className="text-white-900">Email Verified Successfully</h1>}
        </div>
    )
}