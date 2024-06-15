import clsx from "clsx";
import IconBxChevronDown from "../../icons/IconBxChevronDown";
import IconTick from "../../icons/IconTick";
import { toggleItem } from "../../utils";

interface ICountFilter {
    name: string;
    counts: string[];
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
    show: boolean;
    setShow: (name: string) => void;
}

const CountFilter = ({
    name,
    counts,
    filters,
    setFilters,
    show,
    setShow,
}: ICountFilter) => {
    const handleShow = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!e.currentTarget.classList.contains("filter-dropdown")) {
            setShow(name);
        }
    };

    return (
        <div
            className="click-target px-4 bg-theme-2 hover:bg-slate-200 rounded-full h-[40px] relative flex justify-center items-center gap-3 cursor-default transition"
            onClick={(e) => handleShow(e)}
        >
            {name[0].toUpperCase() + name.substring(1)}:{" "}
            {filters[name].join(", ")}
            <IconBxChevronDown className="text-lg" />
            {show && (
                <div
                    className="filter-dropdown absolute -bottom-1 left-0 translate-y-full bg-theme-2 p-3 rounded-lg shadow flex flex-wrap gap-2 w-[300px]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {counts.map((option) => (
                        <button
                            key={option}
                            className={clsx(
                                "border py-1 px-4 rounded-full flex justify-center items-center gap-2 outline-none",
                                {
                                    "border-theme-1 bg-theme-1/20":
                                        filters[name].includes(option),
                                }
                            )}
                            onClick={() =>
                                setFilters((prev: any) => ({
                                    ...prev,
                                    [name]: toggleItem(
                                        prev[name],
                                        option,
                                        true
                                    ),
                                }))
                            }
                        >
                            {filters[name].includes(option) && (
                                <IconTick className="text-sm" />
                            )}
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CountFilter;
