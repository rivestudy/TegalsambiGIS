import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaWifi, FaCar, FaTv, FaBath } from "react-icons/fa";

const FacilitiesDetail: React.FC = () => {
    const imageList = ["/penginapan.jpg", "/penginapan2.jpg", "/penginapan3.jpg"];
    const [mainImage, setMainImage] = useState(imageList[0]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 to-cyan-600 px-4 py-16">
            {/* Judul */}
            <motion.div className="text-center" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                {/* Breadcrumb*/}
                <div className="flex justify-center pt-4 pb-1">
                    <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full shadow-md border border-white/30">
                        <nav>
                            <ol className="flex items-center font-semibold text-sm space-x-2 text-white">
                                <li>
                                    <Link to="/" className="flex items-center hover:text-orange-400 transition duration-300">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
                                        </svg>
                                        Landing Page
                                    </Link>
                                </li>
                                <li className="text-gray-300">/</li>
                                <li>
                                    <Link to="/facilities" className="flex items-center hover:text-orange-400 transition duration-300">
                                        Penginapan
                                    </Link>
                                </li>
                                <li className="text-gray-300">/</li>
                                <li className="text-orange-300 font-bold">Detail Penginapan</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <h1 className="text-2xl font-extrabold pt-1 mb-6 inline-block relative text-white">
                    Penginapan A<span className="block w-20 h-1 bg-orange-500 mx-auto mt-2 rounded-full"></span>
                </h1>
            </motion.div>

            {/* Konten Utama */}
            <motion.div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                {/* Gambar */}
                <div className="md:w-1/2">
                    <img src={mainImage} alt="Gambar Penginapan" className="rounded-lg shadow-md w-full object-cover h-[300px] md:h-[420px]" />
                    <div className="flex gap-4 mt-4 overflow-x-auto">
                        {imageList.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setMainImage(img)}
                                className={`w-20 h-20 rounded-md border-2 object-cover cursor-pointer transition duration-300 scale-95 hover:scale-100 ${mainImage === img ? "border-emerald-600" : "border-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Informasi Penginapan */}
                <div className="md:w-1/2 space-y-6 text-gray-600 bg-gradient-to-r from-sky-100 to-cyan-100 p-6 rounded-xl shadow-xl border border-gray-200">
                    {/* Deskripsi */}
                    <div>
                        <h2 className="font-semibold mb-2 text-orange-600">Deskripsi Penginapan</h2>
                        <p className="text-gray-800 text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </p>
                    </div>

                    {/* Informasi dalam 2 kolom */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                        <div>
                            <h3 className="font-semibold text-orange-600">Harga Per Malam</h3>
                            <p className="text-sm text-gray-800">Rp 250.000,00 - Rp 500.000,00</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-orange-600">Jam Check-in / Check-out</h3>
                            <p className="text-sm text-gray-800">Check-in: 14.00 WIB | Check-out: 12.00 WIB</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-orange-600">Fasilitas Penginapan</h3>

                            <ul className="text-sm text-gray-800 space-y-1">
                                <li className="flex items-center gap-2">
                                    <FaWifi className="text-black" /> WiFi Gratis
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaTv className="text-black" /> TV & AC
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaBath className="text-black" /> Kamar Mandi Dalam
                                </li>
                                <li className="flex items-center gap-2">
                                    <FaCar className="text-black" /> Parkir Luas
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-orange-600">Aktivitas di Sekitar Penginapan</h3>
                            <ul className="list-disc list-inside text-sm text-gray-800">
                                <li>Jalan-jalan Sore</li>
                                <li>Kuliner Malam</li>
                                <li>Pasar Oleh-oleh</li>
                                <li>Menikmati Sunset</li>
                            </ul>
                        </div>
                    </div>

                    {/* Aktivitas Tambahan */}
                    <div>
                        <h3 className="font-semibold text-orange-600 mb-1">Kontak & Reservasi</h3>
                        <ul className="list-disc list-inside text-sm text-gray-800 gap-x-6">
                            <li>Telp: 0821-9876-1234</li>
                            <li>Email: reservasi@penginapan.com</li>
                            <li>Instagram: @penginapan.tegalsambi</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
            {/* Lokasi */}
            <div className="mt-10 max-w-screen-xl mx-auto">
                <div className="bg-gradient-to-r from-sky-100 to-cyan-100 p-6 rounded-xl shadow-xl border border-gray-200">
                    <h3 className="font-semibold text-lg text-orange-600 mb-4">Lokasi Penginapan</h3>
                    <div className="rounded-xl overflow-hidden">
                        <iframe
                            title="map"
                            src="https://www.google.com/maps/embed?pb=!1m18..." // ganti dengan link maps yang sesuai
                            width="100%"
                            height="300"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FacilitiesDetail;
