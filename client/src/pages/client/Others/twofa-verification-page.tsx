import { FC, ReactElement, useState } from "react";
import Logo from "../../../assets/ipmailer-favicon-color.png";
import { Link } from "react-router-dom";
import { AuthState } from "../../../state/AuthState";
import { TokenState } from "../../../state/TokenState";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
export const TwoFAVerificationPage: FC = (): ReactElement => {
    const [code, setCode] = useState("");
    const {setAuthentication,user}=AuthState();
    const {isLoading,verifyTwoFactor}=TokenState();
    const navigate=useNavigate();
    const handleTwoFAVerificationSubmit = async(
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        try{
            await verifyTwoFactor(code,user.id);
            setAuthentication(true);
            navigate('/user');
        }catch(err){
            console.log(err);
        }
        
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 z-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="IPMailer"
                        src={Logo}
                        className="mx-auto h-16 w-16 md:h-20 md:w-20"
                    />
                    <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
                        IPMailer
                    </h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
                        2FA Verification
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleTwoFAVerificationSubmit}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="2facode"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Enter 2FA Code Sent To Your Email Address:
                            </label>
                            <div className="mt-2">
                                <input
                                    id="2facode"
                                    name="2facode"
                                    type="text"
                                    placeholder="Enter 2FA code"
                                    required
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    disabled={isLoading}
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isLoading? <Loader className="w-6 h-6 animate-spin  mx-auto" />:"Verify"}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Go Back To Login Page?{" "}
                        <Link
                            to="/user/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};
