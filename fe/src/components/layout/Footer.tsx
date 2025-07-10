import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    const villageName = "Tegalsambi";

    return (
        <footer className="pt-12 text-white bg-gradient-to-br from-black via-gray-900 to-black">
            {/* Main Content */}
            <div className="grid grid-cols-1 gap-12 px-6 pb-10 mx-auto border-b border-gray-700 max-w-7xl sm:grid-cols-3">
                {/* Column 1 */}
                <div>
                    <h2 className="mb-4 text-2xl font-bold">Tegalsambi</h2>
                    <p className="mb-6 text-sm text-gray-400">Jelajahi keindahan dan budaya Desa Tegalsambi, destinasi wisata dan penginapan di Jepara.</p>
                    <div className="flex space-x-4 text-xl">
                        <a href="#" className="transition-colors duration-300 hover:text-red-500">
                            <FaYoutube />
                        </a>
                        <a href="#" className="transition-colors duration-300 hover:text-blue-600">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="transition-colors duration-300 hover:text-pink-500">
                            <FaInstagram />
                        </a>
                        <a href="#" className="transition-colors duration-300 hover:text-sky-400">
                            <FaTwitter />
                        </a>
                    </div>
                </div>

                {/* Column 2 */}
                <div>
                    <h2 className="mb-4 text-xl font-semibold">Menu</h2>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <a href="about" className="transition-colors duration-200 hover:text-gray-300">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="attractions" className="transition-colors duration-200 hover:text-gray-300">
                                Wisata
                            </a>
                        </li>
                        {/* <li>
                            <a href="acomodation" className="transition-colors duration-200 hover:text-gray-300">
                                Penginapan
                            </a>
                        </li> */}
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
                    </ul>
                </div>

                {/* Column 3 */}
                <div>
                    <h2 className="mb-4 text-xl font-semibold">Support</h2>
                    <ul className="space-y-3 text-sm">
                        <li>
                            <a href="#" className="transition-colors duration-200 hover:text-gray-300">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition-colors duration-200 hover:text-gray-300">
                                FAQs
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition-colors duration-200 hover:text-gray-300">
                                Help Center
                            </a>
                        </li>
                        <li>
                            <a href="#" className="transition-colors duration-200 hover:text-gray-300">
                                Terms & Conditions
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="px-4 pb-6 mt-8 text-sm text-center text-gray-500">
                <p>
                    &copy; {new Date().getFullYear()} Pemerintah Desa {villageName}. All Rights Reserved.
                </p>
                <p>Kabupaten Jepara, Jawa Tengah, Indonesia</p>
            </div>
        </footer>
    );
};

export default Footer;
