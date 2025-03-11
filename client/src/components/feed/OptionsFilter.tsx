import IconBxChevronDown from "../../icons/IconBxChevronDown";
import Checkbox from "./Checkbox";

interface IOptionsFilter {
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
    show: boolean;
    setShow: (name: string) => void;
}

const OptionsFilter = ({
    filters,
    setFilters,
    show,
    setShow,
}: IOptionsFilter) => {
    const handleShow = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!e.currentTarget.classList.contains("filter-dropdown")) {
            setShow("options");
        }
    };

    return (
        <div
            className="click-target px-4 sm:px-2 bg-theme-2 hover:bg-slate-200 rounded-full h-[40px] sm:h-[30px] sm:text-sm relative flex justify-center items-center gap-3 cursor-default transition"
            onClick={(e) => handleShow(e)}
        >
            Property Options <IconBxChevronDown className="text-lg" />
            {show && (
                <div
                    className="filter-dropdown absolute -bottom-1 left-0 translate-y-full bg-theme-2 p-3 rounded-lg shadow flex flex-wrap gap-3 flex-col"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Checkbox
                        name="balcony"
                        filters={filters}
                        setFilters={setFilters}
                    />

                    <Checkbox
                        name="elevator"
                        filters={filters}
                        setFilters={setFilters}
                    />

                    <Checkbox
                        name="parking"
                        filters={filters}
                        setFilters={setFilters}
                    />

                    <Checkbox
                        name="security"
                        filters={filters}
                        setFilters={setFilters}
                    />
                </div>
            )}
        </div>
    );
};

export default OptionsFilter;
