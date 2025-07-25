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

    const navItemClass = (path: string) => {
        const isFacilityGroup = path === "/facilities" && (currentPath.startsWith("/facilities") || currentPath.startsWith("/facility/") || currentPath.startsWith("/accommodation/"));

        const isActive = path === "/facilities" ? isFacilityGroup : currentPath.startsWith(path);

        return `relative font-semibold group ${isActive ? "text-blue-200" : "text-white"}`;
    };

    const underlineClass = (path: string) => {
        const isFacilityGroup = path === "/facilities" && (currentPath.startsWith("/facilities") || currentPath.startsWith("/facility/") || currentPath.startsWith("/accommodation/"));

        const isActive = path === "/facilities" ? isFacilityGroup : currentPath.startsWith(path);

        return `absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`;
    };

    return (
        <AnimatePresence>
            {showNavbar && (
                <motion.nav className="fixed top-0 left-0 right-0 z-50 text-white shadow-lg bg-black/30 backdrop-blur-md" initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} transition={{ duration: 0.3 }}>
                    <div className="flex items-center justify-between max-w-screen-xl px-4 py-2 mx-auto">
                        <Link to="/" className="flex items-center space-x-2 text-xl font-bold transition hover:opacity-80">
                            <img src="/logoWeb.png" alt="Logo Tegalsambi" className="w-auto h-14" /> Tegalsambi
                        </Link>

                        <div className="flex items-center space-x-6 text-sm font-medium sm:text-base">
                            <Link to="/about" className={navItemClass("/about")}>
                                <span>Tentang</span>
                                <span className={underlineClass("/about")}></span>
                            </Link>
                            <Link to="/attractions" className={navItemClass("/attraction")}>
                                <span>Wisata</span>
                                <span className={underlineClass("/attraction")}></span>
                            </Link>
                            {/* <Link to="/accommodation" className={navItemClass("/accommodation")}>
                                <span>Penginapan</span>
                                <span className={underlineClass("/accommodation")}></span>
                            </Link> */}
                            <Link to="/facilities" className={navItemClass("/facilities")}>
                                <span>Fasilitas</span>
                                <span className={underlineClass("/facilities")}></span>
                            </Link>
                            <Link to="/peta-desa" className={navItemClass("/peta-desa")}>
                                <span>WebGIS</span>
                                <span className={underlineClass("/peta-desa")}></span>
                            </Link>
                            <Link to="/masterplan-tegalsambi" className={navItemClass("/masterplan-tegalsambi")}>
                                <span>Masterplan</span>
                                <span className={underlineClass("/masterplan-tegalsambi")}></span>
                            </Link>
                            <a href="https://tegalsambi.jepara.go.id/" target="_blank" rel="noopener noreferrer" className={navItemClass("/infoDesa")}>
                                <span>Info Desa</span>
                                <span className={underlineClass("/infoDesa")}></span>
                            </a>

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
