interface INumberInput {
    title: string;
    value: number;
    setValue: (value: any) => void;
}

const NumberInput = ({ title, value, setValue }: INumberInput) => {
    const handleChange = (type: number) => {
        if (value === 0 && type === -1) return;
        setValue(value + type);
    };

    return (
        <div className="flex flex-col justify-center items-center w-[60px]">
            <p className="font-medium text-xl pb-2">{title}</p>

            <div className="flex flex-col justify-center items-center">
                <button
                    type="button"
                    className="bg-theme-2 w-[60px] rounded-t-lg transition hover:opacity-70"
                    onClick={() => handleChange(1)}
                >
                    +
                </button>
                <p className="py-1 text-lg">{value}</p>
                <button
                    type="button"
                    className="bg-theme-2 w-[60px] rounded-b-lg transition hover:opacity-70"
                    onClick={() => handleChange(-1)}
                >
                    -
                </button>
            </div>
        </div>
    );
};

export default NumberInput;
