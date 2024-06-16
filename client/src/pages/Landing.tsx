import { useEffect, useState } from "react";

// components
import LandingHeader from "../components/landing/LandingHeader";
import LandingSection from "../components/landing/LandingSection";
import LandingFooter from "../components/landing/LandingFooter";
import Footer from "../components/common/Footer";

const sectionData = [
    {
        reverse: false,
        title: "Find your next property",
        phrases: ["Apartments", "Villas", "Offices", "And more..."],
        image: "./building-1.png",
        imageAlt: "Property image",
    },
    {
        reverse: true,
        title: "Choose between the best",
        phrases: [
            "Customize your search",
            "Explore your options",
            "Save your favorites",
        ],
        image: "./living-room-1.png",
        imageAlt: "Living room image",
    },
    {
        reverse: false,
        title: "Be among the best",
        phrases: [
            "Conduct business",
            "Advertise your properties",
            "Join the real estate market",
        ],
        image: "./business-1.png",
        imageAlt: "Business man image",
    },
];

const Landing = () => {
    const [scrolled, setScrolled] = useState<boolean>(window.scrollY > 0);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            setScrolled(window.scrollY > 100);
        });
    }, []);

    return (
        <div className="overflow-x-hidden">
            {/* landing bg */}
            <div className="bg-[url('./images/city-bg.png')] w-screen h-screen bg-cover bg-center opacity-35"></div>

            <LandingHeader scrolled={scrolled} />

            {/* SVG wave */}
            <svg
                id="wave"
                viewBox="0 0 1440 310"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                className={`bg-slate-100 transition-all -mt-8`}
            >
                <defs>
                    <linearGradient
                        id="sw-gradient-0"
                        x1="0"
                        x2="0"
                        y1="1"
                        y2="0"
                    >
                        <stop
                            stopColor="rgba(252, 208, 44, 1)"
                            offset="0%"
                        ></stop>
                        <stop
                            stopColor="rgba(255, 243.309, 199.732, 1)"
                            offset="100%"
                        ></stop>
                    </linearGradient>
                </defs>
                <path
                    fill="url(#sw-gradient-0)"
                    d="M0,248L60,211.8C120,176,240,103,360,98.2C480,93,600,155,720,160.2C840,165,960,114,1080,124C1200,134,1320,207,1440,201.5C1560,196,1680,114,1800,98.2C1920,83,2040,134,2160,155C2280,176,2400,165,2520,175.7C2640,186,2760,217,2880,211.8C3000,207,3120,165,3240,139.5C3360,114,3480,103,3600,108.5C3720,114,3840,134,3960,155C4080,176,4200,196,4320,196.3C4440,196,4560,176,4680,170.5C4800,165,4920,176,5040,160.2C5160,145,5280,103,5400,113.7C5520,124,5640,186,5760,211.8C5880,238,6000,227,6120,222.2C6240,217,6360,217,6480,211.8C6600,207,6720,196,6840,170.5C6960,145,7080,103,7200,82.7C7320,62,7440,62,7560,98.2C7680,134,7800,207,7920,242.8C8040,279,8160,279,8280,253.2C8400,227,8520,176,8580,149.8L8640,124L8640,310L8580,310C8520,310,8400,310,8280,310C8160,310,8040,310,7920,310C7800,310,7680,310,7560,310C7440,310,7320,310,7200,310C7080,310,6960,310,6840,310C6720,310,6600,310,6480,310C6360,310,6240,310,6120,310C6000,310,5880,310,5760,310C5640,310,5520,310,5400,310C5280,310,5160,310,5040,310C4920,310,4800,310,4680,310C4560,310,4440,310,4320,310C4200,310,4080,310,3960,310C3840,310,3720,310,3600,310C3480,310,3360,310,3240,310C3120,310,3000,310,2880,310C2760,310,2640,310,2520,310C2400,310,2280,310,2160,310C2040,310,1920,310,1800,310C1680,310,1560,310,1440,310C1320,310,1200,310,1080,310C960,310,840,310,720,310C600,310,480,310,360,310C240,310,120,310,60,310L0,310Z"
                ></path>
            </svg>

            <div className="bg-theme-1 py-20 relative overflow-hidden">
                <img
                    src="./images/blob-2.svg"
                    alt="Blob image"
                    className="brightness-90 absolute top-0 -right-1/2 z-[0] w-[1200px] h-[1200px] max-w-none"
                />

                <div className="w-[80%] m-auto flex flex-col gap-40 relative">
                    {sectionData.map((section, index) => (
                        <LandingSection key={index} {...section} />
                    ))}
                </div>
            </div>

            {/* footers */}
            <LandingFooter />
            <Footer />
        </div>
    );
};

export default Landing;
