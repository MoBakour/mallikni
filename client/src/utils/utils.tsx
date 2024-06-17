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
