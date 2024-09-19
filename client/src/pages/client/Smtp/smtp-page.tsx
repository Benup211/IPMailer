import { motion } from "framer-motion";
import { Header } from "../../../components/common/header";
import { StatCard } from "../../../components/common/statcard";
import {  User ,Server,ServerCog} from "lucide-react";
import { AuthState } from "../../../state/AuthState";
import { SmtpTable } from "../../../components/smtp/smtpTable";
import { useSmtpStore } from "../../../state/SmtpState";
import { useEffect } from "react";
export const SmtpPage = () => {
    const { stat } = AuthState();
    const { isGettingSmtpServers, gettingSmtp, smtpServers } = useSmtpStore();
    useEffect(() => {
        gettingSmtp();
    }, [gettingSmtp]);
    if (isGettingSmtpServers) {
        return (
            <div className="flex-1 flex items-center justify-center">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
            </div>
        );
    }
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Smtp Server" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard
                        name="Smtp Servers"
                        icon={Server}
                        value={`${stat.smtps}`}
                        color="#8B5CF6"
                    />
                    <StatCard
                        name="Proxy Server"
                        icon={ServerCog}
                        value={`${stat.proxys}`}
                        color="#EC4899"
                    />
                    <StatCard
                        name="Subscribers"
                        icon={User}
                        value={`${stat.subscribers}`}
                        color="#23aefc"
                    />
                </motion.div>
                {/* CHARTS */}
                <SmtpTable smtpServer={smtpServers} />
                <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
                    {/* chart */}
                    {/* chart */}
                </div>
            </main>
        </div>
    );
};
