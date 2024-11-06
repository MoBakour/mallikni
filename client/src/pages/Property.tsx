import { useEffect, useState } from "react";
import PropertyHeader from "../components/property/PropertyHeader";
import { IProperty } from "../types/types";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import { capitalize } from "../utils/utils";
import DetailsTab from "../components/property/DetailsTab";
import DescriptionTab from "../components/property/DescriptionTab";
import LocationTab from "../components/property/LocationTab";
import ContactTab from "../components/property/ContactTab";
import ImagesPopup from "../components/property/ImagesPopup";

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

    const [property, setProperty] = useState<IProperty>({
        id: "1",
        title: "2+1 Apartment for rent in Sharjah, Al-Majaz",
        images: [
            "https://t3.ftcdn.net/jpg/03/48/06/74/360_F_348067415_PmFzkSJzPMXwni4RhmnB2Zji3TmA0pUF.jpg",
            "https://img.freepik.com/free-photo/cozy-living-room-modern-apartment_181624-58445.jpg?semt=ais_hybrid",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfI8Es6rwcaDVPaE06YpPiamjGMC7qF675sQ&s",
        ],
        description: `Discover this modern 2+1 apartment located in the vibrant neighborhood of Majaz, Sharjah, offering a perfect blend of comfort and convenience. With a spacious layout of 1,300 square feet, this apartment is ideal for families and professionals.

Key Features:
Open Living Area: Enjoy a bright and airy living space with large windows, seamlessly connected to the dining area, perfect for entertaining.

Contemporary Kitchen: Fully equipped with sleek cabinetry, granite countertops, and stainless-steel appliances, including a refrigerator and stove.

Two Bedrooms: The master bedroom features an en-suite bathroom and built-in wardrobes, while the second bedroom is perfect for guests or children.

Study Room: A versatile additional room ideal for a home office or playroom.

Private Balcony: Enjoy scenic views from your own balcony, ideal for relaxation.

Building Amenities:
24/7 Security
Swimming Pool
Fully Equipped Gym
Children's Play Area
Dedicated Parking
Prime Location:
Located in Majaz, this apartment offers easy access to shopping malls, schools, and Al Majaz Waterfront, making it perfect for those seeking a lively community atmosphere.

Don't miss this opportunity! Contact us today to schedule a viewing of this fantastic apartment priced at 50,000 AED per year!`,
        owner: "MoBakour",
        contacts: {
            phones: ["+971-12-345-6789", "+90-123-456-7890"],
            emails: ["email@gmail.com", "real@estate.com"],
            links: [
                {
                    name: "Instagram",
                    url: "https://instagram.com",
                },
                {
                    name: "Facebook",
                    url: "https://facebook.com",
                },
            ],
        },
        mode: "rent",
        category: "residential",
        country: "ae",
        city: "sh",
        price: 50000,
        area: 160,
        age: 4,
        source: "owner",
        furnished: false,
        beds: 2,
        baths: 1,
        balcony: true,
        elevator: true,
        parking: true,
        security: false,
        latitude: 12.3456789,
        longitude: 98.7654321,
    });
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
        if (currentImage === null) return;

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

    return (
        <main className="w-[80%] m-auto">
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

            <div className="my-14">
                <header className="flex">
                    {tabs.map((tab) => (
                        <button
                            key={tab.title}
                            onClick={() => handleTab(tab.title)}
                            className={clsx(
                                "py-2 flex-1 rounded-t-lg outline-none font-bold uppercase transition",
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
