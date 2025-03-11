import { Link, NavLink, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/auth.store";
import IconBurger from "../../icons/IconBurger";
import useCommonStore from "../../stores/common.store";

const Header = () => {
    const auth = useAuthStore((state) => state.auth);
    const location = useLocation();
    const setShowSideMenu = useCommonStore((state) => state.setShowSideMenu);

    const links = [
        ["About", "/about"],
        ["Post Property", "/new"],
        ["Properties", "/find"],
        ["Contact", "/contact"],
    ];

    return (
        <header className="p-3 flex justify-between">
            <Link to="/" className="flex-[1]">
                <h1 className="tracking-widest font-bold text-3xl">
                    <span className="text-theme-1">M</span>allikni
                </h1>
            </Link>

            <nav className="flex justify-center items-center flex-[2] sm:hidden">
                <ul className="flex gap-5 text-base">
                    {links
                        .filter((link) => link[1] !== location.pathname)
                        .map(([title, url], index) => (
                            <li
                                key={index}
                                className="transition hover:opacity-70 whitespace-nowrap text-sm"
                            >
                                <NavLink to={url}>{title}</NavLink>
                            </li>
                        ))}
                </ul>
            </nav>

            <div className="flex justify-end items-center gap-2 flex-[1] sm:hidden">
                {auth ? (
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
                        <IconBurger
                            className="text-3xl transition hover:text-black/70 cursor-pointer shrink-0"
                            onClick={() => setShowSideMenu(true)}
                        />
                    </>
                ) : (
                    <ul className="flex gap-4 text-lg sm:text-sm sm:gap-3">
                        <li className="transition hover:opacity-70 whitespace-nowrap p-1">
                            <Link to="/login">Login</Link>
                        </li>
                        <li className="hover:opacity-70 whitespace-nowrap p-1 px-2 rounded gradient-btn">
                            <Link to="/signup">Sign up</Link>
                        </li>
                    </ul>
                )}
            </div>

            <div className="hidden sm:block">
                <IconBurger
                    className="text-4xl transition hover:text-black/70 cursor-pointer"
                    onClick={() => setShowSideMenu(true)}
                />
            </div>
        </header>
    );
};

export default Header;
