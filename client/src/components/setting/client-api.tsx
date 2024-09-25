import {motion} from "framer-motion";
import { UserProps } from "../../types";

const backend = import.meta.env.VITE_API_URL;
export const ClientApi = ({user}:{
    user:UserProps;
}) => {
    return (
        <motion.code
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex text-left flex-col space-x-4 bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8 w-[100%] overflow-x-auto"
        >
            <div className="flex items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-100">
                    Adding Subscriber API
                </h2>
            </div>
            <span className="flex gap-4">
                <span className="shrink-0 text-gray-500">$</span>

                <span className="flex-1">
                    <span className="text-yellow-500">
                        {backend}/subscriber/add-subscriber
                    </span>
                </span>
            </span>

            <div className="flex-1">
                <pre className="text-gray-300 ml-6">
                    {JSON.stringify(
                        {
                            apiKey: user.apiKey,
                            email: "example@gmail.com",
                        },
                        null,
                        2
                    )}
                </pre>
            </div>
        </motion.code>
    );
};
