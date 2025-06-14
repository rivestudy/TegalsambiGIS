// src/components/Navbar.tsx
import React from "react";
import { Link } from "react-router-dom";

const isAuthenticated = (): boolean => {
    return localStorage.getItem("token") !== null;
};

const Navbar = () => {
    const isAdminLoggedIn = isAuthenticated();

    return (
        <nav className="bg-black text-white">
            <div className="max-w-screen-xl mx-auto px-4 py-3 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold hover:text-gray-300">
                    Logo
                </Link>

                {/* Menu Navigasi */}
                <div className="space-x-6 text-sm sm:text-base font-medium flex items-center">
                    <Link to="/about" className="hover:text-gray-300">
                        About Us
                    </Link>
                    <Link to="/attractions" className="hover:text-gray-300">
                        Wisata
                    </Link>
                    <Link to="/facilities" className="hover:text-gray-300">
                        Kuliner
                    </Link>
                    <Link to="/peta-desa" className="hover:text-gray-300">
                        WebGIS
                    </Link>

                    {/* Tombol Login hanya jika belum login */}
                    {!isAdminLoggedIn && (
                        <Link to="/login" className="ml-4 px-4 py-1.5 border border-white text-white rounded hover:bg-white hover:text-black transition">
                            Login Admin
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
