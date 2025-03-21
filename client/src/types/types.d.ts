export interface IAuth {
    token: string;
    user: {
        _id: string;
        username: string;
        email: string;
        favorites: string[];
        avatar: string;
        createdAt: Date;
        updatedAt: Date;
        activation: {
            activated: boolean;
            updated: boolean;
        };
    };
}

export interface IProperty {
    _id: string;
    title: string;
    description: string;
    owner: any;
    contacts: TContacts;
    country: string;
    city: string;
    mode: string;
    category: string;
    price: string;
    area: string;
    frequency: string;
    currency: string;
    beds: number;
    baths: number;
    age: number;
    images: string[];
    furnished: boolean;
    balcony: boolean;
    elevator: boolean;
    parking: boolean;
    security: boolean;
    location: [number, number];
    createdAt: Date;
    updatedAt: Date;
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
    beds: string[];
    baths: string[];
    furnished: boolean;
    balcony: boolean;
    elevator: boolean;
    parking: boolean;
    security: boolean;
    frequency: string;
}

export type TImage = {
    id: string;
    file: string | File;
    type: "new" | "edit";
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
