interface ISelectFilter {
    filterName: string;
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
    children: React.ReactNode;
    defaultValue?: string;
}

const SelectFilter = ({
    filterName,
    filters,
    setFilters,
    children,
}: ISelectFilter) => {
    return (
        <select
            name=""
            id=""
            className="bg-theme-2 hover:bg-slate-200 transition rounded-full px-2 outline-none h-[40px]"
            value={filters[filterName]}
            onChange={(e) =>
                setFilters((prev: any) => {
                    return {
                        ...prev,
                        city:
                            filterName === "country" ? "--Select--" : prev.city,
                        [filterName]: e.target.value,
                    };
                })
            }
        >
            {children}
        </select>
    );
};

export default SelectFilter;
