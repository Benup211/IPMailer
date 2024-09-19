import { FC, ReactElement, useRef,useEffect } from "react";
import { AuthState } from "../../../state/AuthState";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const LogoutPage: FC = (): ReactElement => {
    const { logoutUser, isLoading } = AuthState();
    const isLogoutMounted = useRef(false);
    const navigate = useNavigate();
    useEffect(() => {
        if(!isLogoutMounted.current){
            try {
                logoutUser().finally(() => {
                    navigate("/user/login");
                });
            } catch (err) {
                console.log(err);
            }
            finally{
                isLogoutMounted.current=true;
            }
        }
    }, []);
    return (
        <div className="z-10 w-screen h-screen flex justify-center items-center">
            {isLoading && <Loader className="w-6 h-6 animate-spin  mx-auto text-white" />}
        </div>
    );
};
