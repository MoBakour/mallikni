import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <main className="flex justify-center items-center gap-x-20 gap-y-10 lg:flex-col min-h-screen">
            <p
                className="absolute text-[700px] pointer-events-none opacity-[0.05] max-h-full max-w-full overflow-hidden leading-tight"
                style={{ fontFamily: "monospace" }}
            >
                404
            </p>

            <div className="flex flex-col gap-5 z-10">
                <p className="text-theme-1 contrast-50 text-5xl font-bold">
                    We have bad
                    <br />
                    news for you.
                </p>
                <p className="text-justify">
                    You have visited an unavailable page.
                </p>
                <Link
                    to="/"
                    className="w-fit p-3 rounded-lg font-bold gradient-btn"
                >
                    Go Home
                </Link>
            </div>

            <img
                src="./images/not-found.jpg"
                alt="Not Found"
                className="rounded-full w-[500px] z-10"
            />
        </main>
    );
};

export default NotFound;
