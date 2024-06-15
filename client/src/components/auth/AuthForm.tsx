import { useState } from "react";
import AuthInput from "./AuthInput";
import { Link } from "react-router-dom";
import IconLoader2 from "../../icons/IconLoader2";

interface IAuthForm {
    page: "login" | "signup";
}

const AuthForm = ({ page }: IAuthForm) => {
    const [pwdMode, setPwdMode] = useState("password");

    const [credential, setCredential] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    return (
        <form className="p-4 bg-white rounded shadow-lg flex flex-col justify-center items-center gap-6">
            <h2 className="font-bold text-2xl uppercase">{page}</h2>

            {page === "signup" && (
                <AuthInput
                    placeholder="Email Address"
                    value={email}
                    setValue={setEmail}
                    type="email"
                    id="email"
                />
            )}

            {page === "signup" && (
                <AuthInput
                    placeholder="Username"
                    value={username}
                    setValue={setUsername}
                    type="text"
                    id="username"
                />
            )}

            {page === "login" && (
                <AuthInput
                    placeholder="Email or Username"
                    value={credential}
                    setValue={setCredential}
                    type="text"
                    id="credential"
                />
            )}

            <AuthInput
                placeholder="Password"
                value={password}
                setValue={setPassword}
                type={pwdMode}
                setPwdMode={setPwdMode}
                id="password"
            />

            {page === "signup" && (
                <AuthInput
                    placeholder="Confirm Password"
                    value={repassword}
                    setValue={setRepassword}
                    type={pwdMode}
                    id="repassword"
                />
            )}

            <p className="text-error-1 bg-error-2 py-2 w-full text-center rounded text-sm empty:p-0">
                {error}
            </p>

            <button
                disabled={isLoading}
                className="flex justify-center items-center uppercase font-bold rounded w-full h-[40px] disabled:opacity-50 disabled:pointer-events-none gradient-btn"
            >
                {isLoading ? (
                    <IconLoader2 className="text-xl animate-spin" />
                ) : (
                    <>{page}</>
                )}
            </button>

            {page.toLowerCase() === "login" ? (
                <p className="text-sm">
                    Don't have an account?{" "}
                    <Link
                        to="/signup"
                        className="underline transition hover:opacity-70"
                    >
                        Sign up now!
                    </Link>
                </p>
            ) : (
                <p className="text-sm">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="underline transition hover:opacity-70"
                    >
                        Login now!
                    </Link>
                </p>
            )}
        </form>
    );
};

export default AuthForm;
