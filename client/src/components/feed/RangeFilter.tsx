/*
in range filter component
"name" prop should be identical to the filter property name
*/
interface IRangeFilter {
    name: string;
    desc?: string;
    filterName: string;
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const RangeFilter = ({
    name,
    desc,
    filterName,
    filters,
    setFilters,
}: IRangeFilter) => {
    return (
        <div className="bg-theme-2 w-fit p-1 pl-4 flex justify-center items-center gap-2 rounded-full relative h-[40px]">
            <p>
                {name} <span className="text-xs text-black/60">{desc}</span>
            </p>
            {["min", "max"].map((inp) => (
                <input
                    type="number"
                    className="outline-none w-[60px] text-sm rounded-full px-2 text-center"
                    key={inp}
                    placeholder={inp[0].toUpperCase() + inp.substring(1)}
                    value={
                        filters[
                            inp +
                                filterName[0].toUpperCase() +
                                filterName.substring(1)
                        ]
                    }
                    onChange={(e) => {
                        setFilters((prev: any) => {
                            return {
                                ...prev,
                                [inp +
                                filterName[0].toUpperCase() +
                                filterName.substring(1)]: e.target.value,
                            };
                        });
                    }}
                />
            ))}
        </div>
    );
};

export default RangeFilter;
