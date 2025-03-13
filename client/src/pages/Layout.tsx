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
                className="fixed opacity-20 blur-3xl -left-72 -top-14 pointer-events-none"
            />

            {/* side menu */}
            <SideMenu />

            <div className="relative">{<Outlet />}</div>
        </div>
    );
};

export default Layout;
