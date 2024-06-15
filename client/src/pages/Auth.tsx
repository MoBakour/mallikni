import { Link } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import AuthActivation from "../components/auth/AuthActivation";

interface IAuthProps {
    page: "login" | "signup";
}

const Auth = ({ page }: IAuthProps) => {
    return (
        <div className=" bg-slate-100 flex justify-evenly items-center sm:flex-col w-full min-h-screen relative overflow-hidden">
            <img
                src="./images/blob-2.svg"
                alt="Blob image"
                className="absolute opacity-20 -right-1/3 w-[1300px] lg:w-[1000px] sm:w-[600px] sm:bottom-0 max-w-none"
            />

            <Link to="/" className="z-10">
                <aside>
                    <h1 className="tracking-widest font-bold text-5xl">
                        <span className="text-theme-1">M</span>allikni
                    </h1>
                    <p className="text-sm tracking-widest">
                        Stop dreaming. Start finding
                    </p>
                </aside>
            </Link>

            <div className="z-10">
                {/* <AuthForm page={page} /> */}
                <AuthActivation />
            </div>
        </div>
    );
};

export default Auth;
