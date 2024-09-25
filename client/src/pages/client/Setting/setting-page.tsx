import { Header } from "../../../components/common/header";
import { AuthState } from "../../../state/AuthState";
import {ClientProfile} from "../../../components/setting/client-profile";
import {ClientApi} from "../../../components/setting/client-api";
import {DeleteClient} from "../../../components/setting/delete-client";
import {Example} from "../../../components/setting/client-change-passowrd";

export const SettingPage = () => {
    const { user } = AuthState();
    return (
        <div className="flex-1 overflow-auto relative z-10">
            <Header title="Settings" />

            <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
                <ClientProfile user={user} />
                <ClientApi user={user} />
                <Example/>
                <DeleteClient />
            </main>
        </div>
    );
};
