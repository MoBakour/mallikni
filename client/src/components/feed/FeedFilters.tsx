import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import clsx from "clsx";
import LocationsData from "../../assets/countries.json";
import ToggleFilter from "./ToggleFilter";
import RangeFilter from "./RangeFilter";
import SelectFilter from "./SelectFilter";
import CountFilter from "./CountFilter";
import { isChildOf } from "../../utils/utils";
import OptionsFilter from "./OptionsFilter";
import IconTick from "../../icons/IconTick";
import { ICountry, IFilters, IProperty } from "../../types/types";
import useAxios from "../../hooks/useAxios";

interface IFeedFilters {
    setData: React.Dispatch<React.SetStateAction<IProperty[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface DropdownsState {
    beds: boolean;
    baths: boolean;
    options: boolean;
}

const defaultFilters: IFilters = {
    mode: "rent",
    category: "residential",
    country: "",
    city: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    minAge: "",
    maxAge: "",
    beds: [],
    baths: [],
    furnished: false,
    balcony: false,
    elevator: false,
    parking: false,
    security: false,
    frequency: "",
};

const FeedFilters = ({ setData, setLoading }: IFeedFilters) => {
    const location = useLocation();
    const navigate = useNavigate();
    const axios = useAxios();

    const [filters, setFilters] = useState<IFilters>(defaultFilters);

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

    const handleSearch = () => {
        const params = new URLSearchParams();

        for (const key in filters) {
            const value = filters[key as keyof IFilters];

            if (Array.isArray(value) && value.length > 0) {
                params.set(key, value.join(","));
            } else if (typeof value === "boolean" && value) {
                params.set(key, value.toString());
            } else if (
                typeof value === "string" &&
                value &&
                !value.includes("--Select")
            ) {
                params.set(key, value);
            }
        }

        navigate({ search: params.toString() }, { replace: true });
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        const newFilters: IFilters = {
            mode: params.get("mode") || defaultFilters.mode,
            category: params.get("category") || defaultFilters.category,
            country: params.get("country") || defaultFilters.country,
            city: params.get("city") || defaultFilters.city,
            minPrice: params.get("minPrice") || defaultFilters.minPrice,
            maxPrice: params.get("maxPrice") || defaultFilters.maxPrice,
            minArea: params.get("minArea") || defaultFilters.minArea,
            maxArea: params.get("maxArea") || defaultFilters.maxArea,
            minAge: params.get("minAge") || defaultFilters.minAge,
            maxAge: params.get("maxAge") || defaultFilters.maxAge,

            beds: params.get("beds")
                ? params.get("beds")!.split(",")
                : defaultFilters.beds,
            baths: params.get("baths")
                ? params.get("baths")!.split(",")
                : defaultFilters.baths,
            furnished:
                params.get("furnished") === "true" || defaultFilters.furnished,
            balcony: params.get("balcony") === "true" || defaultFilters.balcony,
            elevator:
                params.get("elevator") === "true" || defaultFilters.elevator,
            parking: params.get("parking") === "true" || defaultFilters.parking,
            security:
                params.get("security") === "true" || defaultFilters.security,
            frequency: params.get("frequency") || defaultFilters.frequency,
        };

        setFilters(newFilters);

        (async () => {
            try {
                const response = await axios.get(
                    `/properties/search/${location.search}`
                );

                if (response.status === 200) {
                    setData(response.data.properties);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, [location.search]);

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
            <div className="flex flex-wrap gap-y-4 gap-x-6 sm:gap-x-3 sm:gap-y-3">
                <ToggleFilter
                    value1={{ text: "rent", value: "rent" }}
                    value2={{ text: "buy", value: "sale" }}
                    filterName="mode"
                    filters={filters}
                    setFilters={setFilters}
                />

                <ToggleFilter
                    value1={{ text: "residential", value: "residential" }}
                    value2={{ text: "commercial", value: "commercial" }}
                    filterName="category"
                    filters={filters}
                    setFilters={setFilters}
                />

                <SelectFilter
                    filterName="country"
                    filters={filters}
                    setFilters={setFilters}
                >
                    <option value="">--Select Country--</option>
                    {LocationsData.map((country: ICountry) => (
                        <option
                            key={country.code2.toLowerCase().trim()}
                            value={country.code2.toLowerCase().trim()}
                        >
                            {country.name}
                        </option>
                    ))}
                </SelectFilter>

                <SelectFilter
                    filterName="city"
                    filters={filters}
                    setFilters={setFilters}
                >
                    <option value="">--Select City--</option>
                    {LocationsData.find(
                        (item) =>
                            item.code2.toLowerCase().trim() ===
                            filters.country.toLowerCase().trim()
                    )?.states.map((state) => (
                        <option
                            key={state.code.toLowerCase().trim()}
                            value={state.code.toLowerCase().trim()}
                        >
                            {state.name}
                        </option>
                    ))}
                </SelectFilter>

                <RangeFilter
                    name="Price"
                    desc=""
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
                    filterName="age"
                    filters={filters}
                    setFilters={setFilters}
                />

                <button
                    onClick={() =>
                        setFilters((prev) => ({
                            ...prev,
                            furnished: !prev.furnished,
                        }))
                    }
                    className={clsx(
                        filters.furnished ? "bg-theme-1" : "bg-theme-2",
                        "sm:text-sm sm:px-2 sm:h-[30px] h-[40px] px-4 rounded-full cursor-pointer transition flex justify-center items-center gap-2"
                    )}
                >
                    {filters.furnished && <IconTick />}
                    Furnished
                </button>

                <CountFilter
                    name="beds"
                    counts={["studio", "1", "2", "3", "4", "5", "6", "7+"]}
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

                {filters.mode === "rent" && (
                    <SelectFilter
                        filterName="frequency"
                        filters={filters}
                        setFilters={setFilters}
                    >
                        <option value="">--Select Pay Cycle--</option>
                        <option value="year">Yearly</option>
                        <option value="month">Monthly</option>
                        <option value="week">Weekly</option>
                    </SelectFilter>
                )}
            </div>

            <div className="w-full h-[2px] bg-slate-200 rounded-full" />

            <button
                className="rounded-lg text-xl sm:text-base w-fit outline-none bg-theme-1 py-3 px-8 sm:py-2 sm:px-4 font-bold text-white transition hover:bg-theme-hover"
                onClick={handleSearch}
            >
                Search
            </button>
        </div>
    );
};

export default FeedFilters;
