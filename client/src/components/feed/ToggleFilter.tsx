import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import { capitalize } from "../../utils/utils";

interface IToggleFilter {
    value1: {
        text: string;
        value: string;
    };
    value2: {
        text: string;
        value: string;
    };
    filterName: string;
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const ToggleFilter = ({
    value1,
    value2,
    filterName,
    filters,
    setFilters,
}: IToggleFilter) => {
    const firstText = useRef<HTMLDivElement>(null);
    const [firstTextWidth, setFirstTextWidth] = useState(0);

    useEffect(() => {
        setFirstTextWidth(
            firstText.current?.getBoundingClientRect().width || 0
        );
    }, [firstText]);

    return (
        <div className="bg-theme-2 w-fit p-1 flex justify-center items-center gap-1 rounded-full relative h-[40px]">
            <div
                className="text-transparent absolute z-0 bg-theme-1 py-1 px-5 rounded-full transition left-1"
                style={{
                    transform: `translateX(${
                        filters[filterName] === value2.value
                            ? firstTextWidth + 4
                            : 0
                    }px)`,
                }}
            >
                {filters[filterName]}
            </div>

            {[value1, value2].map((item, index) => (
                <div
                    key={item.text}
                    className={clsx(
                        {
                            "cursor-pointer":
                                filters[filterName] !== item.value,
                        },
                        "py-1 px-5 rounded-full relative"
                    )}
                    onClick={() =>
                        setFilters((prev: any) => {
                            return {
                                ...prev,
                                [filterName]: item.value,
                            };
                        })
                    }
                    ref={index === 0 ? firstText : null}
                >
                    {capitalize(item.text)}
                </div>
            ))}
        </div>
    );
};

export default ToggleFilter;
