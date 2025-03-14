import clsx from "clsx";
import FadeInDiv from "../common/FadeInDiv";

interface ILandingSection {
    reverse: boolean;
    title: string;
    phrases: string[];
    image: string;
    imageAlt: string;
}

const LandingSection = ({
    reverse,
    title,
    phrases,
    image,
    imageAlt,
}: ILandingSection) => {
    return (
        <FadeInDiv
            className={clsx(
                "flex justify-between items-center gap-4 lg:flex-col",
                {
                    "flex-row-reverse": reverse,
                    "flex-row": !reverse,
                }
            )}
        >
            <div>
                <h2 className="font-bold text-4xl sm:text-3xl xs:text-2xl">
                    {title}
                </h2>
                <ul className="font-bold text-white text-2xl sm:text-xl xs:text-lg p-8 sm:p-3 sm:gap-3 flex flex-col gap-6">
                    {phrases.map((phrase, index) => (
                        <li
                            key={index}
                            className={clsx("whitespace-nowrap", {
                                "pl-8 sm:pl-6": index === 1,
                                "pl-16 sm:pl-10": index === 2,
                                "pl-24 sm:pl-14": index === 3,
                            })}
                        >
                            {phrase}
                        </li>
                    ))}
                </ul>
            </div>

            <img
                src={`./images/${image}`}
                alt={imageAlt}
                className="drop-shadow-2xl w-[400px] lg:w-[60%]"
            />
        </FadeInDiv>
    );
};

export default LandingSection;
