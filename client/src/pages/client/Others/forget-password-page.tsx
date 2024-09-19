import { FC, ReactElement, useState } from "react";
import Logo from "../../../assets/ipmailer-favicon-color.png";
import { Link } from "react-router-dom";

export const ForgetPasswordPage:FC=():ReactElement=>{
    const [email, setEmail] = useState("");
    const handleForgetPasswordSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(email);
        alert("Forget Password");
        setEmail("");
        return;
    }
    return(
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 z-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        alt="IPMailer"
                        src={Logo}
                        className="mx-auto h-16 w-16 md:h-20 md:w-20"
                    />
                    <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-white-900">IPMailer</h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
                        Forget password?
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleForgetPasswordSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Reset Password
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Remember your password?{" "}
                        <Link
                            to="/user/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}