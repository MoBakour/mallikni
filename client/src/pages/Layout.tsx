import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import SideMenu from "../components/common/SideMenu";

const Layout = () => {
    return (
        <div>
            <Header />

            {/* blob */}
            <img
                src="./images/blob-1.svg"
                alt="Blob"
                className="fixed opacity-20 blur-3xl -left-72 -top-14 pointer-events-none"
            />

            {/* side menu */}
            <SideMenu />

            {<Outlet />}
        </div>
    );
};

export default Layout;
