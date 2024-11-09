import { Link } from "react-router-dom";
import IconBath from "../../icons/IconBath";
import IconBedOutline from "../../icons/IconBedOutline";
import { IProperty } from "../../types/types";
import PriceCard from "../common/PriceCard";
import clsx from "clsx";

interface IPropertyCard {
    property: IProperty;
    details?: boolean;
}

const PropertyCard = ({ property, details = true }: IPropertyCard) => {
    return (
        <Link to={`/property/${property.id}`} className="w-full">
            <div
                className={clsx(
                    "bg-white w-full shadow-lg flex p-4 rounded-lg transition hover:scale-[1.01]",
                    { "flex-col": !details },
                    details ? "gap-4" : "gap-2"
                )}
            >
                <img
                    src={property.images[0]}
                    alt="Property Image"
                    className={clsx(
                        details
                            ? "rounded-lg w-[260px] h-[180px]"
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
                            details ? "text-2xl" : "text-lg"
                        )}
                    >
                        {property.title}
                    </p>
                    <p className={clsx({ "text-sm": !details })}>
                        {property.country}, {property.city}
                    </p>

                    <div className="flex gap-4">
                        {details && (
                            <>
                                <p>
                                    {property.category[0].toUpperCase() +
                                        property.category.substring(1)}
                                </p>
                                <p>|</p>
                            </>
                        )}

                        <div className="flex gap-3">
                            <p className="flex justify-center items-center gap-1">
                                {property.beds} <IconBedOutline />
                            </p>
                            <p className="flex justify-center items-center gap-1">
                                {property.baths} <IconBath />
                            </p>
                        </div>

                        {details && (
                            <>
                                <p>|</p>
                                <p>{property.area} sqft</p>
                            </>
                        )}
                    </div>

                    <PriceCard price={property.price} />
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
