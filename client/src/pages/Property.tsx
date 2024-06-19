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
            "https://t3.ftcdn.net/jpg/03/48/06/74/360_F_348067415_PmFzkSJzPMXwni4RhmnB2Zji3TmA0pUF.jpg",
            "https://t3.ftcdn.net/jpg/03/48/06/74/360_F_348067415_PmFzkSJzPMXwni4RhmnB2Zji3TmA0pUF.jpg",
        ],
        description: "2+1 apartment in almajaz for rent in alsharjah, UAE",
        owner: "MoBakour",
        contacts: {
            phone: ["+971-12-345-6789", "+90-123-456-7890"],
            email: ["email@gmail.com", "real@estate.com"],
            instagram: "mo.bakour",
        },
        mode: "rent",
        category: "residential",
        country: "ae",
        city: "sh",
        price: 50000,
        area: 160,
        age: 4,
        source: "",
        furnished: false,
        beds: 2,
        baths: 1,
        balcony: true,
        lift: true,
        parking: true,
        security: false,
    });
    const [currentTab, setCurrentTab] = useState<string | null>(
        new URLSearchParams(location.search).get("tab")
    );

    const handleTab = (newTab: string) => {
        const params = new URLSearchParams(location.search);
        params.set("tab", newTab);
        setCurrentTab(newTab);
        navigate({ search: params.toString() });
    };

    useEffect(() => {
        if (!currentTab) handleTab("details");
    }, []);

    return (
        <main className="w-[80%] m-auto">
            <PropertyHeader property={property} />

            <div className="mt-14">
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
