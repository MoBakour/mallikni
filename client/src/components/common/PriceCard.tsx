import { IProperty } from "../../types/types";
import { currencyFormatter } from "../../utils/utils";

interface IPriceCard {
    property: IProperty;
}

const PriceCard = ({ property }: IPriceCard) => {
    return (
        <p className="bg-theme-1/30 w-fit py-2 px-4 rounded-lg">
            <span>{currencyFormatter(+property.price)}</span>{" "}
            <span className="text-sm">
                {property.currency}{" "}
                {property.mode === "rent" && "per " + property.frequency}
            </span>
        </p>
    );
};

export default PriceCard;
