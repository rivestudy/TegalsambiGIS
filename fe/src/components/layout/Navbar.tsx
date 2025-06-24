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
                <motion.nav className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-md text-black shadow-md" initial={{ y: -100 }} animate={{ y: 0 }} exit={{ y: -100 }} transition={{ duration: 0.3 }}>
                    <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
                        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
                            Logo
                        </Link>

                        <div className="space-x-6 text-sm sm:text-base font-medium flex items-center">
                            <Link to="/about" className="hover:text-gray-300">
                                About Us
                            </Link>
                            <Link to="/attractions" className="hover:text-gray-300">
                                Wisata
                            </Link>
                            <Link to="/facilities" className="hover:text-gray-300">
                                Penginapan
                            </Link>
                            <Link to="/peta-desa" className="hover:text-gray-300">
                                WebGIS
                            </Link>

                            {!isAdminLoggedIn && (
                                <Link
                                    to="/login"
                                    className="ml-4 px-4 py-1.5 border border-black text-black rounded bg-transparent hover:bg-gradient-to-r hover:border-transparent hover:from-blue-500 hover:to-blue-700 hover:text-white transition duration-300"
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
