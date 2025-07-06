import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const isAuthenticated = (): boolean => localStorage.getItem("token") !== null;

const Navbar = () => {
    const isAdminLoggedIn = isAuthenticated();
    const location = useLocation();
    const currentPath = location.pathname;

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const navItemClass = (path: string) => `relative font-semibold group ${currentPath.startsWith(path) ? "text-blue-200" : "text-white"}`;

    const underlineClass = (path: string) => `absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ${currentPath.startsWith(path) ? "w-full" : "w-0 group-hover:w-full"}`;

    return (
        <AnimatePresence>
            {showNavbar && (
                <motion.nav className="fixed top-0 left-0 right-0 z-50 text-white shadow-lg bg-black/30 backdrop-blur-md" initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center justify-between max-w-screen-xl px-4 py-3 mx-auto">
                        <Link to="/" className="text-2xl font-bold hover:text-blue-300">
                            Logo
                        </Link>

                        <div className="flex items-center space-x-6 text-sm font-medium sm:text-base">
                            <Link to="/about" className={navItemClass("/about")}>
                                <span>About Us</span>
                                <span className={underlineClass("/about")}></span>
                            </Link>
                            <Link to="/attractions" className={navItemClass("/attractions")}>
                                <span>Wisata</span>
                                <span className={underlineClass("/attractions")}></span>
                            </Link>
                            <Link to="/accommodation" className={navItemClass("/accomodation")}>
                                <span>Penginapan</span>
                                <span className={underlineClass("/accomodation")}></span>
                            </Link>
                            <Link to="/facilities" className={navItemClass("/facilities")}>
                                <span>Fasilitas</span>
                                <span className={underlineClass("/facilities")}></span>
                            </Link>
                            <Link to="/peta-desa" className={navItemClass("/peta-desa")}>
                                <span>WebGIS</span>
                                <span className={underlineClass("/peta-desa")}></span>
                            </Link>

                            {!isAdminLoggedIn && (
                                <Link
                                    to="/login"
                                    className="ml-4 px-4 py-1.5 border border-white font-semibold text-white rounded bg-transparent hover:bg-gradient-to-r hover:border-transparent hover:from-blue-500 hover:to-blue-700 hover:text-white transition duration-300"
                                >
                                    Login Admin
                                </Link>
                            )}
                        </div>
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;
