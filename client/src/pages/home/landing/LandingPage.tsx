import Logo from "../../../assets/ipmailer-favicon-color.png";
import { Link } from "react-router-dom";
import homeimg from "../../../assets/home.svg";
import { ArrowRight } from "lucide-react";
export const LandingPage=()=>{
    return(
        <div className="min-h-screen flex flex-col">
                <div className="w-full mx-auto p-6">
                    <div className="w-full flex items-center justify-between">
                        <Link
                            to="/"
                            className="flex justify-center items-center"
                        >
                            <img
                                alt="IPMailer"
                                src={Logo}
                                className="mx-auto h-12 w-12 md:h-12 md:w-12"
                            />
                            <h1 className="my-4 text-xl text-white font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
                                IPMailer
                            </h1>
                        </Link>
                        <div className="flex items-center space-x-4">
                            <Link
                                to="/user/signin"
                                className="text-white-900 font-semibold hover:border-indigo-500 hover:border-b-2"
                            >
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="container px-6 flex flex-col md:flex-row justify-center h-full items-center gap-2">
                    <div className="flex flex-col w-full md:w-2/5 justify-center items-center md:items-start lg:items-start overflow-y-hidden order-last md:order-first">
                        <h1 className="my-4 text-3xl md:text-3xl text-indigo-800 font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
                            Welcome to IPMailer
                        </h1>
                        <p className="leading-normal text-base md:text-xl lg:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
                            Your solution for managing email communications
                            through SMTP IP rotation. Enhance deliverability and
                            track engagement effortlessly.
                        </p>
                        <Link
                            to="/user/signin"
                            className="rounded-3xl p-5 bg-indigo-700 font-semibold max-w-[200px] hover:bg-indigo-900 hover:text-indigo-200"
                        >
                            <p className="flex">
                                Get Started
                                <ArrowRight className=" inline-block p-[2px]" />
                            </p>
                        </Link>
                    </div>
                    <div className="w-full md:w-3/5">
                        <img src={homeimg} alt="homepage image" />
                    </div>
                </div>
            </div>
    );
}