import { Link } from "react-router-dom";
import useCommonStore from "../../stores/common.store";
import Links from "./Links";
import clsx from "clsx";
import IconLogout from "../../icons/IconLogout";
import useAuthStore from "../../stores/auth.store";

const buttons = [
    {
        title: "Post Property",
        link: "/new",
    },
    {
        title: "My Properties",
        link: "/my-properties",
    },
    {
        title: "My Favorites",
        link: "/favorites",
    },
    {
        title: "Settings",
        link: "/settings",
    },
];

const SideMenu = () => {
    const { auth, setAuth } = useAuthStore((state) => ({
        auth: state.auth,
        setAuth: state.setAuth,
    }));

    const { showSideMenu, setShowSideMenu } = useCommonStore((state) => ({
        showSideMenu: state.showSideMenu,
        setShowSideMenu: state.setShowSideMenu,
    }));

    const handleHide = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setShowSideMenu(false);
        }
    };

    const handleLogout = () => {
        setShowSideMenu(false);
        setAuth(null);
    };

    return (
        <div
            className={clsx(
                "fixed left-0 top-0 z-10 bg-slate-800/80 backdrop-blur-sm w-screen h-dvh transition",
                showSideMenu ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={(e) => handleHide(e)}
        >
            <div
                className={clsx(
                    "absolute z-20 right-0 bg-theme-2 w-[300px] min-h-dvh transition",
                    showSideMenu ? "" : "translate-x-full"
                )}
                id="sideMenu"
            >
                {auth && (
                    <div className="flex justify-center items-center gap-2 py-4">
                        <>
                            <img
                                src={
                                    auth.user.avatar
                                        ? `${
                                              import.meta.env.VITE_API_URL
                                          }/users/avatar/${auth.user.avatar}`
                                        : "/images/default-avatar.png"
                                }
                                alt="User Avatar"
                                className="object-cover rounded-full w-8 h-8"
                            />
                            <p className="font-bold">{auth.user.username}</p>
                        </>
                    </div>
                )}
                <div className="flex flex-col">
                    {buttons.map((btn) => (
                        <Link
                            key={btn.title}
                            to={btn.link}
                            className="text-2xl text-center font-bold py-4 border-b-4 first:border-t-4 transition hover:opacity-70"
                            onClick={() => setShowSideMenu(false)}
                        >
                            {btn.title}
                        </Link>
                    ))}
                </div>
                {auth ? (
                    <button
                        title="Logout"
                        className="flex justify-center items-center gap-2 font-bold text-xl bg-error-1/80 text-white py-2 px-4 rounded-lg mx-auto mt-5 transition hover:bg-error-1/100"
                        onClick={() => {
                            handleLogout();
                            setShowSideMenu(false);
                        }}
                    >
                        <p>Logout</p>
                        <IconLogout />
                    </button>
                ) : (
                    <ul className="flex justify-center items-center gap-4 mt-3 text-lg">
                        <li className="transition hover:opacity-70 whitespace-nowrap p-1">
                            <Link
                                to="/login"
                                onClick={() => setShowSideMenu(false)}
                            >
                                Login
                            </Link>
                        </li>
                        <li className="hover:opacity-70 whitespace-nowrap p-1 px-2 rounded gradient-btn">
                            <Link
                                to="/signup"
                                onClick={() => setShowSideMenu(false)}
                            >
                                Sign up
                            </Link>
                        </li>
                    </ul>
                )}

                <Links
                    className="absolute bottom-0 pb-4"
                    onClick={() => setShowSideMenu(false)}
                />
            </div>
        </div>
    );
};

export default SideMenu;
