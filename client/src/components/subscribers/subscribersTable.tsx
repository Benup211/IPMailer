import { motion } from "framer-motion";
import { Search, Trash2, CirclePlus } from "lucide-react";
import { useState } from "react";
import {FC,ReactElement} from 'react';
import { ISubscribers } from "../../types";
import { useNavigate } from "react-router-dom";
export const SubscribersTable:FC<ISubscribers> = (props):ReactElement => {
    const {subscribers}=props;
    const [searchTerm, setSearchTerm] = useState("");
    const [filterEmail, setFilterEmail] = useState(subscribers);
    const navigate=useNavigate();
    const handleSearch = (e: { target: { value: string } }) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = subscribers.filter((subscriber) =>
            subscriber.email.toLowerCase().includes(term)
        );

        setFilterEmail(filtered);
    };
    const addEmail=()=>{
        navigate('/add-email');
    }
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
                        {filterEmail.length === 0 ? (
                            <tr className="text-sm p-4 font-bold">
                                <td className="p-4" colSpan={3}>
                                    No Subscribers Found
                                </td>
                            </tr>
                        ) : (
                            filterEmail.map((emails, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
                                        <img
                                            src={`https://avatar.iran.liara.run/public/boy?username=${emails.email}`}
                                            alt={`${emails.email}`}
                                            className="size-10 rounded-full"
                                        />
                                        {emails.email}
                                    </td>

                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {emails.createdAt.toString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <button className="text-red-400 hover:text-red-300">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};
