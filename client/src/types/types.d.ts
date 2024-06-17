export interface IAuth {
    token: string;
    user: {
        activation: {
            activated: boolean;
        };
    };
}

export interface IProperty {
    id: string;
    title: string;
    description: string;
    owner: string;
    source: string;
    contacts: {
        [key: string]: string | string[];
    };
    country: string;
    city: string;
    mode: string;
    category: string;
    price: number;
    area: number;
    beds: number;
    baths: number;
    area: number;
    price: number;
    age: number;
    images: string[];
    furnished: boolean;
    balcony: boolean;
    lift: boolean;
    parking: boolean;
    security: boolean;
}

export interface IState {
    code: string;
    name: string;
    subdivision: string | null;
}

export interface ICountry {
    code2: string;
    code3: string;
    name: string;
    capital: string;
    region: string;
    subregion: string;
    states: IState[];
}

export interface IFilters {
    mode: string;
    category: string;
    country: string;
    city: string;
    minPrice: string;
    maxPrice: string;
    minArea: string;
    maxArea: string;
    minAge: string;
    maxAge: string;
    source: string;
    furnished: boolean;
    beds: string[];
    baths: string[];
    balcony: boolean;
    lift: boolean;
    parking: boolean;
    security: boolean;
}
