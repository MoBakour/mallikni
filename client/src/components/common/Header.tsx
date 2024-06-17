import { Link } from "react-router-dom";
import useAuthStore from "../../stores/auth.store";
import IconBurger from "../../icons/IconBurger";
import useCommonStore from "../../stores/common.store";

const Header = () => {
    const auth = useAuthStore((state) => state.auth);
    const setShowSideMenu = useCommonStore((state) => state.setShowSideMenu);

    return (
        <header className="p-3 flex justify-between">
            <Link to="/">
                <h1 className="tracking-widest font-bold text-3xl">
                    <span className="text-theme-1">M</span>allikni
                </h1>
            </Link>

            <nav className="flex justify-center items-center">
                <ul className="flex gap-4 text-lg sm:text-sm sm:gap-3">
                    {[
                        ["About", "/about"],
                        ["Post Property", "/new"],
                        ["Contact", "/contact"],
                    ].map(([title, url], index) => (
                        <li
                            key={index}
                            className="transition hover:opacity-70 whitespace-nowrap"
                        >
                            <Link to={url}>{title}</Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="flex justify-center items-center gap-2">
                {auth ? (
                    <>
                        <img
                            src="https://wallpapers-clan.com/wp-content/uploads/2022/08/default-pfp-7.jpg"
                            alt="User Avatar"
                            className="rounded-full w-10"
                        />
                        <p className="font-bold text-lg mr-6">MoBakour</p>
                        <IconBurger
                            className="text-4xl transition hover:text-black/70 cursor-pointer"
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
        </header>
    );
};

export default Header;
