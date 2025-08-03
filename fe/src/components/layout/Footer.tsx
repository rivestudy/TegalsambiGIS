import React from "react";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

const isAuthenticated = (): boolean => sessionStorage.getItem("token") !== null;
const isAdminLoggedIn = isAuthenticated();

const Footer = () => {
    const villageName = "Tegalsambi";

    return (
        <footer className="pt-12 text-white bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Main Content */}
            <div className="grid grid-cols-1 gap-12 px-6 pb-10 mx-auto border-b border-gray-700 max-w-7xl sm:grid-cols-2">
                {/* Column 1 */}
                <div>
                    <h2 className="mb-4 text-2xl font-bold">Tegalsambi</h2>
                    <p className="mb-6 text-sm text-gray-400">Jelajahi keindahan dan budaya Desa Tegalsambi, destinasi wisata dan penginapan di Jepara.</p>
                    <div className="flex space-x-4 text-xl">
                        <a href="http://www.youtube.com/@desawisatategalsambi882" className="transition-colors duration-300 hover:text-red-500">
                            <FaYoutube />
                        </a>
                        <a href="https://www.facebook.com/deswita.tegalsambi" className="transition-colors duration-300 hover:text-blue-600">
                            <FaFacebookF />
                        </a>
                        <a href="https://www.instagram.com/desawisatategalsambi/" className="transition-colors duration-300 hover:text-pink-500">
                            <FaInstagram />
                        </a>
                        <a href="https://api.whatsapp.com/send/?phone=6287719959112&text&type=phone_number&app_absent=0" className="transition-colors duration-300 hover:text-sky-400">
                            <FaWhatsapp />
                        </a>
                    </div>
                </div>

                {/* Column 2 */}
                <div>
                    <h2 className="mb-4 text-xl font-semibold">Menu</h2>
                    <ul className="grid grid-cols-2 gap-3 text-sm">
                        <li>
                            <a href="about" className="transition-colors duration-200 hover:text-gray-300">
                                Tentang
                            </a>
                        </li>
                        <li>
                            <a href="attractions" className="transition-colors duration-200 hover:text-gray-300">
                                Wisata
                            </a>
                        </li>
                        <li>
                            <a href="facilities" className="transition-colors duration-200 hover:text-gray-300">
                                Fasilitas
                            </a>
                        </li>
                        <li>
                            <a href="peta-desa" className="transition-colors duration-200 hover:text-gray-300">
                                WebGIS
                            </a>
                        </li>
                        <li>
                            <a href="masterplan-tegalsambi" className="transition-colors duration-200 hover:text-gray-300">
                                Masterplan
                            </a>
                        </li>
                        <li>
                            <a href="https://tegalsambi.jepara.go.id/" target="_blank" rel="noopener noreferrer" className="transition-colors duration-200 hover:text-gray-300">
                                Info Desa
                            </a>
                        </li>
                        <li>
                            {!isAdminLoggedIn && (
                                <Link
                                    to="/login"
                                    className="transition-colors duration-200 hover:text-gray-300"                                >
                                    Admin Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </div>

            
            </div>

            {/* Copyright */}
            <div className="px-4 pb-6 mt-8 text-sm text-center text-gray-500">
                <p>
                    &copy; {new Date().getFullYear()} Pemerintah Desa {villageName} - Pengabdian IDBU UNDIP 2025 | All Rights Reserved.
                </p>
                <p>Kabupaten Jepara, Jawa Tengah, Indonesia</p>
            </div>
        </footer>
    );
};

export default Footer;
