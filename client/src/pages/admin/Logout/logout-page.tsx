import { FC, ReactElement, useRef,useEffect } from "react";
import { useAdminStore } from "../../../state/AdminState";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const AdminLogoutPage: FC = (): ReactElement => {
    const {logoutAdmin,isLoading}=useAdminStore();
    const isAdminLogoutMounted = useRef(false);
    const navigate = useNavigate();
    useEffect(() => {
        if(!isAdminLogoutMounted.current){
            try {
                logoutAdmin().finally(() => {
                    navigate("/admin/login");
                });
            } catch (err) {
                console.log(err);
            }
            finally{
                isAdminLogoutMounted.current=true;
            }
        }
    }, []);
    return (
        <div className="z-10 w-screen h-screen flex justify-center items-center">
            {isLoading && <Loader className="w-6 h-6 animate-spin  mx-auto text-white" />}
        </div>
    );
};
