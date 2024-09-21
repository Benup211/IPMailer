import { motion } from "framer-motion";
import { Search, Trash2,LogIn, CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { FC, ReactElement } from "react";
import { IClientProps } from "../../types";
import { SwitchComponent } from "../common/switch";

export const ClientTable: FC<IClientProps> = (props): ReactElement => {
    const { clients } = props;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredClients, setFilteredClients] = useState(clients);
    useEffect(() => {
        setFilteredClients(clients);
    }, [clients]);

    const handleSearch = (e: { target: { value: string } }) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = clients.filter(
            (client) =>
                client.email.toLowerCase().includes(term) ||
                client.organization.toLowerCase().includes(term)
        );
        setFilteredClients(filtered);
    };

    const addSmtp = () => {
        alert("Add Client");
        // navigate("/user/add-smtp");
    };

    const handleDeleteClient = async (id: string | number) => {
        try {
            // deleteSmtpServer(id as number);
            alert("Client Deleted"+id);
            // setFilteredClients((prev) => prev.filter((client) => smtp.id !== id));
            // decreaseStat("smtps");
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
                    Clients List
                </h2>
                <div className="flex items-center justify-between my-2 overflow-x-auto w-[100%] md:w-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Client..."
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
                            onClick={addSmtp}
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
                                Organization
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Joined At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Block
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {filteredClients.length === 0 ? (
                            <tr className="text-sm p-4 font-bold">
                                <td className="p-4" colSpan={3}>
                                    No Clients Found
                                </td>
                            </tr>
                        ) : (
                            filteredClients.map((clientData, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex justify-start items-center gap-2">
                                        <img
                                            src={`https://avatar.iran.liara.run/public/boy?username=${clientData.email.toString()}`}
                                            alt={clientData.email.toString()}
                                            className="size-10 rounded-full"
                                        />
                                        {clientData.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                        {clientData.organization}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {new Date(
                                            clientData.createdAt
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                        <SwitchComponent
                                            enable={clientData.blocked}
                                            clientId={clientData.id}
                                        />
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <button
                                            className="text-red-400 hover:text-red-300"
                                            onClick={() =>
                                                handleDeleteClient(clientData.id)
                                            }
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <button
                                            className="text-green-400 hover:text-green-300 ml-2"
                                            onClick={() =>
                                                handleDeleteClient(clientData.id)
                                            }
                                        >
                                            <LogIn size={18} />
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
