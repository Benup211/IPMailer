import {useState } from "react";
import Logo from "../../../assets/ipmailer-favicon-color.png";
import { Link } from "react-router-dom";
import { useAdminStore } from "../../../state/AdminState";
import { Loader, MoveLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
export const AdminLoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isLoading, loginAdmin } = useAdminStore();
    const navigate = useNavigate();
    const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await loginAdmin(username, password);
            navigate("/admin/");
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 z-10 overflow-y-auto">
                <div className="mb-10 inline-block">
                    <Link
                        to="/"
                        className="flex gap-1 justify-start md:container md:justify-center lg:w-[80%] items-center"
                    >
                        <MoveLeft className="w-4 h-4 text-indigo-600" />
                        <p className="text-sm text-indigo-600 font-semibold">
                            Return to site
                        </p>
                    </Link>
                </div>
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
                        Sign in to Admin account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSignInSubmit} className="space-y-6">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    disabled={isLoading}
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-white-900"
                                >
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
                                {isLoading ? (
                                    <Loader className="w-6 h-6 animate-spin  mx-auto" />
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};