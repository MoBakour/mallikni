import SideMenu from "../components/common/SideMenu";
import FeedFilters from "../components/feed/FeedFilters";
import FeedHeader from "../components/feed/FeedHeader";
import FeedResults from "../components/feed/FeedResults";

const Feed = () => {
    return (
        <div className="relative">
            <FeedHeader />

            {/* blob */}
            <img
                src="./images/blob-1.svg"
                alt="Blob"
                className="fixed opacity-20 blur-3xl -left-72 -top-14 pointer-events-none"
            />

            {/* side menu */}
            <SideMenu />

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
        </div>
    );
};

export default Feed;
