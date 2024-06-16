import { IProperty } from "../../types/types";
import { currencyFormatter } from "../../utils";

interface ISideCard {
    property: IProperty;
}

const SideCard = ({ property }: ISideCard) => {
    return (
        <a href={`/property/${property.id}`} className="w-full">
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
                    <p className="bg-theme-1/30 w-fit py-2 px-4 rounded-lg">
                        {currencyFormatter.format(property.price)} AED/year
                    </p>
                </div>
            </div>
        </a>
    );
};

export default SideCard;