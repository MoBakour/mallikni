// icon:menu_hamburger | System UIcons https://systemuicons.com/ | Corey Ginnivan
import * as React from "react";

function IconBurger(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 21 21"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <g
                fill="none"
                fillRule="evenodd"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <path d="M4.5 6.5h12M4.498 10.5h11.997M4.5 14.5h11.995" />
            </g>
        </svg>
    );
}

export default IconBurger;
