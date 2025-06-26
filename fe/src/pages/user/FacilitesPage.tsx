import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const penginapan = [
    {
        id: 1,
        title: "Penginapan A",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 100.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 2,
        title: "Penginapan B",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 120.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 3,
        title: "Penginapan C",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 120.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 4,
        title: "Penginapan D",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 220.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 5,
        title: "Penginapan E",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 220.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 6,
        title: "Penginapan F",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 220.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 7,
        title: "Penginapan G",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 220.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
];

const FacilitesPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[480px] bg-cover bg-center" style={{ backgroundImage: "url('/gambar_pantai.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Penginapan / Homestay</h1>

                    <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
                        <div className="relative">
                            <input type="text" placeholder="Cari Penginapan" className="w-full py-2 pl-10 pr-4 shadow-lg rounded-full border border-gray-300 text-gray-500" />
                            <span className="absolute left-3 top-2.5 text-gray-400">
                                <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0Z" />
                                </svg>
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Main Konten */}
            <motion.div className="max-w-screen-xl mx-auto px-4 pt-16 pb-16" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">Penginapan / Homestay</h2>
                <p className="text-gray-600 mb-6 max-width">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>

                {/* Grid Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {penginapan.map((inap) => (
                        <Link to={`/facilities/${inap.id}`} key={inap.id}>
                            <div className="bg-orange-100 shadow-md rounded-2xl overflow-hidden flex flex-col h-[350px] transition transform duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer">
                                <img src={inap.image} className="w-full h-48 object-cover" alt={inap.title} />
                                <div className="p-5 flex flex-col flex-grow justify-between">
                                    <div>
                                        <h3 className="text-lg font-bold mb-1">{inap.title}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-3">{inap.description}</p>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm font-medium text-orange-600">{inap.price}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default FacilitesPage;
