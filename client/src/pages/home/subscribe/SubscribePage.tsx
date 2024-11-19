import { useState } from "react";
import { toast } from "react-hot-toast";
export const SubscribePage = () => {
    const [email, setEmail] = useState("");
    const [Api, setApi] = useState("");
    const handleSubscribe = async(e: React.FormEvent<HTMLFormElement>) => {
        const API_URL = import.meta.env.VITE_API_URL;
        e.preventDefault();
        if (Api === "" || email === "") {
            return;
        }
        try {
            const response = await fetch(`${API_URL}/subscriber/add-subscriber`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    apiKey: Api,
                    email: email,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.errorMessage || "An error occurred while subscribing.");
            }

            const data = await response.json();
            console.log(data);
            toast.success("Subscription successful!");
        } catch (error) {
            const errorMessage = (error as any).message || "An unexpected error occurred.";
            toast.error(`Error: ${errorMessage}`);
        }
    };
    return (
        <div className="p-10 flex flex-col justify-center items-center bg-gray-800">
            <h1 className="text-3xl inline-block text-indigo-800 w-[200px] font-bold text-center leading-loose border-b-4 border-indigo-800 mb-4">
                Subscribe
            </h1>
            <p className="w-[90%] md:w-3/5 text-sm md:text-lg text-center font-mono">
                Join our platform for powerful email management with SMTP IP
                rotation, user management, and rich text customization. Sign up
                today to optimize your email campaigns and engage your audience!
            </p>
            <form onSubmit={handleSubscribe} className="w-[80%] md:w-[30%]">
                <div className="my-2">
                    <input
                        id="api"
                        name="api"
                        type="text"
                        placeholder="Your API Key"
                        required
                        value={Api}
                        onChange={(e) => setApi(e.target.value)}
                        className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
                <div className="my-2 flex flex-col md:flex-row gap-1">
                    <input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email address"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        className="block w-full rounded-md border-0 p-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <input type="submit" value={"Subscribe"} className="p-1.5 rounded bg-indigo-700 font-semibold text-sm hover:bg-indigo-900 hover:underline mt-1 md:mt-0"/>
                </div>
            </form>
        </div>
    );
};
