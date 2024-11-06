import { Link } from "react-router-dom";
import useCommonStore from "../../stores/common.store";
import Links from "./Links";
import clsx from "clsx";

const buttons = [
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
    const { showSideMenu, setShowSideMenu } = useCommonStore((state) => ({
        showSideMenu: state.showSideMenu,
        setShowSideMenu: state.setShowSideMenu,
    }));

    const handleHide = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).id !== "sideMenu") {
            setShowSideMenu(false);
        }
    };

    return (
        <div
            className={clsx(
                "fixed left-0 top-0 z-10 bg-slate-800/80 backdrop-blur-sm w-screen h-screen transition",
                showSideMenu ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
            onClick={(e) => handleHide(e)}
        >
            <div
                className={clsx(
                    "absolute z-20 right-0 bg-theme-2 w-[300px] min-h-screen transition",
                    showSideMenu ? "" : "translate-x-full"
                )}
                id="sideMenu"
            >
                <div className="flex flex-col py-2">
                    {buttons.map((btn) => (
                        <Link
                            key={btn.title}
                            to={btn.link}
                            className="text-2xl text-center font-bold py-4 border-b-4 transition hover:opacity-70"
                        >
                            {btn.title}
                        </Link>
                    ))}
                </div>

                <Links className="absolute bottom-0 pb-4" />
            </div>
        </div>
    );
};

export default SideMenu;
