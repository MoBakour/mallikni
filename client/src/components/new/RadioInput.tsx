import clsx from "clsx";

interface IRadioInput {
    options: any[];
    selection: string;
    setSelection: (value: string) => void;
}

const RadioInput = ({ options, selection, setSelection }: IRadioInput) => {
    return (
        <div className="flex justify-between">
            {options.map((option: any) => (
                <button
                    type="button"
                    key={option.title}
                    onClick={() => setSelection(option.title)}
                    className={clsx(
                        `flex-[0.45] py-2 text-xl rounded-lg font-medium transition`,
                        option.title === selection
                            ? "bg-theme-1 text-white"
                            : "bg-white"
                    )}
                >
                    {option.label}
                </button>
            ))}
        </div>
    );
};

export default RadioInput;
