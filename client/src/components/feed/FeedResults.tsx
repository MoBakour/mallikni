import { Link } from "react-router-dom";
import IconArrowRight from "../../icons/IconArrowRight";
import Links from "../common/Links";
import PropertyCard from "./PropertyCard";
import { IProperty } from "../../types/types";
import IconLoader2 from "../../icons/IconLoader2";

interface IFeedResults {
    data: IProperty[];
    loading: boolean;
}

const FeedResults = ({ data, loading }: IFeedResults) => {
    return (
        <div className="pb-24 flex justify-between lg:flex-col-reverse">
            <div className="w-2/3 lg:w-full">
                {data.length > 0 && (
                    <p className="text-xl font-bold mb-3">
                        {data.length} Results
                    </p>
                )}

                <div className="flex flex-col gap-8 sm:gap-5">
                    {loading ? (
                        <div className="bg-slate-500/20 rounded-xl h-[200px] flex justify-center items-center">
                            <IconLoader2 className="animate-spin text-5xl m-auto opacity-40" />
                        </div>
                    ) : data.length > 0 ? (
                        data.map((property: IProperty) => (
                            <PropertyCard
                                key={property._id}
                                property={property}
                            />
                        ))
                    ) : (
                        <p className="text-lg text-gray-600">
                            No results found
                        </p>
                    )}
                </div>
            </div>

            <div className="w-3/12 lg:w-full">
                <p className="text-xl font-bold mb-3">Suggestions</p>

                <div className="flex flex-col gap-8 lg:flex-row lg:overflow-x-auto lg:flex-start pb-2">
                    {data.slice(0, 3).map((property) => (
                        <PropertyCard
                            key={property._id}
                            property={property}
                            details={false}
                            className="lg:shrink-0 lg:w-[200px]"
                        />
                    ))}
                </div>

                <div className="sticky top-10 lg:static">
                    <div className="bg-white shadow-lg p-3 rounded-lg w-full mt-8 flex flex-col gap-3 mb-4">
                        <p className="text-lg font-bold">
                            Want to post your property?
                        </p>
                        <p className="text-slate-500 text-sm">
                            Post your property easily and for free and find your
                            tenant
                        </p>
                        <Link
                            to="/my-properties"
                            className="w-full flex bg-theme-1 text-white text-lg font-bold rounded-lg py-3 text-center justify-center gap-2 items-center transition hover:bg-theme-hover"
                        >
                            Post Your Property
                            <IconArrowRight className="text-2xl" />
                        </Link>
                    </div>

                    <Links className="text-xs lg:hidden" dir="row" />
                </div>
            </div>
        </div>
    );
};

export default FeedResults;
