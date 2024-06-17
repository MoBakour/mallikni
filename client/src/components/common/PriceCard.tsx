import { currencyFormatter } from "../../utils/utils";

interface IPriceCard {
    price: string | number;
}

const PriceCard = ({ price }: IPriceCard) => {
    return (
        <p className="bg-theme-1/30 w-fit py-2 px-4 rounded-lg">
            {currencyFormatter(+price)} AED/year
        </p>
    );
};

export default PriceCard;
