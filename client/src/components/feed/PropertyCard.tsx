import { Link } from "react-router-dom";
import IconBath from "../../icons/IconBath";
import IconBedOutline from "../../icons/IconBedOutline";
import { IProperty } from "../../types/types";
import PriceCard from "../common/PriceCard";
import clsx from "clsx";
import { getCityName, getCountryName } from "../../utils/utils";

interface IPropertyCard {
    property: IProperty;
    details?: boolean;
    className?: string;
}

const PropertyCard = ({
    property,
    details = true,
    className = "",
}: IPropertyCard) => {
    return (
        <Link to={`/property/${property._id}`}>
            <div
                className={clsx(
                    "bg-white w-full shadow-lg flex p-4 rounded-lg transition hover:scale-[1.01]",
                    { "flex-col": !details },
                    details ? "gap-4" : "gap-2",
                    className
                )}
            >
                <img
                    src={
                        property.images.length > 0
                            ? `${
                                  import.meta.env.VITE_API_URL
                              }/properties/image/${property.images[0]}`
                            : "/images/placeholder.jpeg"
                    }
                    alt="Property Image"
                    className={clsx(
                        "object-cover",
                        details
                            ? "rounded-lg w-[260px] h-[180px] sm:w-1/3 sm:h-auto"
                            : "rounded-lg w-full"
                    )}
                />

                <div
                    className={clsx(
                        "flex flex-col justify-between",
                        details ? "gap-1" : "gap-2"
                    )}
                >
                    <p
                        className={clsx(
                            "font-bold",
                            details
                                ? "text-2xl sm:text-lg xs:text-base"
                                : "text-lg"
                        )}
                    >
                        {property.title}
                    </p>
                    <p className={clsx(details ? "sm:text-sm" : "text-sm")}>
                        {getCountryName(property.country)},{" "}
                        {getCityName(property.country, property.city)}
                    </p>

                    <div className="flex xs:flex-col xs:gap-1 gap-4 xl:text-sm xl:gap-3 sm:text-xs sm:gap-2">
                        {details && (
                            <>
                                <p>
                                    {property.category[0].toUpperCase() +
                                        property.category.substring(1)}
                                </p>
                                <p className="xs:hidden">|</p>
                            </>
                        )}

                        <div className="flex gap-3 sm:gap-2">
                            <p className="flex justify-center items-center gap-1">
                                {property.beds} <IconBedOutline />
                            </p>
                            <p className="flex justify-center items-center gap-1">
                                {property.baths} <IconBath />
                            </p>
                        </div>

                        {details && (
                            <>
                                <p className="xs:hidden">|</p>
                                <p>{property.area} sqft</p>
                            </>
                        )}
                    </div>

                    <PriceCard property={property} />
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
