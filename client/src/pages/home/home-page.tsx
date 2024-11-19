import { FeaturePage } from "./feature/FeaturePage";
import { FooterPage } from "./footer/footerPage";
import { LandingPage } from "./landing/LandingPage";
import { SubscribePage } from "./subscribe/SubscribePage";

export const HomePage = () => {
    return (
        <div className="z-10 flex flex-col items-center justify-start w-screen overflow-y-auto">
            <LandingPage />
            <FeaturePage />
            <SubscribePage/>
            <FooterPage/>
        </div>
    );
};
