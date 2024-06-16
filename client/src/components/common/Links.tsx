import { Fragment } from "react/jsx-runtime";

const bottomLinks = [
    {
        title: "About",
        link: "/about",
    },
    {
        title: "Contact",
        link: "/contact",
    },
    {
        title: "Privacy Policy",
        link: "/privacy-policy",
    },
];

interface ILinks {
    className?: string;
    dir?: "row" | "col";
    dots?: boolean;
}

const Links = ({ className = "", dir = "col" }: ILinks) => {
    return (
        <div
            className={`flex flex-${dir} justify-center items-center gap-1 w-full ${className}`}
        >
            {bottomLinks.map((link, index) => (
                <Fragment key={link.title}>
                    <a href={link.link} className="transition hover:opacity-70">
                        {link.title}
                    </a>
                    {index + 1 !== bottomLinks.length && dir !== "col" && (
                        <span className="block w-[4px] h-[4px] bg-black rounded-full mx-1" />
                    )}
                </Fragment>
            ))}
        </div>
    );
};

export default Links;
