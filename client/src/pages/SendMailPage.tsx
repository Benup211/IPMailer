import { FC, ReactElement } from "react";
import { Header } from "../components/common/header";
import {motion} from "framer-motion";
import { SendMailTable } from "../components/mails/sendMailTable";

export const SendMailPage: FC = (): ReactElement => {
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
                    {/* stat_card */}
                </motion.div>
                
                <SendMailTable mails={[]}/>
                {/* CHARTS */}
                <div className="grid grid-col-1 lg:grid-cols-2 gap-8">
                    {/* chart */}
                    {/* chart */}
                </div>
            </main>
        </div>
    );
};
