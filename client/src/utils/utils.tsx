import LocationsData from "../assets/countries.json";

export const toggleItem = (array: any[], item: any, sort: boolean = false) => {
    const newArray = [...array];
    const index = newArray.indexOf(item);

    if (index === -1) {
        newArray.push(item);
    } else {
        newArray.splice(index, 1);
    }

    if (sort) {
        return newArray.sort((a, b) => {
            a = parseInt(a);
            b = parseInt(b);

            if (isNaN(a)) a = -1;
            if (isNaN(b)) b = -1;

            return a - b;
        });
    } else {
        return newArray;
    }
};

export const isChildOf = (child: HTMLElement, className: string) => {
    return child.closest(className) !== null;
};

export const currencyFormatter = new Intl.NumberFormat("en-US").format;

export const capitalize = (word: string) =>
    word[0].toUpperCase() + word.substring(1);

export const getCountryName = (code: string) => {
    const country = LocationsData.find(
        (country) => country.code2.toLowerCase() === code
    );
    return country ? country.name : code;
};

export const getCityName = (countryCode: string, code: string) => {
    const country = LocationsData.find(
        (c) => c.code2.toLowerCase() === countryCode
    );
    const city = country?.states.find((s) => s.code.toLowerCase() === code);

    return city ? city.name : code;
};
