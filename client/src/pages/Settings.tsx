import CriticalSettings from "../components/settings/CriticalSettings";
import GeneralSettings from "../components/settings/GeneralSettings";

const Settings = () => {
    return (
        <main className="w-[80%] m-auto mt-20 flex flex-col gap-10">
            <GeneralSettings />
            <CriticalSettings />
        </main>
    );
};

export default Settings;
