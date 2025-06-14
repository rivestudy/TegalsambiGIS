import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
// import * as FaIcons from "react-icons/fa6";

const Footer = () => {
    const villageName = "Tegalsambi"; // Ganti sesuai kebutuhan

    return (
        <footer className="bg-black text-white pt-10">
            {/* Bagian utama footer */}
            <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-8 pb-8 border-b border-gray-700">
                {/* Kolom 1 */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Tegalsambi</h2>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-gray-400">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-400">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-400">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-400">
                                About Us
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Kolom 2 */}
                <div>
                    <h2 className="text-lg font-semibold mb-4">Support</h2>
                    <ul className="space-y-2 text-sm">
                        <li>
                            <a href="#" className="hover:text-gray-400">
                                Contact Us
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-400">
                                FAQs
                            </a>
                        </li>
                        <li>
                            <a href="#" className="hover:text-gray-400">
                                Social Media
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Kolom 3: Social Media */}
                <div>
                    <h2 className="text-lg font-semibold mb-4 text-center sm:text-left">Find Us!</h2>
                    <div className="flex justify-center sm:justify-start gap-4 text-xl">
                        <a href="#" className="hover:text-red-500">
                            <FaYoutube />
                        </a>
                        <a href="#" className="hover:text-blue-600">
                            <FaFacebookF />
                        </a>
                        <a href="#" className="hover:text-pink-500">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-white">
                            <FaTwitter />
                        </a>
                    </div>
                </div>
            </div>

            {/* Bagian copyright */}
            <div className="mt-6 text-sm text-center text-gray-400 px-4 pb-6">
                <p>
                    &copy; {new Date().getFullYear()} Pemerintah Desa {villageName}. Hak Cipta Dilindungi.
                </p>
                <p>Kabupaten Jepara, Jawa Tengah, Indonesia</p>
            </div>
        </footer>
    );
};

export default Footer;
