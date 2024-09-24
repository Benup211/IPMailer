import { motion } from "framer-motion";
import { Search, Trash2, CirclePlus } from "lucide-react";
import { useState, useEffect } from "react";
import { FC, ReactElement } from "react";
import { IProxyServerProps } from "../../types";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../../state/AuthState";
import { useProxyStore } from "../../state/ProxyState";
import { Pagination } from "../common/pagination";

export const ProxyTable: FC<IProxyServerProps> = (props): ReactElement => {
    const { proxyServer } = props;
    const {decreaseStat,stat } = AuthState();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProxys, setFilteredProxys] = useState(proxyServer);
    const {deleteProxyServer,setSkip,selectedPage,setSelectedPage,gettingProxy,take}=useProxyStore();
    const totalPage = Math.ceil(stat.proxys / take);
    const handlePageChange = (page: number) => {
        setSkip(page);
        gettingProxy();
        setSelectedPage(page);
    }
    useEffect(() => {
        setFilteredProxys(proxyServer);
    }, [proxyServer]);

    const handleSearch = (e: { target: { value: string } }) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = proxyServer.filter((proxy) =>
            proxy.host.toLowerCase().includes(term)
        );
        setFilteredProxys(filtered);
    };

    const addProxy = () => {
        navigate("/user/add-proxy");
    };

    const handleDeleteSmtp = async (
        id: string | number,
    ) => {
        try {
            deleteProxyServer(id as number);
            setFilteredProxys((prev) =>
                prev.filter((proxy) => proxy.id !== id)
            );
            decreaseStat("proxys");
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
                    Proxy List
                </h2>
                <div className="flex items-center justify-between my-2 overflow-x-auto w-[100%] md:w-auto">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search Proxy Server..."
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
                            onClick={addProxy}
                        />
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Host
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Port
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Added At
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-700">
                        {filteredProxys.length === 0 ? (
                            <tr className="text-sm p-4 font-bold">
                                <td className="p-4" colSpan={3}>
                                    No Proxy Server Found
                                </td>
                            </tr>
                        ) : (
                            filteredProxys.map((proxyData, index) => (
                                <motion.tr
                                    key={index}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                        {proxyData.host}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                                        {proxyData.port}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {new Date(proxyData.addedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        <button
                                            className="text-red-400 hover:text-red-300"
                                            onClick={() =>
                                                handleDeleteSmtp(
                                                    proxyData.id
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
                {filteredProxys.length>0 && <Pagination currentPage={selectedPage} totalPages={totalPage} onPageChange={handlePageChange}/>}
            </div>
        </motion.div>
    );
};
