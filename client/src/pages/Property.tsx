import { useEffect, useState } from "react";
import PropertyHeader from "../components/property/PropertyHeader";
import { IProperty } from "../types/types";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import clsx from "clsx";
import { capitalize } from "../utils/utils";
import DetailsTab from "../components/property/DetailsTab";
import DescriptionTab from "../components/property/DescriptionTab";
import LocationTab from "../components/property/LocationTab";
import ContactTab from "../components/property/ContactTab";
import ImagesPopup from "../components/property/ImagesPopup";
import useAxios from "../hooks/useAxios";
import IconLoader2 from "../icons/IconLoader2";

const tabs = [
    {
        title: "details",
        element: DetailsTab,
    },
    {
        title: "description",
        element: DescriptionTab,
    },
    {
        title: "location",
        element: LocationTab,
    },
    {
        title: "contact",
        element: ContactTab,
    },
];

const Property = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams();
    const axios = useAxios();

    const [property, setProperty] = useState<IProperty | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentTab, setCurrentTab] = useState<string | null>(
        new URLSearchParams(location.search).get("tab")
    );
    const [currentImage, setCurrentImage] = useState<number | null>(null);

    const handleTab = (newTab: string) => {
        const params = new URLSearchParams(location.search);
        params.set("tab", newTab);
        setCurrentTab(newTab);
        navigate({ search: params.toString() }, { replace: true });
    };

    const handleImageNav = (direction: "prev" | "next") => {
        if (currentImage === null || !property) return;

        if (
            (currentImage === 0 && direction === "prev") ||
            (currentImage === property.images.length - 1 &&
                direction === "next")
        )
            return;

        setCurrentImage((prev) =>
            direction === "prev" ? prev! - 1 : prev! + 1
        );
    };

    const handleKeyImageNav = (e: KeyboardEvent) => {
        if (currentImage === null) return;
        if (e.key === "Escape") setCurrentImage(null);
        if (e.key === "ArrowRight") handleImageNav("next");
        if (e.key === "ArrowLeft") handleImageNav("prev");
    };

    useEffect(() => {
        if (!currentTab) handleTab("details");
        window.addEventListener("keydown", handleKeyImageNav);

        return () => {
            window.removeEventListener("keydown", handleKeyImageNav);
        };
    }, [currentTab, currentImage]);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`/properties/property/${id}`);
                setProperty(response.data.property);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (!property)
        return (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {loading ? (
                    <IconLoader2 className="animate-spin text-5xl" />
                ) : (
                    <div className="flex flex-col justify-center items-center">
                        <p className="text-2xl text-gray-400">
                            Property not found
                        </p>
                        <button
                            onClick={() => navigate(-1)}
                            className="text-blue-500"
                        >
                            Go back
                        </button>
                    </div>
                )}
            </div>
        );

    return (
        <main className="w-[80%] lg:w-[90%] m-auto pb-14">
            <PropertyHeader
                property={property}
                setCurrentImage={setCurrentImage}
            />

            {/* image popup */}
            <ImagesPopup
                images={property.images}
                handleImageNav={handleImageNav}
                currentImage={currentImage}
                setCurrentImage={setCurrentImage}
            />

            <div className="my-4 flex justify-center items-center gap-2 w-fit">
                <span>By</span>
                <img
                    src={
                        property.owner.avatar
                            ? `${import.meta.env.VITE_API_URL}/users/avatar/${
                                  property.owner.avatar
                              }`
                            : "/images/default-avatar.png"
                    }
                    className="w-[30px] h-[30px] object-cover rounded-full"
                />
                <span className="font-bold">{property.owner.username}</span>
            </div>

            <div>
                <header className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.title}
                            onClick={() => handleTab(tab.title)}
                            className={clsx(
                                "py-2 flex-1 rounded-t-lg outline-none font-bold uppercase transition sm:text-xs",
                                {
                                    "bg-white shadow": tab.title === currentTab,
                                }
                            )}
                        >
                            {capitalize(tab.title)}
                        </button>
                    ))}
                </header>

                <div className="bg-white p-5 rounded-b-lg shadow-lg">
                    {tabs
                        .find((tab) => tab.title === currentTab)
                        ?.element({ property })}
                </div>
            </div>
        </main>
    );
};

export default Property;
