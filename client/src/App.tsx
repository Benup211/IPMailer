import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { Toaster } from "react-hot-toast";
import {
    OverviewPage,
    SignInPage,
    SignUpPage,
    ForgetPasswordPage,
    TwoFAVerificationPage,
    VerificationPage,
    LogoutPage,
} from "./pages";
import { AuthState } from "./state/AuthState";
import { Navigate } from "react-router-dom";
import { IRedirectAuthUserProps } from "./types";
import { FC, useRef, useEffect } from "react";
import { Loader } from "lucide-react";

const ProtectedRoute: FC<IRedirectAuthUserProps> = ({ children }) => {
    const { isAuthenticated } = AuthState();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};
const RedirectAuthUser: FC<IRedirectAuthUserProps> = ({ children }) => {
    const { isAuthenticated } = AuthState();
    return isAuthenticated ? <Navigate to="/" /> : <>{children}</>;
};

function App() {
    const isMounted = useRef(false);
    const { isAuthenticated, checkAuth, isCheckingAuth } = AuthState();
    useEffect(() => {
        if (isMounted.current) {
            return;
        } else {
            checkAuth();
            isMounted.current = true;
        }
    }, []);
    if (isCheckingAuth) {
        <div className="flex items-center justify-center h-screen">
            <Loader className="w-6 h-6 animate-spin  mx-auto" />
        </div>;
    }
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>
            {isAuthenticated && <Sidebar />}
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
                <Route path="/smtp-server" element={<div>hello</div>} />
                <Route
                    path="/logout"
                    element={
                        <ProtectedRoute>
                            <LogoutPage />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Toaster />
        </div>
    );
}

export default App;
