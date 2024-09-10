import { FC, ReactElement } from "react";
import { Header } from "../components/common/header";
import {motion} from "framer-motion";
import { SendMailTable } from "../components/mails/sendMailTable";
import { StatCard } from "../components/common/statcard";
import { Send, SquarePen,User } from "lucide-react";
import { useEffect } from "react";
import { useMailStore } from "../state/MailState";
import { AuthState } from "../state/AuthState";

export const SendMailPage: FC = (): ReactElement => {
    const {isGettingMails,getMails,mails}=useMailStore();
    const {stat}=AuthState();
    useEffect(()=>{
        getMails();
    },[getMails]);
    if(isGettingMails){
        return (
			<div className="flex-1 flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
    }
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Send Mail" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                {/* STATS */}
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name='Send Mail' icon={Send} value={`${stat.mails}`} color='#10B981'/>
                    <StatCard name='Draft' icon={SquarePen} value={`${stat.drafts}`} color='#3B82F6'/> 
                    <StatCard name='Subscribers' icon={User} value={`${stat.subscribers}`} color='#23aefc'/>
                </motion.div>
                
                <SendMailTable mails={mails}/>
                {/* CHARTS */}
                <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
                    {/* chart */}
                    {/* chart */}
                </div>
            </main>
        </div>
    );
};
