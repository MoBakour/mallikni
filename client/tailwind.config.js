/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                theme: {
                    1: "#fcd02c",
                    2: "#F3F3F3",
                },
                error: {
                    1: "crimson",
                    2: "rgba(220,20,60,0.1)",
                },
            },
        },
        screens: {
            xl: { max: "1279px" },
            // => @media (max-width: 1279px) { ... }

            lg: { max: "1023px" },
            // => @media (max-width: 1023px) { ... }

            md: { max: "767px" },
            // => @media (max-width: 767px) { ... }

            sm: { max: "639px" },
            // => @media (max-width: 639px) { ... }

            xs: { max: "479px" },
            // => @media (max-width: 479px) { ... }
        },
    },
    plugins: [],
};
