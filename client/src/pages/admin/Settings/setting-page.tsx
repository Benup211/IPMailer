import { motion } from "framer-motion";
import { Header } from "../../../components/common/header";
import { User } from "lucide-react";
import { useAdminStore } from "../../../state/AdminState";

export const AdminSettingPage = () => {
    const { admin } = useAdminStore();
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Settings" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center mb-4">
                        <User className="text-indigo-400 mr-4" size="24" />
                        <h2 className="text-xl font-semibold text-gray-100">
                            Profile
                        </h2>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center mb-6 overflow-x-auto">
                        <img
                            src={`https://avatar.iran.liara.run/public/boy?username=${admin.username.toString()}`}
                            alt={`${admin.username.toString()}`}
                            className="rounded-full w-16 h-16 object-cover mr-4"
                        />

                        <div className="mt-2 md:mt-0">
                            <p className="text-gray-400 text-sm md:text-lg">
                                Username:<b> {admin.username.toString()}</b>
                            </p>
                            <p className="text-gray-400 text-sm md:text-lg">
                                Joined Date:
                                <b>
                                    {" "}
                                    {new Date(
                                        admin.createdAt
                                    ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                        day: "numeric",
                                    })}
                                </b>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    );
};
