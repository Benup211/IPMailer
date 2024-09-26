import { motion } from "framer-motion";
import { Trash2, Loader } from "lucide-react";
import { AuthState } from "../../state/AuthState";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export const DeleteClient = () => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [countdown, setCountdown] = useState(10);
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const { isLoading, deleteUser } = AuthState();
    const navigate = useNavigate();
    const handleDeleteUser = async () => {
        try {
            await deleteUser();
            navigate("/user/login");
        } catch (err) {
            console.log(err);
        }
    };
    const handleDeleteClick = () => {
        setIsDeleting(true);
        setCountdown(10);
        const newTimer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);
        setTimer(newTimer);
    };
    const handleCancelClick = () => {
        setIsDeleting(false);
        if (timer) {
            clearInterval(timer);
        }
        setCountdown(10);
    };

    useEffect(() => {
        if (countdown === 0 && isDeleting) {
            if (timer) {
                clearInterval(timer);
            }
            handleDeleteUser();
        }
    }, [countdown, isDeleting, handleDeleteUser, timer]);
    return (
        <motion.div
            className="bg-red-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-red-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
        >
            <div className="flex items-center mb-4">
                <Trash2 className="text-red-400 mr-3" size={24} />
                <h2 className="text-xl font-semibold text-gray-100">
                    Danger Zone
                </h2>
            </div>
            <p className="text-gray-300 mb-4">
                Permanently delete your account and all of your content.
            </p>
            <div className="flex justify-start items-center">
                <button
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                    onClick={handleDeleteClick}
                    disabled={isLoading}
                >
                    {isDeleting ? (
                        <Loader className="w-6 h-6 animate-spin  mx-auto" />
                    ) : (
                        "Delete Account"
                    )}
                </button>
                <button
                    className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-200 ${
                        isDeleting ? "inline-block" : "hidden"
                    } ml-2`}
                    onClick={handleCancelClick}
                >
                    Cancel.. ({countdown})
                </button>
            </div>
        </motion.div>
    );
};
