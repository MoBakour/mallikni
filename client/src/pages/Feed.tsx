import FeedFilters from "../components/feed/FeedFilters";
import FeedResults from "../components/feed/FeedResults";

const Feed = () => {
    return (
        <main className="relative">
            {/* content */}
            <div className="w-[80%] m-auto relative">
                <h2 className="font-bold text-3xl tracking-wide pt-28 pb-10">
                    What are you looking for?
                </h2>

                {/* filters */}
                <FeedFilters />

                {/* results */}
                <FeedResults />
            </div>
        </main>
    );
};

export default Feed;
