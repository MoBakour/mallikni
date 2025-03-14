import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import SideMenu from "../components/common/SideMenu";
import Blob1 from "../assets/blob-1.svg";

const Layout = () => {
    return (
        <div>
            <Header />

            {/* blob */}
            <img
                src={Blob1}
                alt="Blob"
                className="w-3/4 sm:w-4/5 top-24 -left-1/4 fixed opacity-20 blur-3xl pointer-events-none "
            />

            {/* side menu */}
            <SideMenu />

            <div className="relative">{<Outlet />}</div>
        </div>
    );
};

export default Layout;
