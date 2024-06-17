import { Link } from "react-router-dom";
import IconBath from "../../icons/IconBath";
import IconBedOutline from "../../icons/IconBedOutline";
import { IProperty } from "../../types/types";
import { currencyFormatter } from "../../utils/utils";

interface IPropertyCard {
    property: IProperty;
}

const PropertyCard = ({ property }: IPropertyCard) => {
    return (
        <Link to={`/property/${property.id}`} className="w-full">
            <div className="bg-white w-full shadow-lg p-4 rounded-lg flex gap-4 transition hover:scale-[1.01]">
                <img
                    src={property.image}
                    alt="Property Image"
                    className="rounded-lg w-[260px] h-[180px]"
                />

                <div className="flex flex-col justify-between gap-1">
                    <p className="text-2xl font-bold">{property.title}</p>
                    <p>
                        {property.country}, {property.city}
                    </p>
                    <div className="flex gap-4">
                        <p>
                            {property.category[0].toUpperCase() +
                                property.category.substring(1)}
                        </p>
                        <p>|</p>
                        <div className="flex gap-3">
                            <p className="flex justify-center items-center gap-1">
                                {property.beds} <IconBedOutline />
                            </p>
                            <p className="flex justify-center items-center gap-1">
                                {property.baths} <IconBath />
                            </p>
                        </div>
                        <p>|</p>
                        <p>{property.area} sqft</p>
                    </div>
                    <p className="bg-theme-1/30 w-fit py-2 px-4 rounded-lg">
                        {currencyFormatter.format(property.price)} AED/year
                    </p>
                </div>
            </div>
        </Link>
    );
};

export default PropertyCard;
