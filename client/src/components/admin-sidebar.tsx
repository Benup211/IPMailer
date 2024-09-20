import {
    BarChart2,
    Settings,
    Menu,
    LogOut,
    Users
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ISidebarProps } from "../types/index";
import { Link } from "react-router-dom";

const ADMIN_SIDEBAR_ITEMS: ISidebarProps[] = [
    {
        name: "Overview",
        icon: BarChart2,
        color: "#6366f1",
        path: "/admin",
    },
    {
        name: "Clients",
        icon: Users,
        color: "#F59E0B",
        path: "/admin/clients",
    },
    {
        name: "Settings",
        icon: Settings,
        color: "#6EE7B7",
        path: "/admin/settings",
    },
    {
        name:"Logout",
        icon:LogOut,
        color:"#C0392B",
        path:"/admin/logout"
    }
];

const AdminSidebar = () => {
    const [isAdminSidebarOpen, setIsAdminSidebarOpen] = useState(true);
    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
                isAdminSidebarOpen ? "w-64" : "w-20"
            }`}
            animate={{ width: isAdminSidebarOpen ? "256" : "80" }}
        >
            <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsAdminSidebarOpen(!isAdminSidebarOpen)}
                    className="p-2 rounded-full hover:bg-gray-700 transi max-w-fit"
                >
                    <Menu size={24} />
                </motion.button>
                <nav className="mt-8 flex-grow">
                    {ADMIN_SIDEBAR_ITEMS.map((item: ISidebarProps) => (
                        <Link key={item.path} to={item.path}>
                            <motion.div className="flex items-center p-4 test-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2">
                                <item.icon
                                    size={20}
                                    style={{
                                        color: item.color,
                                        minWidth: "20px",
                                    }}
                                />
                                <AnimatePresence>
                                    {isAdminSidebarOpen && (
                                        <motion.span
                                            className="ml-4 whitespace-nowrap"
                                            initial={{ opacity: 0, width: 0 }}
                                            animate={{
                                                opacity: 1,
                                                width: "AUTO",
                                            }}
                                            exit={{ opacity: 0, width: 0 }}
                                            transition={{
                                                duration: 0.2,
                                                delay: 0.1,
                                            }}
                                        >
                                            {item.name}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </Link>
                    ))}
                </nav>
            </div>
        </motion.div>
    );
};

export default AdminSidebar;
