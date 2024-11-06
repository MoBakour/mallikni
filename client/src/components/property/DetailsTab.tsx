import { IProperty } from "../../types/types";
import { getCountryName, getCityName } from "../../utils/utils";

interface IDetailsTab {
    property: IProperty;
}

const DetailsTab = ({ property }: IDetailsTab) => {
    return (
        <section className="flex flex-wrap justify-evenly gap-x-12 gap-y-2 text-lg">
            {[
                {
                    label: "Country",
                    value: getCountryName(property.country),
                },
                {
                    label: "City",
                    value: getCityName(property.country, property.city),
                },
                {
                    label: "Status",
                    value: property.mode === "buy" ? "for sale" : "for rent",
                },
                {
                    label: "Price",
                    value: property.price.toLocaleString(),
                },
                { label: "Beds", value: property.beds },
                { label: "Baths", value: property.baths },
                { label: "Area", value: property.area + " sqft" },
                {
                    label: "Age",
                    value:
                        property.age.toString() +
                        (property.age > 1 ? " years" : " year"),
                },
                { label: "Source", value: property.source },
                {
                    label: "Furnished",
                    value: property.furnished ? "Yes" : "No",
                },
                {
                    label: "Parking",
                    value: property.parking ? "Yes" : "No",
                },
                {
                    label: "Balcony",
                    value: property.balcony ? "Yes" : "No",
                },
                { label: "Elevator", value: property.elevator ? "Yes" : "No" },
                { label: "", value: "" }, // keep it for layout
            ].map((item, index) => (
                <div key={index} className="w-[300px] flex justify-between">
                    <p className="font-bold">{item.label}</p>{" "}
                    <p>{item.value}</p>
                </div>
            ))}
        </section>
    );
};

export default DetailsTab;
