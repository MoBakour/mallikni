import { useState } from "react";
import FeedFilters from "../components/feed/FeedFilters";
import FeedResults from "../components/feed/FeedResults";
import { IProperty } from "../types/types";

const Feed = () => {
    const [data, setData] = useState<IProperty[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    return (
        <main className="relative">
            {/* content */}
            <div className="w-[80%] m-auto relative">
                <h2 className="font-bold text-3xl tracking-wide pt-28 pb-10">
                    What are you looking for?
                </h2>

                {/* filters */}
                <FeedFilters setData={setData} setLoading={setLoading} />

                {/* results */}
                <FeedResults data={data} loading={loading} />
            </div>
        </main>
    );
};

export default Feed;
