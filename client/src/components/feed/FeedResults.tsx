import IconArrowRight from "../../icons/IconArrowRight";
import Links from "../common/Links";
import PropertyCard from "./PropertyCard";
import SideCard from "./SideCard";

const FeedResults = () => {
    const data = [
        {
            id: "1",
            title: "2+1 Apartment for rent in Sharjah, Al-Majaz",
            country: "United Arab Emirates",
            city: "Sharjah",
            mode: "rent",
            category: "residential",
            beds: 2,
            baths: 1,
            area: 600,
            price: 50000,
            image: "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
        },
        {
            id: "2",
            title: "2+1 Apartment for rent in Sharjah, Al-Majaz",
            country: "United Arab Emirates",
            city: "Sharjah",
            mode: "rent",
            category: "residential",
            beds: 2,
            baths: 1,
            area: 600,
            price: 50000,
            image: "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
        },
        {
            id: "3",
            title: "2+1 Apartment for rent in Sharjah, Al-Majaz",
            country: "United Arab Emirates",
            city: "Sharjah",
            mode: "rent",
            category: "residential",
            beds: 2,
            baths: 1,
            area: 600,
            price: 50000,
            image: "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
        },
        {
            id: "4",
            title: "2+1 Apartment for rent in Sharjah, Al-Majaz",
            country: "United Arab Emirates",
            city: "Sharjah",
            mode: "rent",
            category: "residential",
            beds: 2,
            baths: 1,
            area: 600,
            price: 50000,
            image: "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
        },
        {
            id: "5",
            title: "2+1 Apartment for rent in Sharjah, Al-Majaz",
            country: "United Arab Emirates",
            city: "Sharjah",
            mode: "rent",
            category: "residential",
            beds: 2,
            baths: 1,
            area: 600,
            price: 50000,
            image: "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
        },
        {
            id: "6",
            title: "2+1 Apartment for rent in Sharjah, Al-Majaz",
            country: "United Arab Emirates",
            city: "Sharjah",
            mode: "rent",
            category: "residential",
            beds: 2,
            baths: 1,
            area: 600,
            price: 50000,
            image: "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
        },
        {
            id: "7",
            title: "2+1 Apartment for rent in Sharjah, Al-Majaz",
            country: "United Arab Emirates",
            city: "Sharjah",
            mode: "rent",
            category: "residential",
            beds: 2,
            baths: 1,
            area: 600,
            price: 50000,
            image: "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
        },
    ];

    return (
        <div className="pb-24 flex justify-between">
            <div className="w-2/3">
                <p className="text-xl font-bold mb-3">720 Results</p>

                <div className="flex flex-col gap-8">
                    {data.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>

            <div className="w-3/12">
                <p className="text-xl font-bold mb-3">Suggestions</p>

                <div className="flex flex-col gap-8">
                    {data.slice(0, 2).map((property) => (
                        <SideCard key={property.id} property={property} />
                    ))}
                </div>

                <div className="sticky top-10">
                    <div className="bg-white shadow-lg p-4 rounded-lg w-full mt-8 flex flex-col gap-3">
                        <p className="text-lg font-bold">
                            Want to post your property?
                        </p>
                        <p className="text-slate-500 text-sm">
                            Post your property easily and for free and find your
                            tenant
                        </p>
                        <a
                            href="/my-properties"
                            className="w-full flex bg-theme-1 text-white text-lg font-bold rounded-lg py-3 text-center justify-evenly items-center transition hover:bg-theme-hover"
                        >
                            Post Your Property
                            <IconArrowRight className="text-2xl" />
                        </a>
                    </div>

                    <div>
                        <Links className="text-xs mt-4" dir="row" dots={true} />

                        {/* TODO: links to about/contact/privacy policy */}
                        {/* maybe also logo */}
                        {/* maybe also login/signup ? */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedResults;
