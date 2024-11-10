import { IProperty } from "../../types/types";
import LocationsData from "../../assets/countries.json";
import IconEmptyHeart from "../../icons/IconEmptyHeart";
import PriceCard from "../common/PriceCard";
import IconDelete from "../../icons/IconDelete";
import IconEdit from "../../icons/IconEdit";
import useAuthStore from "../../stores/auth.store";

interface IPropertyHeader {
    property: IProperty;
    setCurrentImage: (image: number) => void;
}

const PropertyHeader = ({ property, setCurrentImage }: IPropertyHeader) => {
    const auth = useAuthStore((state) => state.auth);

    return (
        <header className="flex justify-between mt-20 gap-4">
            {property.images.length > 0 && (
                <div className="flex gap-4">
                    <img
                        src={`${
                            import.meta.env.VITE_API_URL
                        }/properties/image/${property.images[0]}`}
                        alt="Property Image"
                        className="w-[300px] h-[200px] rounded-lg transition hover:scale-[1.03] cursor-pointer"
                        onClick={() => setCurrentImage(0)}
                    />

                    {property.images.length > 1 && (
                        <div className="flex flex-col justify-between">
                            <img
                                src={`${
                                    import.meta.env.VITE_API_URL
                                }/properties/image/${property.images[1]}`}
                                alt="Property Image"
                                className="w-[120px] h-[90px] rounded transition hover:scale-[1.05] cursor-pointer"
                                onClick={() => setCurrentImage(1)}
                            />

                            {property.images.length > 2 && (
                                <div
                                    className="relative w-[120px] h-[90px] rounded overflow-hidden transition hover:scale-[1.05] cursor-pointer"
                                    onClick={() => setCurrentImage(2)}
                                >
                                    <img
                                        src={`${
                                            import.meta.env.VITE_API_URL
                                        }/properties/image/${
                                            property.images[2]
                                        }`}
                                        alt="Property Image"
                                        className="w-full h-full"
                                    />

                                    {property.images.length > 3 && (
                                        <div className="bg-black/50 w-full h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-xl flex justify-center items-center">
                                            <p>
                                                + {property.images.length - 2}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            <div className="flex-[1] flex flex-col justify-between">
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

            <div className="flex flex-col gap-2 justify-center items-center">
                {/* add to favorites */}
                <button
                    className="text-3xl w-[50px] h-[50px] flex justify-center items-center rounded-full transition hover:bg-gray-200"
                    title="Add to favorites"
                >
                    {<IconEmptyHeart />}
                </button>

                {auth?.user && auth.user._id === property.owner._id && (
                    <>
                        {/* edit */}
                        <button
                            className="text-2xl w-[50px] h-[50px] flex justify-center items-center rounded-full transition hover:bg-gray-200"
                            title="Edit Property"
                        >
                            {<IconEdit />}
                        </button>

                        {/* delete */}
                        <button
                            className="text-3xl w-[50px] h-[50px] flex justify-center items-center rounded-full transition hover:bg-gray-200"
                            title="Delete Property"
                        >
                            {<IconDelete />}
                        </button>
                    </>
                )}
            </div>
        </header>
    );
};

export default PropertyHeader;
