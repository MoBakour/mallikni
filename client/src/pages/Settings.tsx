import { useState } from "react";
import CriticalSettings from "../components/settings/CriticalSettings";
import GeneralSettings from "../components/settings/GeneralSettings";
import IconLoader2 from "../icons/IconLoader2";

const Settings = () => {
    const [loading, setLoading] = useState(false);

    const [confirmationPassword, setConfirmationPassword] = useState("");
    const [confirmationError, setConfirmationError] = useState("");
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [action, setAction] = useState<any>(null);

    const resetConfirmation = () => {
        setConfirmationPassword("");
        setConfirmationError("");
        setShowConfirmation(false);
    };

    return (
        <main className="w-[80%] m-auto py-20 flex flex-col gap-14">
            <GeneralSettings
                setLoading={setLoading}
                setShowConfirmation={setShowConfirmation}
                setConfirmationError={setConfirmationError}
                setAction={setAction}
                resetConfirmation={resetConfirmation}
            />
            <CriticalSettings
                setLoading={setLoading}
                setShowConfirmation={setShowConfirmation}
                setConfirmationError={setConfirmationError}
                setAction={setAction}
                resetConfirmation={resetConfirmation}
            />

            {/* password and confirmation popup */}
            {showConfirmation && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <div className="bg-theme-2 p-8 rounded-md w-[400px]">
                        <h2 className="text-xl font-bold">Confirm Password</h2>
                        <p className="mt-2">Please confirm your password</p>

                        <input
                            type="password"
                            className="shadow rounded-md border-none outline-none py-2 px-3 w-full mt-4"
                            placeholder="Password"
                            value={confirmationPassword}
                            onChange={(e) =>
                                setConfirmationPassword(e.target.value)
                            }
                        />
                        <p className="text-error-1 text-sm mt-1">
                            {confirmationError}
                        </p>

                        <div className="mt-8 flex gap-2">
                            <button
                                title="Proceed"
                                className="bg-theme-1 text-white font-bold h-[40px] px-3 rounded-md transition hover:bg-theme-1/80"
                                onClick={() => action(confirmationPassword)}
                            >
                                Confirm
                            </button>
                            <button
                                title="Cancel"
                                className="h-[40px] px-3 rounded-md"
                                onClick={resetConfirmation}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* loading screen */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
                    <IconLoader2 className="text-7xl text-white animate-spin" />
                </div>
            )}
        </main>
    );
};

export default Settings;
