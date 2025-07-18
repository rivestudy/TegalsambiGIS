import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation";

const bounceVariant = (direction: "top" | "bottom" | "left" | "right") => {
    switch (direction) {
        case "top":
            return { initial: { opacity: 0, y: -60 }, whileInView: { opacity: 1, y: 0 } };
        case "bottom":
            return { opacity: 0, y: 60 };
        case "left":
            return { initial: { opacity: 0, x: -60 }, whileInView: { opacity: 1, x: 0 } };
        case "right":
            return { initial: { opacity: 0, x: 60 }, whileInView: { opacity: 1, x: 0 } };
    }
};

const animationConfig: Transition = {
    type: "spring",
    bounce: 0.6,
    duration: 2.0,
};

const mapLinks: { [key: string]: { url: string; places: string[] } } = {
    semua: {
        url: "https://www.google.com/maps/embed?pb=!1m18...",
        places: ["Semua Lokasi"],
    },
    wisataReligi: {
        url: "https://www.google.com/maps/embed?pb=!1m18...",
        places: ["Masjid Al-Hikmah", "Makam Sunan Mantingan"],
    },
    wisataBudaya: {
        url: "https://www.google.com/maps/embed?pb=!1m18...",
        places: ["Museum Batik Jepara", "Situs Kandang Rusa Mantingan"],
    },
    wisataPesisir: {
        url: "https://www.google.com/maps/embed?pb=!1m18...",
        places: ["Pantai Tegalsambi"],
    },
    kantor: {
        url: "https://www.google.com/maps/embed?pb=!1m18...",
        places: ["Balai Desa Tegalsambi", "Kantor RW 01"],
    },
    fasilitas: {
        url: "https://www.google.com/maps/embed?pb=!1m18...",
        places: ["Puskesmas Tegalsambi", "Lapangan Umum"],
    },
    penginapan: {
        url: "https://www.google.com/maps/embed?pb=!1m18...",
        places: ["Penginapan Tegalsambi A", "Penginapan Tegalsambi B"],
    },
};

const MapPage = () => {
    const [selectedFilter, setSelectedFilter] = useState("semua");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);
    if (loading) return <LoadingAnimation />;

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 to-cyan-600 px-4 py-12 pt-16 pb-14">
            {/* Breadcrumb dan Judul */}
            <motion.div className="text-center py-8" initial={bounceVariant("top").initial} whileInView={bounceVariant("top").whileInView} transition={animationConfig} viewport={{ once: true }}>
                <nav className="mb-1">
                    <ol className="flex justify-center items-center space-x-2 text-sm font-semibold text-white">
                        <li>
                            <Link to="/" className="flex items-center hover:text-orange-400 transition duration-300">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
                                </svg>
                                Landing Page
                            </Link>
                        </li>
                        <li className="text-gray-400 font-semibold">/</li>
                        <li className="text-orange-300 font-bold">WebGIS</li>
                    </ol>
                </nav>

                <h1 className="text-4xl font-extrabold text-white mb-3">WebGIS Desa Tegalsambi</h1>
                <span className="block w-24 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></span>
            </motion.div>

            {/* Grid Map + Sidebar */}
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Map Area */}
                <motion.div className="md:col-span-3 space-y-4" initial={bounceVariant("left").initial} whileInView={bounceVariant("left").whileInView} transition={animationConfig}>
                    <div className="bg-white border border-gray-300 rounded-2xl shadow-lg p-4">
                        <label className="block font-semibold text-gray-700 mb-2">Tampilkan Titik:</label>
                        <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="w-full p-2 border rounded-md text-sm">
                            <option value="semua">Semua Titik</option>
                            <option value="wisataReligi">Wisata Religi</option>
                            <option value="wisataBudaya">Wisata Budaya</option>
                            <option value="wisataPesisir">Wisata Pesisir</option>
                            <option value="kantor">Kantor</option>
                            <option value="fasilitas">Fasilitas</option>
                            <option value="penginapan">Penginapan</option>
                        </select>
                    </div>

                    <div className="bg-white border border-gray-300 rounded-2xl shadow-lg h-[400px] p-4 flex items-center justify-center">
                        <div className="w-full h-full rounded-xl overflow-hidden max-w-5xl mx-auto">
                            <iframe title="map" src={mapLinks[selectedFilter].url} className="w-full h-full" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                        </div>
                    </div>
                </motion.div>

                {/* Sidebar Lokasi */}
                <motion.div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6" initial={bounceVariant("right").initial} whileInView={bounceVariant("right").whileInView} transition={{ ...animationConfig, delay: 0.3 }}>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Lokasi</h2>
                    <ul className="space-y-3 text-gray-600 text-sm">
                        {mapLinks[selectedFilter].places.map((place, index) => (
                            <li key={index} className="flex items-center">
                                <span className="w-3 h-3 bg-blue-600 mr-3 rounded-full shadow"></span>
                                {place}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default MapPage;
