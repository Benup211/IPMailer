import { motion } from "framer-motion";
import { Header } from "../components/common/header";
import { Link } from "react-router-dom";
import { Loader, Send,SquarePen } from "lucide-react";
import { useState } from "react";
import { useMailStore } from "../state/MailState";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../state/AuthState";
export const MakeMailPage = () => {
    const {increaseStat}=AuthState();
    const {isAddingMail,addMail,addDraftMail,isAddingDraftMail,valueFromDraftMail}=useMailStore();
    const [mailSubject, setMailSubject] = useState(valueFromDraftMail.subject);
    const [mailBody, setMailBody] = useState(valueFromDraftMail.message);
    const navigate=useNavigate();
    const handleMailSubmit =async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };
    const handleSendMail=async()=>{
        try {
            await addMail(mailSubject,mailBody);
            setMailSubject("");
            setMailBody("");
            increaseStat('mails');
            navigate("/send-mail");
        } catch (error) {
            console.log(error);
        }
    }
    const handleDraftMail=async()=>{
        try {
            await addDraftMail(mailSubject,mailBody);
            setMailSubject("");
            setMailBody("");
            increaseStat('drafts');
            navigate("/draft-mail");
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Send Mail" />

            <main className="py-6 px-4 lg:px-8 w-[100%] flex flex-col items-center justify-center overflow-x-auto ">
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
                                htmlFor="Subject"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Subject
                            </label>
                            <div className="my-2">
                                <input
                                    id="Subject"
                                    name="Subject"
                                    type="text"
                                    required
                                    onChange={(e) =>
                                        setMailSubject(e.target.value)
                                    }
                                    placeholder="Mail Subject"
                                    value={mailSubject as string}
                                    disabled={isAddingMail || isAddingDraftMail}
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 md:min-w-96 min-w-64"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="Message"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Message
                            </label>
                            <div className="my-2">
                                <textarea
                                    id="Message"
                                    name="Message"
                                    required
                                    onChange={(e) =>
                                        setMailBody(e.target.value)
                                    }
                                    placeholder="Mail Message"
                                    value={mailBody as string}
                                    disabled={isAddingMail || isAddingDraftMail}
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 md:min-w-96 min-w-64   "
                                />
                            </div>
                        </div>
                        <div className="flex gap-1">
                            <button
                                type="submit"
                                className="flex w-[50%] justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                onClick={handleSendMail}
                                disabled={isAddingMail || isAddingDraftMail}
                            >
                                {isAddingMail ? (
                                    <Loader className="w-6 h-6 animate-spin  mx-auto" />
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <Send size={14} />
                                        Send Mail
                                    </div>
                                )}
                            </button>
                            <button
                                type="submit"
                                className="flex w-[50%] justify-center rounded-md bg-yellow-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-yellow-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-600"
                                onClick={handleDraftMail}
                                disabled={isAddingMail || isAddingDraftMail}
                            >
                                {isAddingDraftMail ? (
                                    <Loader className="w-6 h-6 animate-spin  mx-auto" />
                                ) : (
                                    <div className="flex items-center gap-1">
                                        <SquarePen size={14} />
                                        Draft Mail
                                    </div>
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
                        className="font-semibold leading-6 text-green-600 hover:text-green-500"
                    >
                        Go Back
                    </Link>
                </motion.p>
            </main>
        </div>
    );
};
