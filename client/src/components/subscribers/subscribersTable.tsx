import { motion } from "framer-motion";
import { Search, Trash2, CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { FC, ReactElement } from "react";
import { ISubscribers } from "../../types";
import { useNavigate } from "react-router-dom";
import { useSubscriberStore } from "../../state/SubscriberState";
import { AuthState } from "../../state/AuthState";
import { Pagination } from "../common/pagination";

export const SubscribersTable: FC<ISubscribers> = (props): ReactElement => {
    const { subscribers } = props;
    const { deleteSubscriber,setSkip,take,getSubscribers,setSelectedPage,selectedPage } = useSubscriberStore();
    const { user,decreaseStat,stat } = AuthState();
    const navigate = useNavigate();
    const totalPage = Math.ceil(stat.subscribers / take);
    const handlePageChange = (page: number) => {
        setSkip(page);
        getSubscribers();
        setSelectedPage(page);
    };
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredSubscribers, setFilteredSubscribers] = useState(subscribers);

    useEffect(() => {
        setFilteredSubscribers(subscribers);
    }, [subscribers]);

    const handleSearch = (e: { target: { value: string } }) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = subscribers.filter((subscriber) =>
            subscriber.email.toLowerCase().includes(term)
        );
        setFilteredSubscribers(filtered);
    };

    const addEmail = () => {
        navigate("/user/add-email");
    };

    const handleDeleteSubscriber = async (
        id: string | number,
        userID: string | number
    ) => {
        try {
            await deleteSubscriber(id, userID);
            setFilteredSubscribers((prev) =>
                prev.filter((subscriber) => subscriber.id !== id)
            );
            decreaseStat("subscribers");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <motion.div
            className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
        >
            <div className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-100">
                    Subscribers List
                </h2>
                <div className="flex items-center justify-between my-2 overflow-x-auto w-[100%] md:w-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Subscribers..."
                            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-[240px]"
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                        <Search
                            className="absolute left-3 top-2.5 text-gray-400"
                            size={18}
                        />
                    </div>
                    <div>
                        <CirclePlus
                            className="relative text-gray-400 mx-2"
                            style={{ width: "2rem", height: "2rem" }}
                            onClick={addEmail}
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Email
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Joined Date
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {filteredSubscribers.length === 0 ? (
                            <tr className="text-sm p-4 font-bold">
                                <td className="p-4" colSpan={3}>
                                    No Subscribers Found
                                </td>
                            </tr>
                        ) : (
                            filteredSubscribers.map((emailData, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                                        <img
                                            src={`https://avatar.iran.liara.run/public/boy?username=${emailData.email.toString()}`}
                                            alt={emailData.email.toString()}
                                            className="size-10 rounded-full"
                                        />
                                        {emailData.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {new Date(emailData.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <button
                                            className="text-red-400 hover:text-red-300"
                                            onClick={() =>
                                                handleDeleteSubscriber(
                                                    emailData.id,
                                                    user.id
                                                )
                                            }
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
                {filteredSubscribers.length>0 && <Pagination currentPage={selectedPage} totalPages={totalPage} onPageChange={handlePageChange}/>}
            </div>
        </motion.div>
    );
};
