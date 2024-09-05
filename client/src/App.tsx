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
    EmailSubscribersPage,
    AddEmailPage
} from "./pages";
import { AuthState } from "./state/AuthState";
import { Navigate } from "react-router-dom";
import { IRedirectAuthUserProps } from "./types";
import { FC, useState, useEffect, useRef } from "react";
import { Loader } from "lucide-react";

const App = () => {
    const { isAuthenticated, checkAuth, isCheckingAuth } = AuthState();
    const isMounted = useRef(false);
    const [isAuthChecked, setIsAuthChecked] = useState(false);
  
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
        <div className="flex items-center justify-center h-screen w-screen bg-gray-900">
          <Loader className="w-6 h-6 animate-spin mx-auto" />
        </div>
      );
    }
  
    const ProtectedRoute:FC<IRedirectAuthUserProps> = ({ children }) => {
      return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
    };
  
    const RedirectAuthUser:FC<IRedirectAuthUserProps> = ({ children }) => {
      return isAuthenticated ? <Navigate to="/" /> : <>{children}</>;
    };
  
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
            }/>
          <Route
            path="/logout"
            element={
              isAuthenticated? <LogoutPage /> :<Navigate to="/login" />
            }
          />
        </Routes>
        <Toaster />
      </div>
    );
  };
  
  export default App;