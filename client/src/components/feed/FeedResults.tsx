import PropertyCard from "./PropertyCard";

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
    ];

    return (
        <div className="pb-24">
            <p className="text-xl font-bold mb-3">720 Results</p>

            <div className="flex flex-col gap-8">
                {data.map((property) => (
                    <PropertyCard property={property} />
                ))}
            </div>
        </div>
    );
};

export default FeedResults;
