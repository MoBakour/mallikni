import { Link } from "react-router-dom";
import { IProperty } from "../../types/types";
import PriceCard from "../common/PriceCard";

interface ISideCard {
    property: IProperty;
}

const SideCard = ({ property }: ISideCard) => {
    return (
        <Link to={`/property/${property.id}`} className="w-full">
            <div className="bg-white w-full shadow-lg p-4 rounded-lg flex flex-col gap-2 transition hover:scale-[1.01]">
                <img
                    src={property.image}
                    alt="Property Image"
                    className="rounded-lg w-full"
                />

                <div className="flex flex-col justify-between gap-2">
                    <p className="text-lg font-bold">{property.title}</p>
                    <p className="text-sm">
                        {property.country}, {property.city}
                    </p>
                    <PriceCard price={property.price} />
                </div>
            </div>
        </Link>
    );
};

export default SideCard;
