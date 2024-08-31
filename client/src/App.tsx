import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/sidebar";
import { OverviewPage, SignInPage,SignUpPage } from "./pages";
function App() {
    const isAuthenticated = false;
    return (
        <div className="flex h-screen bg-gray-900 text-gray-100 overflow-hidden">
            {isAuthenticated ? (
                <>
                    <div className="fixed inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 opacity-80" />
                        <div className="absolute inset-0 backdrop-blur-sm" />
                    </div>
                    <Sidebar />
                    <Routes>
                        <Route path="/" element={<OverviewPage />} />
                        <Route path="/smtp-server" element={<div>hello</div>} />
                    </Routes>
                </>
            ) : (
                <>
                    <Routes>
                        <Route path="/login" element={<SignInPage />} />
                        <Route path="/signup" element={<SignUpPage />} />
                    </Routes>
                </>
            )}
        </div>
    );
}

export default App;
