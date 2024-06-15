import { useEffect, useState } from "react";
import LocationsData from "../../assets/countries.json";
import ToggleFilter from "./ToggleFilter";
import RangeFilter from "./RangeFilter";
import SelectFilter from "./SelectFilter";
import clsx from "clsx";
import CountFilter from "./CountFilter";
import { isChildOf } from "../../utils";
import OptionsFilter from "./OptionsFilter";
import IconTick from "../../icons/IconTick";

interface IState {
    code: string;
    name: string;
    subdivision: string | null;
}

interface ICountry {
    code2: string;
    code3: string;
    name: string;
    capital: string;
    region: string;
    subregion: string;
    states: IState[];
}

const FeedFilters = () => {
    const [filters, setFilters] = useState({
        mode: "Rent",
        category: "Residential",
        country: "United Arab Emirates",
        city: "Ajman",
        minPrice: "",
        maxPrice: "",
        minArea: "",
        maxArea: "",
        minPropertyAge: "",
        maxPropertyAge: "",
        source: "",
        furnished: false,
        beds: [],
        baths: [],
        balcony: false,
        lift: false,
        parking: false,
        security: false,
    });

    interface DropdownsState {
        beds: boolean;
        baths: boolean;
        options: boolean;
    }

    const initialDropdownsState: DropdownsState = {
        beds: false,
        baths: false,
        options: false,
    };

    const [dropdowns, setDropdowns] = useState<DropdownsState>(
        initialDropdownsState
    );

    const setShow = (name: string) => {
        setDropdowns((prev) => ({
            ...initialDropdownsState,
            [name]: !prev[name as keyof DropdownsState],
        }));
    };

    useEffect(() => {
        window.addEventListener("click", (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            if (
                !target.classList.contains("click-target") &&
                !isChildOf(target, ".click-target")
            ) {
                setDropdowns(initialDropdownsState);
            }
        });
    }, []);

    return (
        <div className="w-full shadow-lg rounded-lg bg-white p-4 flex flex-col gap-6 mb-14">
            <div className="flex flex-wrap gap-y-4 gap-x-6">
                <ToggleFilter
                    text1="Rent"
                    text2="Buy"
                    filterName="mode"
                    filters={filters}
                    setFilters={setFilters}
                />

                <ToggleFilter
                    text1="Residential"
                    text2="Commercial"
                    filterName="category"
                    filters={filters}
                    setFilters={setFilters}
                />

                <SelectFilter
                    filterName="country"
                    filters={filters}
                    setFilters={setFilters}
                >
                    {LocationsData.map((country: ICountry) => (
                        <option key={country.code2}>{country.name}</option>
                    ))}
                </SelectFilter>

                <SelectFilter
                    filterName="city"
                    filters={filters}
                    setFilters={setFilters}
                >
                    <option>--Select City--</option>
                    {LocationsData.find(
                        (item) => item.name.trim() === filters.country.trim()
                    )?.states.map((state) => (
                        <option key={state.code}>{state.name}</option>
                    ))}
                </SelectFilter>

                <RangeFilter
                    name="Price"
                    desc="(AED)"
                    filterName="price"
                    filters={filters}
                    setFilters={setFilters}
                />

                <RangeFilter
                    name="Area"
                    desc="(sqft)"
                    filterName="area"
                    filters={filters}
                    setFilters={setFilters}
                />

                <RangeFilter
                    name="Property Age"
                    desc="(years)"
                    filterName="propertyAge"
                    filters={filters}
                    setFilters={setFilters}
                />

                <SelectFilter
                    filterName="source"
                    filters={filters}
                    setFilters={setFilters}
                >
                    <option>--Select Source--</option>
                    <option value="owner">From Owner</option>
                    <option value="office">From Office</option>
                    <option value="bank">From Bank</option>
                    <option value="constructor">From Constructor</option>
                </SelectFilter>

                <button
                    onClick={() =>
                        setFilters((prev) => ({
                            ...prev,
                            furnished: !prev.furnished,
                        }))
                    }
                    className={clsx(
                        filters.furnished ? "bg-theme-1" : "bg-theme-2",
                        "h-[40px] px-4 rounded-full cursor-pointer transition flex justify-center items-center gap-2"
                    )}
                >
                    {filters.furnished && <IconTick />}
                    Furnished
                </button>

                <CountFilter
                    name="beds"
                    counts={["Studio", "1", "2", "3", "4", "5", "6", "7+"]}
                    filters={filters}
                    setFilters={setFilters}
                    show={dropdowns.beds}
                    setShow={setShow}
                />

                <CountFilter
                    name="baths"
                    counts={["1", "2", "3", "4", "5+"]}
                    filters={filters}
                    setFilters={setFilters}
                    show={dropdowns.baths}
                    setShow={setShow}
                />

                <OptionsFilter
                    filters={filters}
                    setFilters={setFilters}
                    show={dropdowns.options}
                    setShow={setShow}
                />
            </div>

            <div className="w-full h-[2px] bg-slate-200 rounded-full" />

            <button className="rounded-lg text-xl w-fit outline-none bg-theme-1 py-3 px-8 font-bold text-white transition hover:bg-[rgb(242,193,32)]">
                Search
            </button>
        </div>
    );
};

export default FeedFilters;
