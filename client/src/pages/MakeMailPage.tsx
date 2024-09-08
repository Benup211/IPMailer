import { motion } from "framer-motion";
import { Header } from "../components/common/header";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import {MailEditor} from '../components/richtexteditor/MailEditor';
export const MakeMailPage = () => {
    const handleMailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        return e.preventDefault();
    }
    const isSendingMail = false;
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Send Mail" />

            <main className="py-6 px-4 lg:px-8 h-[30vh] md:h-[40vh] w-[100%] flex flex-col items-center justify-center overflow-x-auto ">
                <motion.form
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleMailSubmit}
                    className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-2"
                >
                    <div className="max-w-xl">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Email address
                            </label>
                            <div className="my-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={"all"}
                                    onChange={(e) => e.target.value}
                                    placeholder="Email address"
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 md:min-w-96 min-w-64   "
                                />
                            </div>
                        </div>
                        <div>
                            <MailEditor />
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isSendingMail ? (
                                    <Loader className="w-6 h-6 animate-spin  mx-auto" />
                                ) : (
                                    "Add Email"
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
                    Back To Mail List?{" "}
                    <Link
                        to="/send-mail"
                        className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                    >
                        Go Back
                    </Link>
                </motion.p>
            </main>
        </div>
    );
};
