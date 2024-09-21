import { Routes, Route, Navigate } from "react-router-dom";
import { AdminOverviewPage, AdminLoginPage,ClientPage } from "../pages";
import AdminSidebar from "../components/admin-sidebar";
import { useAdminStore } from "../state/AdminState";
import { useEffect, useRef, useState, FC } from "react";
import { Loader } from "lucide-react";
import { IRedirectAuthUserProps } from "../types";
import { AdminLogoutPage } from "../pages/admin/Logout/logout-page";
import { AdminSettingPage } from "../pages/admin/Settings/setting-page";
export const AdminRoute = () => {
    const { isAdminAuthenticated, isAdminCheckingAuth, checkAdminAuth } =
        useAdminStore();
    const isMounted = useRef(false);
    const [isAdminAuthChecked, setIsAdminAuthChecked] = useState(false);
    useEffect(() => {
        if (!isMounted.current) {
            checkAdminAuth().finally(() => {
                setIsAdminAuthChecked(true);
            });
            isMounted.current = true;
        }
    }, []);

    if (isAdminCheckingAuth || !isAdminAuthChecked) {
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

    const ProtectedRoute: FC<IRedirectAuthUserProps> = ({ children }) => {
        return isAdminAuthenticated ? (
            <>{children}</>
        ) : (
            <Navigate to="/admin/login" />
        );
    };

    const RedirectAuthUser: FC<IRedirectAuthUserProps> = ({ children }) => {
        return isAdminAuthenticated ? (
            <Navigate to="/admin/" />
        ) : (
            <>{children}</>
        );
    };
    return (
        <>
            {isAdminAuthenticated && location.pathname.startsWith("/admin") && (
                <AdminSidebar />
            )}
            <Routes>
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <AdminOverviewPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/clients"
                    element={
                        <ProtectedRoute>
                            <ClientPage />
                        </ProtectedRoute>
                    }/>
                <Route
                    path="/settings"
                    element={
                        <ProtectedRoute>
                            <AdminSettingPage />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <RedirectAuthUser>
                            <AdminLoginPage />
                        </RedirectAuthUser>
                    }
                />
                <Route
                    path="/logout"
                    element={
                        isAdminAuthenticated ? (
                            <AdminLogoutPage />
                        ) : (
                            <Navigate to="/admin/login" />
                        )
                    }
                />
            </Routes>
        </>
    );
};
