import { useState } from "react";
import PropertyHeader from "../components/property/PropertyHeader";
import { IProperty } from "../types/types";

const Property = () => {
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

    return (
        <main className="w-[80%] m-auto">
            <PropertyHeader property={property} />

            <div>
                {/* TODO */}
                <header>{/* tab selection */}</header>

                <div>{/* tab content */}</div>
            </div>
        </main>
    );
};

export default Property;
