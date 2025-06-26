import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const isAuthenticated = (): boolean => {
    return localStorage.getItem("token") !== null;
};

const Navbar = () => {
    const isAdminLoggedIn = isAuthenticated();
    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scroll ke bawah
            setShowNavbar(false);
        } else {
            // Scroll ke atas
            setShowNavbar(true);
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <AnimatePresence>
            {showNavbar && (
                <motion.nav className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md text-white shadow-lg" initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} transition={{ duration: 0.3 }}>
                    <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
                        <Link to="/" className="text-2xl font-bold hover:text-blue-300">
                            Logo
                        </Link>

                        <div className="space-x-6 text-sm sm:text-base font-medium flex items-center">
                            <Link to="/about" className="relative font-semibold text-white group">
                                <span className="group-hover:text-blue-200 transition duration-300">About Us</span>
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link to="/attractions" className="relative font-semibold text-white group">
                                <span className="group-hover:text-blue-200 transition duration-300">Wisata</span>
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link to="/facilities" className="relative font-semibold text-white group">
                                <span className="group-hover:text-blue-200 transition duration-300">Penginapan</span>
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link to="/peta-desa" className="relative font-semibold text-white group">
                                <span className="group-hover:text-blue-200 transition duration-300">WebGIS</span>
                                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
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
