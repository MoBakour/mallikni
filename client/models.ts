// User Interface
interface User {
    email: string;
    username: string;
    password: string;
    avatar: string;
    favorites: string[];
    verification: {
        code: string;
        issued: Date;
        blocked: boolean;
    };
}

// Property Details Interfaces
interface PropertyDetails {
    mode: "sale" | "rent";
    country: string;
    state: string;
    price: number;
    area: number;
    furnished: boolean;
    age: number;
}

interface ApartmentPropertyDetails {
    balcony: boolean;
    elevator: boolean;
    parking: boolean;
    floor: number;
    floors: number;
    beds: number;
    baths: number;
}

// Property Types
type ResidentialProperty = {
    category: "residential";
    type: "flat" | "villa" | "penthouse" | "townhouse" | "farmhouse";
} & ApartmentPropertyDetails &
    PropertyDetails;

type CommercialProperty = (
    | {
          category: "commercial";
          type: "shop" | "warehouse" | "factory";
      }
    | ({
          category: "commercial";
          type: "office";
      } & ApartmentPropertyDetails)
) &
    PropertyDetails;

// Final Property Interface
interface Property {
    title: string;
    description: string;
    images: string[];
    details: ResidentialProperty | CommercialProperty;
    location: {};
}

// Exports
export { User, Property };
