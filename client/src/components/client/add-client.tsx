import { FC, ReactElement, useState } from "react";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useClientStore } from "../../state/ClientState";
import { useAdminStore } from "../../state/AdminState";

export const AddClient: FC = (): ReactElement => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [organizationName, setOrganizationName] = useState("");
    const { isCreatingClient, addClient } = useClientStore();
    const {increaseStat}=useAdminStore();
    const navigate = useNavigate();
    const handleSignUpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await addClient(
                email,
                password,
                confirmPassword,
                organizationName
            );
            increaseStat("clients");
            navigate('/admin/clients');
            console.log(email, password, confirmPassword, organizationName);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="flex flex-1 flex-col justify-start px-6 lg:px-8 z-10">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white-900">
                        Add Client
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
                                    disabled={isCreatingClient}
                                    placeholder="Client Email address"
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
                                    disabled={isCreatingClient}
                                    placeholder="Client Organization name"
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
                                    disabled={isCreatingClient}
                                    placeholder="Password"
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
                                    disabled={isCreatingClient}
                                    placeholder="Confirm password"
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isCreatingClient ? (
                                    <Loader className="w-6 h-6 animate-spin  mx-auto" />
                                ) : (
                                    "Add Client"
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};
