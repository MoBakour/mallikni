import clsx from "clsx";
import IconEye from "../../icons/IconEye";
import IconEyeInvisible from "../../icons/IconEyeInvisible";
import { useRef } from "react";

interface IAuthInput {
    placeholder: string;
    value: string;
    type: string;
    setPwdMode?: (mode: string) => void;
    id: string;
    setValue: (val: string) => void;
}

const AuthInput = ({
    placeholder,
    value,
    type,
    setPwdMode,
    id,
    setValue,
}: IAuthInput) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    const togglePwdMode = () => {
        if (setPwdMode) {
            setPwdMode(type === "password" ? "text" : "password");
        }
    };

    return (
        <div
            className="_input group relative h-[50px] px-3 w-[300px] xs:w-[260px] border-[1px] border-[#dedede] rounded focus-within:border-[skyblue] cursor-text"
            onClick={() => inputRef.current?.focus()}
        >
            <label
                className={clsx(
                    "absolute z-10 transition-all group-focus-within:top-1 group-focus-within:text-[11px] cursor-text",
                    {
                        "top-1 text-[11px]": value !== "",
                        "top-[13px]": value === "",
                    }
                )}
                htmlFor={id}
            >
                {placeholder}
            </label>

            <div className="max-[100px]:text-center">
                <input
                    ref={inputRef}
                    type={type}
                    id={id}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    className={clsx("outline-none absolute bottom-1", {
                        "w-[calc(100%-48px)]": id === "password",
                        "w-[calc(100%-24px)]": id !== "password",
                    })}
                />

                {id === "password" && (
                    <div
                        onClick={togglePwdMode}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-xl transition hover:opacity-70 cursor-pointer"
                        id="eye-icon"
                    >
                        {type === "password" ? (
                            <IconEye />
                        ) : (
                            <IconEyeInvisible />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthInput;
