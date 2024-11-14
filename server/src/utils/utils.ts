/**
 * this function generates a random string of 6 digits
 */
export const generateActivationCode = (): string => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * this function translates a query object to a MongoDB query
 */
export const translateQueryToMQL = (query: any) => {
    const filter: any = {};
    if (query.mode) filter.mode = query.mode;
    if (query.category) filter.category = query.category;
    if (query.country) filter.country = query.country;
    if (query.city) filter.city = query.city;
    if (query.minPrice) filter.price = { $gte: +query.minPrice };
    if (query.maxPrice) {
        filter.price = {
            ...filter.price,
            $lte: +query.maxPrice,
        };
    }
    if (query.minArea) filter.area = { $gte: +query.minArea };
    if (query.maxArea) {
        filter.area = {
            ...filter.area,
            $lte: +query.maxArea,
        };
    }
    if (query.minAge) filter.age = { $gte: +query.minAge };
    if (query.maxAge) {
        filter.age = {
            ...filter.age,
            $lte: +query.maxAge,
        };
    }
    if (query.furnished) filter.furnished = query.furnished;
    if (query.balcony) filter.balcony = query.balcony;
    if (query.elevator) filter.elevator = query.elevator;
    if (query.parking) filter.parking = query.parking;
    if (query.security) filter.security = query.security;
    if (query.frequency) filter.frequency = query.frequency;

    // process beds & baths
    if (query.beds) {
        query.beds = (query.beds as string).split(",");

        const beds = query.beds
            .filter((bed: string) => bed !== "7+")
            .map((bed: string) => (bed === "studio" ? 0 : +bed));

        filter.beds = { $in: beds };

        if (query.beds.includes("7+")) {
            if (!filter.$or) filter.$or = [];
            filter.$or = [
                ...filter.$or,
                { beds: { $gte: 7 } },
                { beds: { $in: beds } },
            ];
        }
    }

    if (query.baths) {
        query.baths = (query.baths as string).split(",");

        const baths = query.baths
            .filter((baths: string) => baths !== "5+")
            .map((baths: string) => +baths);

        filter.baths = { $in: baths };

        if (query.baths.includes("5+")) {
            if (!filter.$or) filter.$or = [];
            filter.$or = [
                ...filter.$or,
                { baths: { $gte: 5 } },
                { baths: { $in: baths } },
            ];
        }
    }

    return filter;
};

/**
 * this function calculates the time remaining until a given time
 */
export const timeUntil = (ms: number) => {
    const now = Date.now();
    const diff = ms - now;

    if (diff <= 0) {
        return "Time has passed";
    }

    // calculate hours and minutes
    const totalMinutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // build the output string
    let result = [];
    if (hours > 0) {
        result.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
    }
    if (minutes > 0) {
        result.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
    }

    return result.join(", ");
};
