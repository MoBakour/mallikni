import useAxios from "../../hooks/useAxios";
import useAuthStore from "../../stores/auth.store";

interface ICriticalSettings {
    setLoading: (loading: boolean) => void;
    setShowConfirmation: (show: boolean) => void;
    setConfirmationError: (error: string) => void;
    setAction: (action: (confirmationPassword: string) => void) => void;
    resetConfirmation: () => void;
}

const CriticalSettings = ({
    setLoading,
    setShowConfirmation,
    setConfirmationError,
    setAction,
    resetConfirmation,
}: ICriticalSettings) => {
    const axios = useAxios();
    const setAuth = useAuthStore((state) => state.setAuth);

    const handleDeleteProperties = async (confirmationPassword: string) => {
        setLoading(true);

        try {
            const response = await axios.delete("/properties/all", {
                data: { confirmationPassword },
            });

            if (response.status === 200) {
                resetConfirmation();
            }
        } catch (err: any) {
            console.error(err);
            setConfirmationError(err.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = async (confirmationPassword: string) => {
        setLoading(true);

        try {
            const response = await axios.delete("/users/delete", {
                data: { confirmationPassword },
            });

            if (response.status === 200) {
                setAuth(null);
                resetConfirmation();
                window.location.href = "/";
            }
        } catch (err: any) {
            console.error(err);
            setConfirmationError(err.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCriticalButton = (type: "properties" | "account") => {
        setShowConfirmation(true);
        setAction(() =>
            type === "properties" ? handleDeleteProperties : handleDeleteAccount
        );
    };

    return (
        <section>
            <h2 className="font-bold text-3xl mb-12">Critical Settings</h2>

            <div className="px-10 flex flex-col gap-10">
                {/* delete all posts */}
                <div>
                    <p className="font-bold text-xl mb-4">
                        Delete All Properties
                    </p>
                    <div className="flex gap-10">
                        <p>
                            Delete all your posted properties along with all
                            associated media. This action is permanent and
                            cannot be undone.
                        </p>

                        <button
                            title="Delete Properties"
                            className="bg-error-1 text-white font-bold w-[160px] h-[40px] rounded-lg flex justify-center items-center shrink-0 transition hover:bg-error-1/80"
                            onClick={() => handleCriticalButton("properties")}
                        >
                            Delete Properties
                        </button>
                    </div>
                </div>

                {/* delete account */}
                <div>
                    <p className="font-bold text-xl mb-4">Delete Account</p>
                    <div className="flex gap-10">
                        <p>
                            By deleting your account, all your properties and
                            data will be permanently deleted. This action is
                            irreversible.
                        </p>

                        <button
                            title="Delete Account"
                            className="bg-error-1 text-white font-bold w-[160px] h-[40px] rounded-lg flex justify-center items-center shrink-0 transition hover:bg-error-1/80"
                            onClick={() => handleCriticalButton("account")}
                        >
                            Delete Account
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CriticalSettings;
