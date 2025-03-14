import { Link } from "react-router-dom";
import IconArrowRight from "../../icons/IconArrowRight";
import Blob1 from "../../assets/blob-1.svg";

const LandingFooter = () => {
    return (
        <div className="py-32 md:py-20 flex justify-around items-center relative overflow-hidden z-10 md:flex md:flex-col md:gap-4">
            <img
                src={Blob1}
                alt="Blob image"
                className="absolute opacity-25 z-[-1] w-[800px] h-[800px] max-w-none sm:w-[450px] sm:h-[450px]"
            />

            <div className="relative md:hidden">
                <div className="bg-theme-1 w-20 h-20 rounded-full drop-shadow-2xl"></div>
                <div className="bg-theme-1 w-16 h-16 rounded-full drop-shadow-2xl absolute -bottom-3 -right-2"></div>
            </div>

            <div>
                <h2 className="font-bold tracking-widest text-theme-1 text-4xl">
                    Mallikni
                </h2>
                <p className="text-sm pl-[0.1em]">
                    By{" "}
                    <a
                        href="https://linktr.ee/swordax"
                        target="_blank"
                        className="opacity-70 hover:opacity-100 transition"
                    >
                        MoBakour
                    </a>
                </p>
            </div>
            <Link
                to="/find"
                className="py-3 px-5 rounded font-bold text-lg text-white flex justify-center items-center gap-3 group gradient-btn"
            >
                <span>Find your dream place</span>
                <IconArrowRight className="text-2xl transition group-hover:translate-x-2" />
            </Link>
        </div>
    );
};

export default LandingFooter;
