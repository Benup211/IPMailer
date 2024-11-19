import {
    Server,
    ServerCog,
    Mail,
    Webhook,
} from "lucide-react";
export const FeaturePage=()=>{
    return(
        <div className="flex flex-col items-center justify-start">
            <h2 className="my-4 text-2xl md:text-4xl text-indigo-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
                Features
            </h2>
            <div className="container px-6 flex flex-col flex-wrap md:flex-row justify-evenly items-center gap-2 p-10">
                <div className="my-1 w-[100%] md:w-[49%] flex flex-col justify-center items-center h-auto gap-2 bg-gray-950 p-10 hover:bg-gray-900">
                    <Server size={60} color="#8B5CF6" />
                    <h3 className="font-mono font-semibold text-sm">
                        Custom Smtp Server
                    </h3>
                    <p className="lg:w-[40%] text-xs md:text-sm font-mono text-center">
                        Custom SMTP servers enable email sending through
                        designated IPs, improving deliverability with IP
                        rotation.
                    </p>
                </div>
                <div className="my-1 w-[100%] md:w-[49%] flex flex-col justify-center items-center h-auto gap-2 bg-gray-950 p-10 hover:bg-gray-900">
                    <ServerCog size={60} color="#EC4899" />
                    <h3 className="font-mono font-semibold text-sm">
                        Custom Proxy Server
                    </h3>
                    <p className="lg:w-[40%] text-xs md:text-sm font-mono text-center">
                        Custom proxy servers route email traffic through
                        specific IP addresses, enhancing privacy and control
                        over email communications.
                    </p>
                </div>
                <div className="my-1 w-[100%] md:w-[49%] flex flex-col justify-center items-center h-auto gap-2 bg-gray-950 p-10 hover:bg-gray-900">
                    <Mail size={60} color="#10B981" />
                    <h3 className="font-mono font-semibold text-sm">
                        Rich Textfield Mail
                    </h3>
                    <p className="lg:w-[40%] text-xs md:text-sm font-mono text-center">
                        Rich text email allows users to create visually
                        appealing messages with formatted text, images, and
                        links for better engagement.
                    </p>
                </div>
                <div className="my-1 w-[100%] md:w-[49%] flex flex-col justify-center items-center h-auto gap-2 bg-gray-950 p-10 hover:bg-gray-900">
                    <Webhook size={60} color="#3B82F6" />
                    <h3 className="font-mono font-semibold text-sm">
                        Subscribering API'S
                    </h3>
                    <p className="lg:w-[40%] text-xs md:text-sm font-mono text-center">
                        Subscriber API allows organizations to easily add new
                        contacts to their subscriber list improving audience
                        management and email targeting.
                    </p>
                </div>
            </div>
            </div>
    );
}