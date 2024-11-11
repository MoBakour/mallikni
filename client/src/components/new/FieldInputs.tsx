import CheckboxInput from "./CheckboxInput";
import NumberInput from "./NumberInput";
import RadioInput from "./RadioInput";
import SelectInput from "./SelectInput";

import LocationsData from "../../assets/countries.json";
import { ICountry } from "../../types/types";
import clsx from "clsx";

interface IFieldInputs {
    form: any;
    setField: (field: string, value: any) => void;
    titleError: string | null;
    descError: string | null;
    cityError: string | null;
    setCityError: React.Dispatch<React.SetStateAction<string | null>>;
    priceError: string | null;
    areaError: string | null;
    freqError: string | null;
    currencyError: string | null;
}

const FieldInputs = ({
    form,
    setField,
    titleError,
    descError,
    cityError,
    setCityError,
    priceError,
    areaError,
    freqError,
    currencyError,
}: IFieldInputs) => {
    return (
        <section className="flex flex-col gap-8 w-[400px]">
            <label htmlFor="title">
                <p className="pb-1 font-medium text-xl">Title</p>
                <input
                    type="text"
                    placeholder="Property title"
                    id="title"
                    className="py-1 px-3 rounded-md w-full"
                    value={form.title}
                    onChange={(e) => setField("title", e.target.value)}
                />
                <p className="text-sm text-error-1 mt-1 empty:mt-0">
                    {titleError}
                </p>
            </label>

            <label htmlFor="description">
                <p className="pb-1 font-medium text-xl">Description</p>
                <textarea
                    rows={4}
                    placeholder="Property description"
                    id="description"
                    className="py-1 px-3 rounded-md w-full"
                    value={form.description}
                    onChange={(e) => setField("description", e.target.value)}
                />
                <p className="text-sm text-error-1 mt-1 empty:mt-0">
                    {descError}
                </p>
            </label>

            <RadioInput
                options={[
                    { label: "For rent", title: "rent" },
                    { label: "For sale", title: "sale" },
                ]}
                selection={form.mode}
                setSelection={(value) => {
                    setField("mode", value);
                    if (value === "sale") {
                        setField("frequency", "");
                    }
                }}
            />

            <RadioInput
                options={[
                    { label: "Residential", title: "residential" },
                    { label: "Commercial", title: "commercial" },
                ]}
                selection={form.category}
                setSelection={(value) => setField("category", value)}
            />

            <div className="flex justify-between">
                <SelectInput
                    title="country"
                    value={form.country}
                    setValue={(value) => setField("country", value)}
                >
                    {LocationsData.map((country: ICountry) => (
                        <option
                            key={country.code2.toLowerCase().trim()}
                            value={country.code2.toLowerCase().trim()}
                        >
                            {country.name}
                        </option>
                    ))}
                </SelectInput>

                <SelectInput
                    title="city"
                    value={form.city}
                    setValue={(value) => setField("city", value)}
                    error={cityError}
                    setError={setCityError}
                >
                    <>
                        <option value="">--Select City--</option>
                        {LocationsData.find(
                            (item) =>
                                item.code2.toLowerCase().trim() ===
                                form.country.toLowerCase().trim()
                        )?.states.map((state) => (
                            <option
                                key={state.code.toLowerCase().trim()}
                                value={state.code.toLowerCase().trim()}
                            >
                                {state.name}
                            </option>
                        ))}
                    </>
                </SelectInput>
            </div>

            <div className="flex justify-between">
                <label htmlFor="price" className="flex-[0.45]">
                    <p className="pb-1 font-medium text-xl">Price</p>
                    <input
                        type="number"
                        placeholder="Property price"
                        id="price"
                        className="py-1 px-3 rounded-md w-full"
                        value={form.price}
                        onChange={(e) => setField("price", e.target.value)}
                    />
                    <p className="text-sm text-error-1 mt-1 empty:mt-0">
                        {priceError}
                    </p>
                </label>

                <label htmlFor="area" className="flex-[0.45]">
                    <p className="pb-1 font-medium text-xl flex items-center gap-2">
                        <span>Area</span>
                        <span className="text-sm text-gray-500">(sqft)</span>
                    </p>
                    <input
                        type="number"
                        placeholder="Property area"
                        id="area"
                        className="py-1 px-3 rounded-md w-full"
                        value={form.area}
                        onChange={(e) => setField("area", e.target.value)}
                    />
                    <p className="text-sm text-error-1 mt-1 empty:mt-0">
                        {areaError}
                    </p>
                </label>
            </div>

            <div className="flex justify-between">
                <label
                    htmlFor="price"
                    className={clsx("flex-[0.45]", {
                        "opacity-50 pointer-events-none": form.mode !== "rent",
                    })}
                >
                    <SelectInput
                        title="Pay Cycle"
                        value={form.frequency}
                        setValue={(value) => setField("frequency", value)}
                    >
                        <option value="">--Select Pay Cycle--</option>
                        <option value="year">Yearly</option>
                        <option value="month">Monthly</option>
                        <option value="week">Weekly</option>
                    </SelectInput>
                    <p className="text-sm text-error-1 mt-1 empty:mt-0">
                        {freqError}
                    </p>
                </label>

                <label htmlFor="area" className="flex-[0.45]">
                    <p className="pb-1 font-medium text-xl flex items-center gap-2">
                        Currency
                    </p>
                    <input
                        type="text"
                        placeholder="Price currency"
                        id="area"
                        className="py-1 px-3 rounded-md w-full"
                        value={form.currency}
                        onChange={(e) => setField("currency", e.target.value)}
                    />
                    <p className="text-sm text-error-1 mt-1 empty:mt-0">
                        {currencyError}
                    </p>
                </label>
            </div>

            <div className="flex justify-between">
                <NumberInput
                    title="Beds"
                    value={form.beds}
                    setValue={(value) => setField("beds", value)}
                />
                <NumberInput
                    title="Baths"
                    value={form.baths}
                    setValue={(value) => setField("baths", value)}
                />
                <NumberInput
                    title="Age"
                    value={form.age}
                    setValue={(value) => setField("age", value)}
                />
            </div>

            <div className="flex flex-wrap gap-y-6 gap-x-24 justify-center">
                <CheckboxInput
                    title="Furnished"
                    checked={form.furnished}
                    setChecked={(value: any) => setField("furnished", value)}
                />
                <CheckboxInput
                    title="Balcony"
                    checked={form.balcony}
                    setChecked={(value: any) => setField("balcony", value)}
                />
                <CheckboxInput
                    title="Elevator"
                    checked={form.elevator}
                    setChecked={(value: any) => setField("elevator", value)}
                />
                <CheckboxInput
                    title="Parking"
                    checked={form.parking}
                    setChecked={(value: any) => setField("parking", value)}
                />
                <CheckboxInput
                    title="Security"
                    checked={form.security}
                    setChecked={(value: any) => setField("security", value)}
                />
            </div>
        </section>
    );
};

export default FieldInputs;
