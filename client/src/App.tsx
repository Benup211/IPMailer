import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ClientRoute,HomeRoute,AdminRoute } from "./route";


const App = () => {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>
            <Routes>
                <Route path="/user/*" element={<ClientRoute />} />
                <Route path="/*" element={<HomeRoute />} />
                <Route path="/admin/*" element={<AdminRoute />} />
            </Routes>
            <Toaster />
        </div>
    );
};

export default App;
