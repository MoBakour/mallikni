import { capitalize } from "../../utils/utils";

interface ISelectInput {
    title: string;
    value: string;
    setValue: (value: string) => void;
    error?: string | null;
    setError?: (error: string | null) => void;
    children: any;
}

const SelectInput = ({
    title,
    value,
    setValue,
    error,
    setError,
    children,
}: ISelectInput) => {
    return (
        <label htmlFor={title} className="flex-[0.45]">
            <p className="pb-1 font-medium text-xl">{capitalize(title)}</p>
            <select
                id={title}
                className="bg-theme-2 hover:bg-slate-200 transition rounded-full px-2 outline-none h-[40px] w-full"
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                    setError && setError(null);
                }}
            >
                {children}
            </select>
            <p className="text-sm text-error-1">{error}</p>
        </label>
    );
};

export default SelectInput;
