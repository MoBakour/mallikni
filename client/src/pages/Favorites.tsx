import PropertyCard from "../components/feed/PropertyCard";

const Favorites = () => {
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
            images: [
                "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
            ],
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
            images: [
                "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
            ],
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
            images: [
                "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
            ],
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
            images: [
                "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
            ],
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
            images: [
                "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
            ],
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
            images: [
                "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
            ],
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
            images: [
                "https://st3.depositphotos.com/1004998/17968/i/450/depositphotos_179686718-stock-photo-english-street-of-terraced-houses.jpg",
            ],
        },
    ];

    return (
        <main>
            <div className="w-[80%] m-auto relative pb-20">
                <h2 className="font-bold text-3xl tracking-wide pt-28 pb-10">
                    My Favorites
                </h2>
                <div className="grid grid-cols-3 gap-6">
                    {data.map((property) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            details={false}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Favorites;
