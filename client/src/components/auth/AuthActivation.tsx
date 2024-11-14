import { useState } from "react";
import IconLoader2 from "../../icons/IconLoader2";
import AuthInput from "./AuthInput";
import useAxios from "../../hooks/useAxios";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/auth.store";
import { IAuth } from "../../types/types";

const AuthActivation = () => {
    const axios = useAxios();
    const navigate = useNavigate();
    const { auth, setAuth } = useAuthStore((state) => ({
        auth: state.auth,
        setAuth: state.setAuth,
    }));

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState("");

    const handleActivate = async () => {
        setError("");
        setIsLoading(true);

        if (!auth) return;

        try {
            const response = await axios.patch("/users/activate", { code });

            if (response.status === 200) {
                navigate("/find");
                setAuth({
                    ...auth,
                    user: {
                        ...auth.user,
                        activation: {
                            ...auth.user.activation,
                            activated: true,
                        },
                    },
                } as IAuth);
            }
        } catch (err: any) {
            setError(err.response.data.error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="p-4 max-w-[340px] bg-white rounded shadow-lg flex flex-col justify-center items-center gap-6">
            <h2 className="font-bold text-2xl xs:text-xl uppercase">
                Activate Your Account
            </h2>

            <p>
                An activation code has been sent to your email address. You have
                x minutes and x attempts to activate your account.
            </p>

            <AuthInput
                type="text"
                placeholder="Code"
                id="activationCode"
                value={code}
                setValue={setCode}
            />

            <p className="text-error-1 bg-error-2 py-2 px-2 w-full text-center rounded text-sm empty:hidden">
                {error}
            </p>

            <button
                disabled={isLoading}
                className="flex justify-center items-center uppercase font-bold rounded w-full h-[40px] disabled:opacity-50 disabled:pointer-events-none gradient-btn"
                onClick={handleActivate}
            >
                {isLoading ? (
                    <IconLoader2 className="text-xl animate-spin" />
                ) : (
                    "Activate"
                )}
            </button>
        </form>
    );
};

export default AuthActivation;
