import React, { useState } from "react";
import { motion } from "framer-motion";

const AttractionDetail = () => {
    const imageList = ["/gambar_pantai.jpg", "/pantaitegalsambi.jpeg", "/penginapan.jpg"];
    const [mainImage, setMainImage] = useState(imageList[0]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-200 via-white to-blue-100 px-4 py-16">
            <motion.div className="text-center" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-2xl font-extrabold pt-8 mb-8 inline-block relative">
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
                <div className="md:w-1/2 space-y-6 text-gray-800 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-200">
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
                            <h3 className="font-semibold text-blue-900">Kontak & Reservasi</h3>
                            <ul className="list-disc list-inside text-sm text-gray-800">
                                <li>Telp: 0812-3456-7890</li>
                                <li>Email: info@tegalsambi.com</li>
                                <li>Instagram: @wisatategalsambi</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900">Fasilitas</h3>
                            <ul className="list-disc list-inside text-sm text-gray-800">
                                <li>Parkir Luas</li>
                                <li>Toilet & Mushola</li>
                                <li>Warung Makan</li>
                                <li>Gazebo</li>
                            </ul>
                        </div>
                    </div>

                    {/* Atraksi (Full Width) */}
                    <div>
                        <h3 className="font-semibold text-blue-900 mb-1">Atraksi yang Dapat Dilakukan</h3>
                        <ul className="list-disc list-inside text-sm text-gray-800 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <li>Susur Pantai</li>
                            <li>Workshop Budaya</li>
                            <li>Berfoto Ria</li>
                            <li>Makan Kuliner Lokal</li>
                            <li>Pentas Seni Tradisional</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AttractionDetail;
