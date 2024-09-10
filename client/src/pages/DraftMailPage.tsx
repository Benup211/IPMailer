import {motion} from 'framer-motion';
import { Header } from '../components/common/header';
import { DraftMailTable } from '../components/mails/draftMailTable';
import { StatCard } from '../components/common/statcard';
import { Send, SquarePen,User} from 'lucide-react';
import { useMailStore } from '../state/MailState';
import {useEffect} from "react";
import { AuthState } from '../state/AuthState';
export const DraftMailPage = () => {
    const {draftMails,isGettingMails,getDraftMails}=useMailStore();
    const {stat}=AuthState();
    useEffect(()=>{
        getDraftMails();
    },[getDraftMails]);
    if(isGettingMails){
		return (
			<div className="flex-1 flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
	}
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Draft Mail" />

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
                <DraftMailTable mails={draftMails}/>
                {/* CHARTS */}
                <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
                    {/* chart */}
                    {/* chart */}
                </div>
            </main>
        </div>
    );   
}