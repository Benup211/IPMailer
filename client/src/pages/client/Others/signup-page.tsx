import { FC, ReactElement, useState } from "react";
import Logo from "../../../assets/ipmailer-favicon-color.png";
import { Link } from "react-router-dom";
import { AuthState } from "../../../state/AuthState";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const SignUpPage: FC = (): ReactElement => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const { isLoading, registerUser } = AuthState();
    const navigate=useNavigate();
    const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(email, password, confirmPassword, organizationName);
            await registerUser(
                email,
                password,
                confirmPassword,
                organizationName
            );
            navigate('/user/login');
        } catch (err) {
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
                    <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-white-900">IPMailer</h1>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
                        Sign up for your account
                    </h2>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form onSubmit={handleSignUpSubmit} className="space-y-6">
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
                                    disabled={isLoading}
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="organization_name"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Organization name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="organization_name"
                                    name="organization_name"
                                    type="text"
                                    required
                                    value={organizationName}
                                    onChange={(e) =>
                                        setOrganizationName(e.target.value)
                                    }
                                    disabled={isLoading}
                                    placeholder="Your organization name"
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Password
                            </label>
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
                            <label
                                htmlFor="confirm_password"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Confirm password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirm_password"
                                    name="confirm_password"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
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
                                    "Sign up"
                                )}
                            </button>
                        </div>
                    </form>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account ?{" "}
                        <Link
                            to="/user/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};
