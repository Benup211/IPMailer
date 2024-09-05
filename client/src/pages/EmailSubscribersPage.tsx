import {Header} from "../components/common/header";
import { SubscribersTable } from "../components/subscribers/subscribersTable";
import { motion } from "framer-motion";
import { useSubscriberStore } from "../state/SubscriberState";
import { useEffect } from "react";
export const EmailSubscribersPage = () => {
	const {isGettingSubscribers,getSubscribers,subscribers}=useSubscriberStore();
	useEffect(()=>{
		getSubscribers();
	},[]);
	if(isGettingSubscribers){
		return (
			<div className="flex-1 flex items-center justify-center">
				<div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
			</div>
		);
	}
    return (
		<div className='flex-1 overflow-auto relative z-10'>
			<Header title='Email Subscribers' />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					{/* stat_card */}
				</motion.div>

				<SubscribersTable subscribers={subscribers}/>

				{/* CHARTS */}
				<div className='grid grid-col-1 lg:grid-cols-2 gap-8'>
					{/* chart */}
                    {/* chart */}
				</div>
			</main>
		</div>
	);

}

