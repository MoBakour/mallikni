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
    mode: "buy" | "rent";
    country: string;
    state: string;
    price: number;
    area: number;
    furnished: boolean;
    age: number;
    source: "owner" | "office" | "bank" | "constructor";
}

interface ApartmentPropertyDetails {
    balcony: boolean;
    lift: boolean;
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
