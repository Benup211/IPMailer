import {FC, ReactElement,useState} from 'react';
import Logo from "../../../assets/ipmailer-favicon-color.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import { TokenState } from '../../../state/TokenState';
export const ChangePasswordPage: FC = (): ReactElement => {
    const { changePasswordToken } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {isLoading,changePassword}=TokenState();
    const navigate=useNavigate();
    const handleChangePassword = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        try {
            e.preventDefault();
            await changePassword(password,confirmPassword,changePasswordToken);
            setPassword("");
            setConfirmPassword("");
            navigate('/user/login');
        } catch (err) {
            console.error(err);
        }
    };
    return(
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
                        Change Password
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        onSubmit={handleChangePassword}
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                New Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                htmlFor="confirmPassword"
                                className="block text-sm font-medium leading-6 text-white-900"
                            >
                                Confirm Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                                    "Change Password"
                                )}
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
    );
}