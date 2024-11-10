import clsx from "clsx";
import IconTick from "../../icons/IconTick";

const CheckboxInput = ({ title, checked, setChecked }: any) => {
    return (
        <label
            className="flex items-center w-[140px] cursor-pointer"
            onClick={() => setChecked(!checked)}
        >
            <div
                className={clsx(
                    "w-6 h-6 rounded-md mr-2 flex justify-center items-center transition",
                    checked ? "bg-theme-1" : "bg-theme-2"
                )}
            >
                {checked && <IconTick />}
            </div>
            <p className="text-xl font-medium">{title}</p>
        </label>
    );
};

export default CheckboxInput;
