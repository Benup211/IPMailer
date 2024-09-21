import { useState } from "react";
import { Switch } from "@headlessui/react";
import { useClientStore } from "../../state/ClientState";
export const SwitchComponent = ({
    enable,clientId
}: {
    enable: boolean;
    clientId: number | string;
}) => {
    const [enabled, setEnabled] = useState(enable);
    const {isblockOrUnblockClient,blockOrUnblockClient}=useClientStore();
    const toggleSwitch = async() => {
        try{
            await blockOrUnblockClient(clientId as number, !enabled);
            setEnabled(!enabled);
        }catch(err){
            console.log(err);
        }
    }
    return (
        <Switch
            checked={enabled}
            onChange={toggleSwitch}
            disabled={isblockOrUnblockClient}
            className="group relative flex h-6 w-12 cursor-pointer rounded-full bg-gray-700  p-1 transition-colors duration-200 ease-in-out focus:outline-none data-[focus]:outline-1 data-[focus]:outline-white data-[checked]:bg-red-700"
        >
            <span
                aria-hidden="true"
                className="pointer-events-none inline-block size-4 translate-x-0 rounded-full bg-white ring-0 shadow-lg transition duration-200 ease-in-out group-data-[checked]:translate-x-6"
            />
        </Switch>
    );
};
