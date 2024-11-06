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
        [key: string]: string[] | { name: string; url: string }[];
    };
    country: string;
    city: string;
    mode: string;
    category: string;
    price: number;
    area: number;
    beds: number;
    baths: number;
    age: number;
    images: string[];
    furnished: boolean;
    balcony: boolean;
    elevator: boolean;
    parking: boolean;
    security: boolean;
    latitude: number;
    longitude: number;
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
    elevator: boolean;
    parking: boolean;
    security: boolean;
}

export type TImage = {
    id: string;
    url: string;
};

export type TContact = {
    id: string;
    value: string;
};

export type TLink = {
    id: string;
    label: string;
    url: string;
};

export type TContacts = {
    phones: TContact[];
    emails: TContact[];
    links: TLink[];
};
