import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiCheckCircle } from "react-icons/fi";
import { FaParking, FaToilet, FaMosque, FaUtensils, FaWifi, FaChild, FaTrash } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";

const AttractionDetail = () => {
    const imageList = ["/gambar_pantai.jpg", "/pantaitegalsambi.jpeg", "/penginapan.jpg"];
    const [mainImage, setMainImage] = useState(imageList[0]);

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 to-cyan-600 px-4 py-16">
            <motion.div className="text-center" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                {/* Breadcrumb*/}
                <div className="flex justify-center pt-4 pb-1">
                    <div className="bg-white/20 backdrop-blur-md px-6 py-3 rounded-full shadow-md border border-white/30">
                        <nav>
                            <ol className="flex items-center text-sm font-semibold space-x-2 text-white">
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
                                    <Link to="/attractions" className="hover:text-orange-400 transition duration-300">
                                        Wisata Tegalsambi
                                    </Link>
                                </li>
                                <li className="text-gray-300">/</li>
                                <li className="text-orange-300 font-bold">Detail Wisata</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <h1 className="text-2xl font-extrabold text-white pt-1 mb-6 inline-block relative">
                    Nama Wisata A<span className="block w-20 h-1 bg-orange-400 mx-auto mt-2 rounded-full"></span>
                </h1>
            </motion.div>

            <motion.div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                {/* BAGIAN KIRI: Gambar dan Thumbnails */}
                <div className="md:w-1/2">
                    <img src={mainImage} alt="Gambar Wisata" className="rounded-xl shadow-xl w-full object-cover h-[300px] md:h-[420px]" />
                    <div className="flex gap-4 mt-4 overflow-x-auto">
                        {imageList.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setMainImage(img)}
                                className={`w-20 h-20 rounded-md border-2 object-cover cursor-pointer transition duration-300 scale-95 hover:scale-100 ${mainImage === img ? "border-blue-500" : "border-gray-300"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* BAGIAN KANAN: Informasi */}
                <div className="md:w-1/2 space-y-6 text-gray-800 bg-gradient-to-r from-sky-100 to-cyan-100 p-6 rounded-xl shadow-xl border border-gray-200">
                    {/* Deskripsi */}
                    <div>
                        <h2 className="font-semibold mb-2 text-blue-900">Deskripsi Wisata</h2>
                        <p className="text-gray-800 text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    {/* 2 Kolom Informasi */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                        <div>
                            <h3 className="font-semibold text-blue-900">Harga Tiket</h3>
                            <p className="text-sm text-gray-800">Rp 120.000,00 /pax</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900">Jam Operasional</h3>
                            <p className="text-sm text-gray-800">Senin - Minggu, 08.00 - 17.00 WIB</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900 mb-2">Fasilitas</h3>
                            <ul className="space-y-2">
                                <li className="flex items-center text-sm text-gray-800">
                                    <FaParking className="text-black-600 mr-2" />
                                    Parkir Luas
                                </li>
                                <li className="flex items-center text-sm text-gray-800">
                                    <FaToilet className="text-black-600 mr-2" />
                                    Toilet
                                </li>
                                <li className="flex items-center text-sm text-gray-800">
                                    <FaMosque className="text-black-600 mr-2" />
                                    Mushola
                                </li>
                                <li className="flex items-center text-sm text-gray-800">
                                    <FaUtensils className="text-black-600 mr-2" />
                                    Warung Makan
                                </li>
                                <li className="flex items-center text-sm text-gray-800">
                                    <GiCampingTent className="text-black-600 mr-2" />
                                    Gazebo
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-blue-900">Atraksi yang Dapat Dilakukan</h3>
                            <ul className="list-disc list-inside text-sm text-gray-800">
                                <li>Susur Pantai</li>
                                <li>Workshop Budaya</li>
                                <li>Berfoto Ria</li>
                                <li>Makan Kuliner Lokal</li>
                                <li>Pentas Seni Tradisional</li>
                            </ul>
                        </div>
                    </div>

                    {/* Atraksi (Full Width) */}
                    <div>
                        <h3 className="font-semibold text-blue-900 mb-1">Kontak & Reservasi</h3>
                        <ul className="list-disc list-inside text-sm text-gray-800 gap-x-6">
                            <li>Telp: 0812-3456-7890</li>
                            <li>Email: info@tegalsambi.com</li>
                            <li>Instagram: @wisatategalsambi</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
            {/* Lokasi */}
            <div className="mt-10 max-w-screen-xl mx-auto">
                <div className="bg-gradient-to-r from-sky-100 to-cyan-100 p-6 rounded-xl shadow-xl border border-gray-200">
                    <h3 className="font-semibold text-lg text-blue-900 mb-4">Lokasi Wisata</h3>
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

export default AttractionDetail;
