import { Routes, Route } from "react-router-dom";
import { AdminOverviewPage } from "../pages";
import AdminSidebar from "../components/admin-sidebar";
export const AdminRoute = () => {
    return (
        <>
            <AdminSidebar />
            <Routes>
                <Route path="/" element={<AdminOverviewPage />} />
            </Routes>
        </>
    );
};
