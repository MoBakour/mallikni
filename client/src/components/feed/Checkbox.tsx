import clsx from "clsx";
import IconTick from "../../icons/IconTick";

interface ICheckbox {
    name: string;
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const Checkbox = ({ name, filters, setFilters }: ICheckbox) => {
    const handleCheck = () => {
        setFilters((prev: any) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    return (
        <div
            className="flex items-center gap-2 group cursor-pointer"
            onClick={handleCheck}
        >
            <div
                className={clsx(
                    "w-[24px] h-[24px] rounded flex justify-center items-center transition",
                    filters[name]
                        ? "bg-theme-1"
                        : "bg-white group-hover:bg-slate-200"
                )}
            >
                {filters[name] && <IconTick />}
            </div>
            <p>{name[0].toUpperCase() + name.substring(1)}</p>
        </div>
    );
};

export default Checkbox;
