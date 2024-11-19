import logoImg from "../../../assets/ipmailer-favicon-color.png";
import { Linkedin, Github, Facebook } from "lucide-react";
import { Link } from "react-router-dom";
export const FooterPage = () => {
    return (
        <div className="w-full bg-gray-950 flex flex-col justify-center items-center">
            <div className="container flex min-h-32 justify-center items-center">
                <div className="w-[65%] md:w-[49%] flex justify-center items-start flex-col">
                    <div className="flex justify-center items-center">
                        <img src={logoImg} alt="logo" className="h-12 w-12" />
                        <p className="text-indigo-700 font-semibold">
                            IPMailer
                        </p>
                    </div>
                    <h2 className="font-mono text-xs my-1">
                        Optimized email communication platform
                    </h2>
                </div>
                <div className=" w-[20%] md:w-[49%] flex items-center gap-5 md:gap-10 justify-center">
                    <Link to="https://www.linkedin.com/in/benup211/">
                        <Linkedin size={25} />
                    </Link>
                    <Link to="http://github.com/Benup211">
                        <Github size={25} />
                    </Link>
                    <Link to="https://www.facebook.com/Benup211">
                        <Facebook size={25} />
                    </Link>
                </div>
            </div>
            <div className="bg-black w-full">
                <p className="font-mono font-semibold text-sm text-center p-2">&copy; Benup Ghimire  2024. All rights reserved.</p>
            </div>
        </div>
    );
};
