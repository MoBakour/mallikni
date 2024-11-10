import PropertyCard from "../components/feed/PropertyCard";

const MyProperties = () => {
    const data = [];

    return (
        <main>
            <div className="w-[80%] m-auto relative pb-20">
                <div className="flex justify-between items-center pt-28 pb-10 font-bold">
                    <h2 className="text-3xl tracking-wide ">My Properties</h2>

                    <a
                        className="text-4xl bg-theme-1 rounded-full text-white w-[60px] h-[60px] transition hover:scale-105 flex justify-center items-center"
                        title="Add New"
                        href="/new"
                    >
                        +
                    </a>
                </div>
                <div className="flex flex-col gap-6">
                    {data.map((property) => (
                        <PropertyCard key={property.id} property={property} />
                    ))}
                </div>
            </div>
        </main>
    );
};

export default MyProperties;
