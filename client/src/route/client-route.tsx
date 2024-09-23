import { Routes, Route,useLocation,useNavigate } from "react-router-dom";
import {
    OverviewPage,
    SignInPage,
    SignUpPage,
    ForgetPasswordPage,
    TwoFAVerificationPage,
    VerificationPage,
    LogoutPage,
    EmailSubscribersPage,
    AddEmailPage,
    SendMailPage,
    MakeMailPage,
    DraftMailPage,
    SmtpPage,
    ProxyPage,
    SettingPage,
} from "../pages";
import { AddSmtp } from "../components/smtp/AddSmtp";
import { UpdateSmtp } from "../components/smtp/UpdateSmtp";
import { AddProxy } from "../components/proxy/AddProxy";
import { IRedirectAuthUserProps } from "../types";
import { AuthState } from "../state/AuthState";
import { FC, useEffect, useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import Sidebar from "../components/sidebar";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";

export const ClientRoute =() => {
    const location = useLocation();
    const { isAuthenticated,checkAuth, isCheckingAuth,user} = AuthState();
    const isMounted = useRef(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
    const navigation = useNavigate();
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
            <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-900 z-10">
                <Loader className="w-6 h-6 animate-spin mx-auto text-white" />
                <p className="mt-1 text-white font-semibold mx-auto p-10">
                    Please wait for 1-2 mins as backend is deployed in render.It
                    require some time to wake up.
                </p>
            </div>
        );
    }
    const ProtectedRoute: FC<IRedirectAuthUserProps> =({ children }) => {
        if(user.blocked){
            toast.error("Your account is blocked");
            navigation("/user/logout");
        }
        return isAuthenticated ? (
            <>{children}</>
        ) : (
            <Navigate to="/user/login" />
        );
    };

    const RedirectAuthUser: FC<IRedirectAuthUserProps> = ({ children }) => {
        if(user.blocked){
            toast.error("Your account is blocked");
            navigation("/user/logout");
        }
        return isAuthenticated ? <Navigate to="/user/" /> : <>{children}</>;
    };
    return (
        <>
            {isAuthenticated && location.pathname.startsWith("/user") && (
                <Sidebar />
            )}
            <Routes>
                <Route
                    path="/login"
                    element={
                        <RedirectAuthUser>
                            <SignInPage />
                        </RedirectAuthUser>
                    }
                />
                <Route
                    path="/signup"
                    element={
                        <RedirectAuthUser>
                            <SignUpPage />
                        </RedirectAuthUser>
                    }
                />
                <Route
                    path="/forgot-password"
                    element={
                        <RedirectAuthUser>
                            <ForgetPasswordPage />
                        </RedirectAuthUser>
                    }
                />
                <Route
                    path="/two-fa-verification"
                    element={
                        <RedirectAuthUser>
                            <TwoFAVerificationPage />
                        </RedirectAuthUser>
                    }
                />
                <Route
                    path="/verify-email/:id"
                    element={
                        <RedirectAuthUser>
                            <VerificationPage />
                        </RedirectAuthUser>
                    }
                />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <OverviewPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/email-subscribers"
                    element={
                        <ProtectedRoute>
                            <EmailSubscribersPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-email"
                    element={
                        <ProtectedRoute>
                            <AddEmailPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/send-mail"
                    element={
                        <ProtectedRoute>
                            <SendMailPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-mail"
                    element={
                        <ProtectedRoute>
                            <MakeMailPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/draft-mail"
                    element={
                        <ProtectedRoute>
                            <DraftMailPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/smtp-server"
                    element={
                        <ProtectedRoute>
                            <SmtpPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-smtp"
                    element={
                        <ProtectedRoute>
                            <AddSmtp />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/update-smtp"
                    element={
                        <ProtectedRoute>
                            <UpdateSmtp />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/proxy-server"
                    element={
                        <ProtectedRoute>
                            <ProxyPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-proxy"
                    element={
                        <ProtectedRoute>
                            <AddProxy />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <SettingPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/logout"
                    element={
                        isAuthenticated ? (
                            <LogoutPage />
                        ) : (
                            <Navigate to="/user/login" />
                        )
                    }
                />
                <Route path="/*" element={<Navigate to="/user/" />} />
            </Routes>
        </>
    );
};
