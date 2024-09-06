import {motion} from "framer-motion";
import { IStatCard } from "../../types";
export const StatCard=(card:IStatCard)=>{
    return (
        <motion.div
        className='overflow-x-auto bg-gray-800 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-700'
        >
            <div className="px-4 py-5 sm:p-6">
                <span className="flex items-center text-sm font-medium text-gray-400">
                    <card.icon size={20} className="mr-2" style={{ color: card.color}} />
                    {card.name}
                </span>
                <p className="mt-1 text-[1.4rem] md:text-3xl font-semibold text-gray-100">
                   {card.value} 
                </p>
            </div>
        </motion.div>
    );
}