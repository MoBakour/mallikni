import { useEffect, useState } from "react";
import PropertyCard from "../components/feed/PropertyCard";
import { IProperty } from "../types/types";
import useAxios from "../hooks/useAxios";
import IconLoader2 from "../icons/IconLoader2";

const MyProperties = () => {
    const axios = useAxios();
    const [data, setData] = useState<IProperty[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get("/properties/own");

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
                <div className="flex justify-between items-center mt-28 mb-10 sm:mt-16 font-bold">
                    <h2 className="text-3xl tracking-wide leading-[60px]">
                        My Properties
                    </h2>

                    <a
                        className="text-4xl bg-theme-1 rounded-full text-white w-[60px] h-[60px] transition hover:scale-105 flex justify-center items-center"
                        title="Add New"
                        href="/new"
                    >
                        +
                    </a>
                </div>

                <div className="flex flex-col gap-6">
                    {loading ? (
                        <IconLoader2 className="animate-spin text-5xl mx-auto" />
                    ) : data.length > 0 ? (
                        data.map((property) => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                            />
                        ))
                    ) : (
                        <p className="text-lg text-gray-500/80 text-center">
                            Your properties will appear here
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default MyProperties;
