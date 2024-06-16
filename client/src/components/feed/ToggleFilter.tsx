import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

interface IToggleFilter {
    text1: string;
    text2: string;
    filterName: string;
    filters: any;
    setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const ToggleFilter = ({
    text1,
    text2,
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
                        filters[filterName] === text2 ? firstTextWidth + 4 : 0
                    }px)`,
                }}
            >
                {filters[filterName]}
            </div>

            {[text1, text2].map((txt, index) => (
                <div
                    key={txt}
                    className={clsx(
                        {
                            "cursor-pointer": filters[filterName] !== txt,
                        },
                        "py-1 px-5 rounded-full relative"
                    )}
                    onClick={() =>
                        setFilters((prev: any) => {
                            return {
                                ...prev,
                                [filterName]: txt,
                            };
                        })
                    }
                    ref={index === 0 ? firstText : null}
                >
                    {txt}
                </div>
            ))}
        </div>
    );
};

export default ToggleFilter;
