import { useEffect, useState } from "react";
import useAuthStore from "../../stores/auth.store";
import useAxios from "../../hooks/useAxios";
import { IAuth } from "../../types/types";

interface IGeneralSettings {
    setLoading: (loading: boolean) => void;
    setShowConfirmation: (show: boolean) => void;
    setConfirmationError: (error: string) => void;
    setAction: (action: (confirmationPassword: string) => void) => void;
    resetConfirmation: () => void;
}

const GeneralSettings = ({
    setLoading,
    setShowConfirmation,
    setConfirmationError,
    setAction,
    resetConfirmation,
}: IGeneralSettings) => {
    const axios = useAxios();
    const { auth, setAuth } = useAuthStore((state) => ({
        auth: state.auth,
        setAuth: state.setAuth,
    }));

    const [newUsername, setNewUsername] = useState<string>(
        auth?.user.username || ""
    );
    const [newEmail, setNewEmail] = useState<string>(auth?.user.email || "");
    const [newPassword, setNewPassword] = useState<string>("");
    const [allowSubmit, setAllowSubmit] = useState<boolean>(false);

    const [avatar, setAvatar] = useState<File | string>(
        auth?.user.avatar || ""
    );

    const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;
        setAvatar(e.target.files[0]);
    };

    const saveAction = async (confirmationPassword: string) => {
        setLoading(true);

        const formData = new FormData();

        if (typeof avatar !== "string") {
            const fileName = `${crypto.randomUUID()}.${avatar.name
                .split(".")
                .pop()}`;
            const avatarFile = new File([avatar], fileName, {
                type: avatar.type,
            });

            formData.append("avatar", avatarFile);
        }

        formData.append("username", newUsername);
        formData.append("email", newEmail);
        formData.append("password", newPassword);
        formData.append("confirmationPassword", confirmationPassword);

        try {
            const response = await axios.put("/users/update", formData);

            if (response.status === 200) {
                setAuth({ ...auth, user: response.data.user } as IAuth);
                resetConfirmation();
                location.reload();
            }
        } catch (err: any) {
            console.error(err);
            setConfirmationError(err.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = () => {
        setShowConfirmation(true);
        setAction(() => saveAction);
    };

    useEffect(() => {
        setAllowSubmit(
            newUsername !== auth?.user.username ||
                newEmail !== auth?.user.email ||
                newPassword !== "" ||
                avatar !== auth?.user.avatar
        );
    }, [newUsername, newEmail, newPassword, avatar]);

    if (!auth) {
        return <p>You are not logged in</p>;
    }

    return (
        <section>
            <h2 className="font-bold text-3xl mb-12">Profile Settings</h2>

            <div className="flex justify-evenly items-start sm:flex-col sm:items-center gap-6">
                {/* avatar selector */}
                <div className="flex flex-col justify-center items-center gap-3 w-fit">
                    <img
                        src={
                            avatar
                                ? typeof avatar === "string"
                                    ? `${
                                          import.meta.env.VITE_API_URL
                                      }/users/avatar/${avatar}`
                                    : URL.createObjectURL(avatar)
                                : "/images/default-avatar.png"
                        }
                        alt="Profile Picture"
                        className="w-[160px] h-[160px] object-cover rounded-full"
                    />

                    <label
                        htmlFor="avatar"
                        className="w-[200px] block py-2 text-center bg-theme-2/80 rounded-lg transition hover:bg-theme-2/100 cursor-pointer"
                        title="Change Profile Picture"
                    >
                        Change Profile Picture
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        id="avatar"
                        onChange={handleAddImage}
                        multiple={false}
                    />
                </div>

                {/* profile details */}
                <div className="flex flex-col items-end gap-3 w-[300px] xs:w-full">
                    <div className="flex flex-col w-full">
                        <label htmlFor="username" className="font-bold">
                            Username
                        </label>
                        <input
                            className="shadow rounded border-none outline-none py-2 px-3 w-full"
                            id="username"
                            type="text"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder="New Username"
                        />
                        <p className="text-error-1 text-sm"></p>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="email" className="font-bold">
                            Email
                        </label>
                        <input
                            className="shadow rounded border-none outline-none py-2 px-3 w-full"
                            id="email"
                            type="text"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="New Email"
                        />
                        <p className="text-error-1 text-sm"></p>
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="password" className="font-bold">
                            Password
                        </label>
                        <input
                            className="shadow rounded border-none outline-none py-2 px-3 w-full"
                            id="password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New Password"
                        />
                        <p className="text-error-1 text-sm"></p>
                    </div>

                    <button
                        title="Save Profile Changes"
                        className="bg-theme-1 text-white font-bold py-2 px-3 rounded-md mt-8 gradient-btn disabled:pointer-events-none disabled:opacity-50"
                        disabled={!allowSubmit}
                        onClick={handleSave}
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </section>
    );
};

export default GeneralSettings;
