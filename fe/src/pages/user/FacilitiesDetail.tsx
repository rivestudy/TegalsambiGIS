import React, { useState } from "react";
import { motion } from "framer-motion";

const FacilitiesDetail: React.FC = () => {
    const imageList = ["/penginapan.jpg", "/penginapan2.jpg", "/penginapan3.jpg"];
    const [mainImage, setMainImage] = useState(imageList[0]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-100 via-white to-blue-100 px-4 py-16">
            {/* Judul */}
            <motion.div className="text-center" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-2xl font-extrabold pt-8 mb-8 inline-block relative text-gray-900">
                    Penginapan A<span className="block w-20 h-1 bg-orange-500 mx-auto mt-2 rounded-full"></span>
                </h1>
            </motion.div>

            {/* Konten Utama */}
            <motion.div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                {/* Gambar */}
                <div className="md:w-1/2">
                    <img src={mainImage} alt="Gambar Penginapan" className="rounded-xl shadow-xl w-full object-cover h-[300px] md:h-[420px]" />
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
                <div className="md:w-1/2 space-y-6 text-gray-800 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-xl border border-gray-200">
                    {/* Deskripsi */}
                    <div>
                        <h2 className="font-semibold mb-2 text-emerald-800">Deskripsi Penginapan</h2>
                        <p className="text-gray-800 text-sm leading-relaxed">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                        </p>
                    </div>

                    {/* Informasi dalam 2 kolom */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                        <div>
                            <h3 className="font-semibold text-emerald-800">Harga Per Malam</h3>
                            <p className="text-sm text-gray-800">Rp 250.000,00 - Rp 500.000,00</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-emerald-800">Jam Check-in / Check-out</h3>
                            <p className="text-sm text-gray-800">Check-in: 14.00 WIB | Check-out: 12.00 WIB</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-emerald-800">Kontak & Reservasi</h3>
                            <ul className="list-disc list-inside text-sm text-gray-800">
                                <li>Telp: 0821-9876-1234</li>
                                <li>Email: reservasi@penginapan.com</li>
                                <li>Instagram: @penginapan.tegalsambi</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-emerald-800">Fasilitas Penginapan</h3>
                            <ul className="list-disc list-inside text-sm text-gray-800">
                                <li>AC & TV</li>
                                <li>Kamar Mandi Dalam</li>
                                <li>WiFi Gratis</li>
                                <li>Tempat Parkir</li>
                            </ul>
                        </div>
                    </div>

                    {/* Aktivitas Tambahan */}
                    <div>
                        <h3 className="font-semibold text-emerald-800 mb-1">Aktivitas di Sekitar Penginapan</h3>
                        <ul className="list-disc list-inside text-sm text-gray-800 grid grid-cols-1 md:grid-cols-2 gap-x-6">
                            <li>Jalan-jalan Sore</li>
                            <li>Kuliner Malam</li>
                            <li>Pasar Oleh-oleh</li>
                            <li>Menikmati Sunset</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default FacilitiesDetail;
