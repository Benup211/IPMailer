import {FC,ReactElement,useRef,useEffect} from 'react';
import { AuthState } from '../state/AuthState';
import { Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export const LogoutPage: FC = (): ReactElement => {
    const {logoutUser,isLoading}=AuthState();
    const navigate=useNavigate();
    const isMounted=useRef(false);
    useEffect(()=>{
        if(isMounted.current){
            return;
        }else{
            try{
                logoutUser();
                navigate('/login');
            }catch(err){
                console.log(err);
            }
            isMounted.current=true;
        }
    },[]);
    return (
        <div className='z-10 w-screen h-screen flex justify-center items-center'>
            {isLoading && <Loader className="w-6 h-6 animate-spin  mx-auto" />}
        </div>
    )
}