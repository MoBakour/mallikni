import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="flex justify-center items-center gap-4 py-3 text-sm">
            <Link to="/about" className="transition hover:opacity-70">
                About
            </Link>
            <span className="w-1 h-1 bg-black block rounded-full"></span>
            <Link to="/contact" className="transition hover:opacity-70">
                Contact
            </Link>
            <span className="w-1 h-1 bg-black block rounded-full"></span>
            <Link to="/privacy-policy" className="transition hover:opacity-70">
                Privacy Policy
            </Link>
        </footer>
    );
};

export default Footer;
