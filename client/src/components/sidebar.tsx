import {
    BarChart2,
    Settings,
    Server,
    ServerCog,
    Menu,
    Mail,
    Send,
    SquarePen,
    LogOut,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ISidebarProps } from "../types/index";
import { Link } from "react-router-dom";

const SIDEBAR_ITEMS: ISidebarProps[] = [
    {
        name: "Overview",
        icon: BarChart2,
        color: "#6366f1",
        path: "/user",
    },
    {
        name: "SMTP Server",
        icon: Server,
        color: "#8B5CF6",
        path: "/user/smtp-server",
    },
    {
        name: "Proxy Server",
        icon: ServerCog,
        color: "#EC4899",
        path: "/user/proxy-server",
    },
    {
        name: "Email Subscribers",
        icon: Mail,
        color: "#10B981",
        path: "/user/email-subscribers",
    },
    {
        name: "Send Mail",
        icon: Send,
        color: "#F59E0B",
        path: "/user/send-mail",
    },
    {
        name: "Draft Mails",
        icon: SquarePen,
        color: "#3B82F6",
        path: "/user/draft-mail",
    },
    {
        name: "Settings",
        icon: Settings,
        color: "#6EE7B7",
        path: "/user/settings",
    },
    {
        name:"Logout",
        icon:LogOut,
        color:"#C0392B",
        path:"/user/logout"
    }
];

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (
        <motion.div
            className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
                isSidebarOpen ? "w-64" : "w-20"
            }`}
            animate={{ width: isSidebarOpen ? "256" : "80" }}
        >
            <div className="h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700">
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="p-2 rounded-full hover:bg-gray-700 transi max-w-fit"
                >
                    <Menu size={24} />
                </motion.button>
                <nav className="mt-8 flex-grow">
                    {SIDEBAR_ITEMS.map((item: ISidebarProps) => (
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
                                    {isSidebarOpen && (
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

export default Sidebar;
