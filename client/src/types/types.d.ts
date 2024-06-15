export interface IAuth {
    token: string;
    userDocument: {
        activation: {
            activated: boolean;
        };
    };
}

export interface IProperty {
    id: string;
    title: string;
    country: string;
    city: string;
    mode: string;
    category: string;
    beds: number;
    baths: number;
    area: number;
    price: number;
    image: string;
}
