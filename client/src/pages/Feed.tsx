import { useRef, useState } from "react";
import FeedFilters from "../components/feed/FeedFilters";
import FeedResults from "../components/feed/FeedResults";
import { IProperty } from "../types/types";
import Links from "../components/common/Links";

const Feed = () => {
    const [data, setData] = useState<IProperty[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const loaderRef = useRef<HTMLDivElement>(null);

    return (
        <main className="relative">
            {/* content */}
            <div className="w-[80%] xl:w-[90%] m-auto relative sm:w-[95%]">
                <h2 className="mt-28 mb-10 sm:mt-16 font-bold text-3xl tracking-wide leading-[60px]">
                    What are you looking for?
                </h2>

                <div>
                    {/* filters */}
                    <FeedFilters
                        setData={setData}
                        setLoading={setLoading}
                        loaderRef={loaderRef}
                    />

                    {/* results */}
                    <FeedResults
                        data={data}
                        loading={loading}
                        loaderRef={loaderRef}
                    />
                </div>

                <Links dir="row" className="hidden lg:flex pb-4" />
            </div>
        </main>
    );
};

export default Feed;
