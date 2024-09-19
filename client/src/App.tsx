import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthState } from "./state/AuthState";
import { useState, useEffect, useRef } from "react";
import { Loader } from "lucide-react";
import  { ClientRoute }  from "./route/client-route";
import { HomeRoute } from "./route/home-route";
import Sidebar from "./components/sidebar";

const App = () => {
    const { isAuthenticated,checkAuth, isCheckingAuth } = AuthState();
    const isMounted = useRef(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (!isMounted.current) {
            checkAuth().finally(() => {
                setIsAuthChecked(true);
            });
            isMounted.current = true;
        }
    }, []);

    if (isCheckingAuth || !isAuthChecked) {
        return (
            <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900">
                <Loader className="w-6 h-6 animate-spin mx-auto text-white" />
                <p className="mt-1 text-white font-semibold mx-auto">
                    Please wait for 1 mins as backend is deployed in render.I
                    require some time to wake up.
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>
            {isAuthenticated && location.pathname.startsWith('/user') && <Sidebar />}
            <Routes>
                <Route path="/user/*" element={<ClientRoute />} />
                <Route path="/*" element={<HomeRoute />} />
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;
