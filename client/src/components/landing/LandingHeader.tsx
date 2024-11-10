import clsx from "clsx";
import { Link } from "react-router-dom";
import useAuthStore from "../../stores/auth.store";

interface ILandingHeaderProps {
    scrolled: boolean;
}

const LandingHeader = ({ scrolled }: ILandingHeaderProps) => {
    const authorized = useAuthStore((state) => state.authorized);

    const links = [
        ["About", "/about"],
        ["Contact", "/contact"],
        ["Properties", "/find"],
        ...(!authorized
            ? [
                  ["Login", "/login"],
                  ["Sign up", "/signup"],
              ]
            : []),
    ];

    return (
        <>
            <header
                className={clsx(
                    "fixed z-10 top-0 w-screen h-[80px] md:h-[120px]",
                    { "bg-theme-1 shadow-lg": scrolled }
                )}
            >
                <div
                    className={clsx("transition-all absolute", {
                        "left-4 md:left-1/2 top-4 translate-x-0 md:-translate-x-1/2":
                            scrolled,
                        "left-1/2 top-52 -translate-x-1/2": !scrolled,
                    })}
                >
                    <h1
                        className={clsx(
                            "font-bold tracking-widest transition",
                            {
                                "text-white text-5xl": scrolled,
                                "text-theme-1 text-8xl md:text-6xl": !scrolled,
                            }
                        )}
                    >
                        Mallikni
                    </h1>
                    <p
                        className={clsx(
                            "tracking-widest text-center transition absolute left-1/2 -translate-x-1/2 whitespace-nowrap md:text-sm",
                            {
                                "opacity-0 pointer-events-none": scrolled,
                                "opacity-100": !scrolled,
                            }
                        )}
                    >
                        Stop dreaming. Start finding
                    </p>
                </div>

                <nav
                    className={clsx("transition-all absolute top-[28px]", {
                        "right-7 md:right-1/2 md:top-[75px] translate-x-0 md:translate-x-1/2 text-white":
                            scrolled,
                        "right-1/2 translate-x-1/2 text-black": !scrolled,
                    })}
                >
                    <ul className="flex gap-4 text-lg sm:text-sm sm:gap-3">
                        {links.map(([title, url], index) => (
                            <li
                                key={index}
                                className="transition hover:opacity-70 whitespace-nowrap"
                            >
                                <Link to={url}>{title}</Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </header>
        </>
    );
};

export default LandingHeader;
