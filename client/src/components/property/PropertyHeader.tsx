import { IProperty } from "../../types/types";
import LocationsData from "../../assets/countries.json";
import IconEmptyHeart from "../../icons/IconEmptyHeart";
import PriceCard from "../common/PriceCard";

interface IPropertyHeader {
    property: IProperty;
    setCurrentImage: (image: number) => void;
}

const PropertyHeader = ({ property, setCurrentImage }: IPropertyHeader) => {
    return (
        <header className="flex justify-between mt-20">
            <div className="flex gap-[20px] flex-[4]">
                <img
                    src={property.images[0]}
                    alt="Property Image"
                    className="w-[300px] h-[200px] rounded-lg transition hover:scale-[1.03]"
                    onClick={() => setCurrentImage(0)}
                />

                <div className="flex flex-col justify-between">
                    {property.images.slice(1).map((img, index) => (
                        <img
                            key={index}
                            src={img}
                            alt="Property Image"
                            className="w-[120px] h-[90px] rounded transition hover:scale-[1.05]"
                            onClick={() => setCurrentImage(index + 1)}
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
                                    state.code.toLowerCase() === property.city
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
    );
};

export default PropertyHeader;
