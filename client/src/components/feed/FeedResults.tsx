import { Link } from "react-router-dom";
import IconArrowRight from "../../icons/IconArrowRight";
import Links from "../common/Links";
import PropertyCard from "./PropertyCard";
import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { IProperty } from "../../types/types";

const FeedResults = () => {
    const axios = useAxios();
    const [data, setData] = useState<IProperty[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("/properties/sample");
                setData(response.data.properties);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="pb-24 flex justify-between">
            <div className="w-2/3">
                <p className="text-xl font-bold mb-3">{data.length} Results</p>

                <div className="flex flex-col gap-8">
                    {data.map((property: IProperty) => (
                        <PropertyCard key={property._id} property={property} />
                    ))}
                </div>
            </div>

            <div className="w-3/12">
                <p className="text-xl font-bold mb-3">Suggestions</p>

                <div className="flex flex-col gap-8">
                    {data.slice(0, 2).map((property) => (
                        <PropertyCard
                            key={property._id}
                            property={property}
                            details={false}
                        />
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
                        <Link
                            to="/my-properties"
                            className="w-full flex bg-theme-1 text-white text-lg font-bold rounded-lg py-3 text-center justify-evenly items-center transition hover:bg-theme-hover"
                        >
                            Post Your Property
                            <IconArrowRight className="text-2xl" />
                        </Link>
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
