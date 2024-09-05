import { FC } from "react";
import { IRedirectAuthUserProps } from "../../types";
import { AuthState } from "../../state/AuthState";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<IRedirectAuthUserProps> = ({ children }) => {
    const { isAuthenticated } = AuthState();
    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};
export default ProtectedRoute;