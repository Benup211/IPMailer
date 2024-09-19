import { Header } from "../common/header";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSmtpStore } from "../../state/SmtpState";

export const UpdateSmtp = () => {
    const { isUpdatingSmtp, updateSmtpServer, seletedSmtpServer } =
        useSmtpStore();
    const [host, setHost] = useState(seletedSmtpServer.host);
    const [port, setPort] = useState(seletedSmtpServer.port as number);
    const [username, setUsername] = useState(seletedSmtpServer.username);
    const [password, setPassword] = useState(seletedSmtpServer.password);
    const navigate = useNavigate();
    const handleAUpdateSmtpSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        try {
            await updateSmtpServer(
                host,
                Number(port),
                username,
                password,
                seletedSmtpServer.id
            );
            navigate("/user/smtp-server");
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Update Smtp Server" />

            <main className="py-6 px-4 lg:px-8 w-[100%] flex flex-col items-center justify-center overflow-x-auto ">
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleAUpdateSmtpSubmit}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-2"
                >
                    <div className="max-w-xl">
                        <div>
                            <label
                                htmlFor="host"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Host address
                            </label>
                            <div className="my-2">
                                <input
                                    id="host"
                                    name="host"
                                    type="text"
                                    required
                                    value={host}
                                    onChange={(e) => setHost(e.target.value)}
                                    placeholder="Host"
                                    disabled={isUpdatingSmtp}
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 md:min-w-96 min-w-64   "
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="port"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Host Port
                            </label>
                            <div className="my-2">
                                <input
                                    id="port"
                                    name="port"
                                    type="number"
                                    required
                                    value={port}
                                    onChange={(e) =>
                                        setPort(Number(e.target.value))
                                    }
                                    placeholder="Port"
                                    disabled={isUpdatingSmtp}
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 md:min-w-96 min-w-64   "
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Host Username
                            </label>
                            <div className="my-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    placeholder="Username"
                                    disabled={isUpdatingSmtp}
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 md:min-w-96 min-w-64   "
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Host Password
                            </label>
                            <div className="my-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    placeholder="Password"
                                    disabled={isUpdatingSmtp}
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 md:min-w-96 min-w-64   "
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isUpdatingSmtp ? (
                                    <Loader className="w-6 h-6 animate-spin  mx-auto" />
                                ) : (
                                    "Update Smtp Server"
                                )}
                            </button>
                        </div>
                    </div>
                </motion.form>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-2 text-center text-sm text-gray-500"
                >
                    Back To Smtp Server?{" "}
                    <Link
                        to="/user/smtp-server"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Go Back
                    </Link>
                </motion.p>
            </main>
        </div>
    );
};
