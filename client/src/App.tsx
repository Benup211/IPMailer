import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { OverviewPage } from "./pages";
function App() {
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 opacity-80" />
                <div className="absolute inset-0 backdrop-blur-sm" />
            </div>
            <Sidebar />
            <Routes>
                <Route path="/" element={<OverviewPage/>} />
                <Route path="/products" element={<div>hello</div>} />
            </Routes>
        </div>
    );
}

export default App;
