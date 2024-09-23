import {FC,ReactElement} from 'react';
import { Header } from '../../../components/common/header';
import {motion} from 'framer-motion';
import { StatCard } from '../../../components/common/statcard';
import { Users } from 'lucide-react';
import { useAdminStore } from '../../../state/AdminState';
export const AdminOverviewPage: FC = (): ReactElement => {
    const {admin_stats}=useAdminStore();
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
                    <StatCard name='Clients' color='#F59E0B' icon={Users} value={`${admin_stats.clients}`}/>
                </motion.div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* chart goes here */}
                </div>
            </main>
        </div>
    );
};