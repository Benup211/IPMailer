import { Routes, Route } from "react-router-dom";
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
import { FC } from "react";
import { Navigate } from "react-router-dom";

export const ClientRoute = () => {
    const { isAuthenticated } = AuthState();
    const ProtectedRoute: FC<IRedirectAuthUserProps> = ({ children }) => {
        return isAuthenticated ? <>{children}</> : <Navigate to="/user/login" />;
    };

    const RedirectAuthUser: FC<IRedirectAuthUserProps> = ({ children }) => {
        return isAuthenticated ? <Navigate to="/user/" /> : <>{children}</>;
    };
    return (
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
                    isAuthenticated ? <LogoutPage /> : <Navigate to="/login" />
                }
            />
            <Route path="/*" element={<Navigate to="/user/" />} />
        </Routes>
    );
}
