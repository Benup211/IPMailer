import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
} from "@headlessui/react";
import { ChevronDown, Loader } from "lucide-react";
import { FormEvent, useState } from "react";
import { AuthState } from "../../state/AuthState";

export const Example = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const {changePassword,isLoading}=AuthState();
    const handleChangePassword=async(e: FormEvent<HTMLFormElement>)=> {
        e.preventDefault();
        try{
            await changePassword(password,confirmPassword);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <div className="bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg rounded-xl p-6 border border-gray-700 mb-8">
            <Disclosure as="div" defaultOpen={false}>
                <DisclosureButton className="group flex w-full items-center justify-between">
                    <span className="text-xl font-semibold text-gray-100">
                        Change Password
                    </span>
                    <ChevronDown className="size-5 fill-white/60 group-data-[hover]:fill-white/50 group-data-[open]:rotate-180" />
                </DisclosureButton>
                <DisclosurePanel className="mt-4 text-sm/5 text-white/50 flex justify-center">
                    <form
                        onSubmit={handleChangePassword}
                        className="space-y-6 flex-1 max-w-lg"
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
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                    className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div className="flex justify-start">
                            <button
                                type="submit"
                                className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <Loader className="w-6 h-6 animate-spin  mx-auto" />
                                ) : (
                                    "Change Password"
                                )}
                            </button>
                        </div>
                    </form>
                </DisclosurePanel>
            </Disclosure>
        </div>
    );
};
