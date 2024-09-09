import {FC,ReactElement} from 'react';
import { Header } from '../components/common/header';
import {motion} from 'framer-motion';
import {  User,Server,ServerCog,Send,SquarePen } from 'lucide-react';
import { StatCard } from '../components/common/statcard';
import { AuthState } from '../state/AuthState';
export const OverviewPage: FC = (): ReactElement => {
    const {stat}=AuthState();
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Overview" />
            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <motion.div
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <StatCard name='Subscribers' icon={User} value={`${stat.subscribers}`} color='#23aefc'/>
                    <StatCard name='Smtp Servers' icon={Server} value={`${stat.smtps}`} color='#8B5CF6'/>
                    <StatCard name='Proxy Server' icon={ServerCog} value={`${stat.proxys}`} color='#EC4899'/>
                    <StatCard name='Send Mail' icon={Send} value={`${stat.mails}`} color='#10B981'/>
                    <StatCard name='Draft' icon={SquarePen} value={`${stat.drafts}`} color='#3B82F6'/>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* chart goes here */}
                </div>
            </main>
        </div>
    );
};