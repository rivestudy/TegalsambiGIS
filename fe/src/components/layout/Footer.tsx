import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const villageName = "Tegalsambi";

    return (
        <footer className="bg-gradient-to-br from-black via-gray-900 to-black text-white pt-12">
            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 gap-12 pb-10 border-b border-gray-700">
                {/* Column 1 */}
                <div>
                    <h2 className="text-2xl font-bold mb-4">Tegalsambi</h2>
                    <p className="text-sm text-gray-400 mb-6">Jelajahi keindahan dan budaya Desa Tegalsambi, destinasi wisata dan kuliner di Jepara.</p>
                    <div className="flex space-x-4 text-xl">
                        <a href="#" className="hover:text-red-500 transition-colors duration-300">
                            <FaYoutube />
                        </a>
                        <a href="#" className="hover:text-blue-600 transition-colors duration-300">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-pink-500 transition-colors duration-300">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-sky-400 transition-colors duration-300">
                            <FaTwitter />
                        </a>
                    </div>
                </div>

                {/* Column 2 */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Menu</h2>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                                Wisata
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                                Kuliner
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                                WebGIS
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Support</h2>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                                FAQs
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                                Help Center
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-300 transition-colors duration-200">
                                Terms & Conditions
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="mt-8 text-sm text-center text-gray-500 px-4 pb-6">
                <p>
                    &copy; {new Date().getFullYear()} Pemerintah Desa {villageName}. All Rights Reserved.
                </p>
                <p>Kabupaten Jepara, Jawa Tengah, Indonesia</p>
            </div>
        </footer>
    );
};

export default Footer;
