import LocationsData from "../assets/countries.json";
import { useState } from "react";
import IconEmptyHeart from "../icons/IconEmptyHeart";
import PriceCard from "../components/common/PriceCard";

const Property = () => {
    const [property, setProperty] = useState({
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
        price: "50000",
        area: "160",
        propertyAge: "4",
        source: "",
        furnished: false,
        beds: "2",
        baths: "1",
        balcony: true,
        lift: true,
        parking: true,
        security: false,
    });

    return (
        <main className="w-[80%] m-auto">
            <header className="flex justify-between mt-20">
                <div className="flex gap-[20px] flex-[4]">
                    <img
                        src={property.images[0]}
                        alt="Property Image"
                        className="w-[300px] h-[200px] rounded-lg transition hover:scale-[1.03]"
                    />

                    <div className="flex flex-col justify-between">
                        {property.images.slice(1, 3).map((img) => (
                            <img
                                src={img}
                                alt="Property Image"
                                className="w-[120px] h-[90px] rounded transition hover:scale-[1.05]"
                            />
                        ))}
                    </div>
                </div>

                <div className="flex-[3] flex flex-col justify-between">
                    <p className="font-bold text-2xl">{property.title}</p>

                    <div>
                        <p>
                            {
                                LocationsData.find(
                                    (item) =>
                                        item.code2.toLowerCase() ===
                                        property.country
                                )?.name
                            }
                        </p>
                        <p>
                            {
                                LocationsData.find(
                                    (item) =>
                                        item.code2.toLowerCase() ===
                                        property.country
                                )?.states.find(
                                    (state) =>
                                        state.code.toLowerCase() ===
                                        property.city
                                )?.name
                            }
                        </p>
                    </div>

                    <PriceCard price={property.price} />
                </div>

                <div className="flex-1 flex flex-col justify-evenly items-center">
                    {/* add to favorites */}
                    <button
                        className="text-4xl w-[50px] h-[50px] flex justify-center items-center rounded-full transition hover:bg-gray-200"
                        title="Add to favorites"
                    >
                        {<IconEmptyHeart />}
                    </button>
                </div>
            </header>

            <div>
                {/* TODO */}
                <header>{/* tab selection */}</header>

                <div>{/* tab content */}</div>
            </div>
        </main>
    );
};

export default Property;
