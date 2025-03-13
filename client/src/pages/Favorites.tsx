import { useEffect, useState } from "react";
import PropertyCard from "../components/feed/PropertyCard";
import useAxios from "../hooks/useAxios";
import { IProperty } from "../types/types";
import IconLoader2 from "../icons/IconLoader2";

const Favorites = () => {
    const axios = useAxios();
    const [data, setData] = useState<IProperty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/properties/favorites");

                if (response.status === 200) {
                    setData(response.data.properties);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <main>
            <div className="w-[80%] md:w-[95%] m-auto relative pb-20">
                <h2 className="font-bold text-3xl tracking-wide pt-28 pb-10">
                    My Favorites
                </h2>
                {loading ? (
                    <IconLoader2 className="animate-spin text-5xl mx-auto" />
                ) : data.length > 0 ? (
                    <div className="grid grid-cols-3 gap-6 lg:grid-cols-2 sm:grid-cols-1">
                        {data.map((property) => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                                details={false}
                                className="min-w-[260px] shrink-0"
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-lg text-gray-500/80 text-center">
                        Your favorites will appear here
                    </p>
                )}
            </div>
        </main>
    );
};

export default Favorites;
