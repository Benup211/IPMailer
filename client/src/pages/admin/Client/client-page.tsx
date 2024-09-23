import { motion } from "framer-motion";
import { Header } from "../../../components/common/header";
import { ClientTable } from "../../../components/client/client-table";
import { useClientStore } from "../../../state/ClientState";
import { useEffect } from "react";
import { StatCard } from "../../../components/common/statcard";
import { Users } from "lucide-react";
import { useAdminStore } from "../../../state/AdminState";
export const ClientPage = () => {
    const { isGettingClients, gettingClients, clients } = useClientStore();
    const {admin_stats}=useAdminStore();
    useEffect(() => {
        gettingClients();
    }, [gettingClients]);
    if (isGettingClients) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Client Page" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name='Clients' color='#F59E0B' icon={Users} value={`${admin_stats.clients}`} />
                </motion.div>
                {/* CHARTS */}
                <ClientTable clients={clients} />
                <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
                    {/* chart */}
                    {/* chart */}
                </div>
            </main>
        </div>
    );
};
