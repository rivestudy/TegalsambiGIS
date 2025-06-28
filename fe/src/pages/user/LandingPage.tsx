// src/pages/LandingPage.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../utils/axiosInstance";

interface Item {
    id: number;
    name: string;
    description: string;
    image: string;
}
const villageName = "Tegalsambi";

const LandingPage: React.FC = () => {
    const [attractions, setAttractions] = useState<Item[]>([]);
    const [facilities, setFacilities] = useState<Item[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [aRes, fRes] = await Promise.all([axios.get("/data/attraction"), axios.get("/data/facilities")]);
                setAttractions(aRes.data);
                setFacilities(fRes.data);
            } catch (err: any) {
                console.error(err);
                setError("Gagal memuat data. Silakan coba lagi nanti.");
            }
        };
        fetchData();
    }, []);
    return (
        <div className="overflow-x-hidden font-sans text-gray-800">
            {/* Hero Section */}
            <section
                className="relative flex items-center justify-center min-h-screen text-center text-white bg-fixed bg-center bg-no-repeat bg-cover"
                style={{
                    backgroundImage: "url('/gambar_pantai.jpg')",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-30"></div>

                {/* Content */}
                <div className="relative z-10">
                    <motion.h1 className="mb-6 text-5xl font-extrabold md:text-6xl drop-shadow-lg" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        TEGALSAMBI
                    </motion.h1>
                    {/* <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
                        <Link to="#tentang" className="inline-block px-6 py-2 text-lg font-semibold text-black transition bg-white rounded-full shadow-md hover:bg-gray-200">
                            Get Started !!
                        </Link>
                    </motion.div> */}
                </div>
            </section>

            {/* SECTION: TENTANG */}
            <section id="tentang" className="px-6 py-16 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Tentang Tegalsambi
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                        id est laborum.
                    </p>
                </div>
            </section>

            {/* SECTION: WISATA LOKAL TEGALSAMBI */}
            {/* Attractions Section */}
            <section id="wisata" className="px-6 pb-20 bg-white">
                <div className="max-w-6xl mx-auto mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Wisata lokal Tegalsambi
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">Temukan tempat menarik dan destinasi terbaik di sekitar Desa Tegalsambi.</p>
                </div>
                <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
                    {attractions.slice(0, 3).map(({ id, name, description, image }) => (
                        <Link to={`/attractions/${id}`} key={id} className="block">
                            <article className="overflow-hidden transition transform border border-gray-200 shadow-md rounded-xl hover:scale-105 hover:shadow-xl">
                                <img src={image} alt={name} className="object-cover w-full h-48" />
                                <div className="p-4 bg-blue-100">
                                    <p className="text-[10px] uppercase tracking-widest text-purple-500 font-medium">Wisata</p>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-800">{name}</h3>
                                    <p className="text-sm leading-relaxed text-gray-600">{description.slice(0, 100)}…</p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center pt-8">
                    <Link to="/attractions">
                        <button className="flex items-center gap-2 px-6 py-2 text-gray-700 transition bg-gray-200 rounded-full hover:bg-gray-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                            Lihat Selengkapnya
                        </button>
                    </Link>
                </div>
            </section>

            {/* Facilities Section */}
            <section id="penginapan" className="px-6 pb-20 bg-white">
                <div className="max-w-6xl mx-auto mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Penginapan Desa Tegalsambi
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">Pilihan fasilitas penginapan terbaik untuk kenyamanan Anda.</p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {facilities.slice(0, 3).map(({ id, name, description, image }) => (
                        <Link to={`/facilities/${id}`} key={id} className="block">
                            <article className="overflow-hidden transition transform border border-gray-200 shadow-md rounded-xl hover:scale-105 hover:shadow-xl">
                                <img src={image} alt={name} className="object-cover w-full h-48" />
                                <div className="p-4 bg-orange-100">
                                    <p className="text-[10px] uppercase tracking-widest text-purple-500 font-medium">Penginapan</p>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-800">{name}</h3>
                                    <p className="text-sm leading-relaxed text-gray-600">{description.slice(0, 100)}…</p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
                <div className="flex justify-center pt-8">
                    <Link to="/facilities">
                        <button className="flex items-center gap-2 px-6 py-2 text-gray-700 transition bg-gray-200 rounded-full hover:bg-gray-300">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                            Lihat Selengkapnya
                        </button>
                    </Link>
                </div>
            </section>
            {/* <header className="mb-8">
                <h1 className="mb-3 text-4xl font-semibold text-gray-800 md:text-5xl">{isAdminLoggedIn ? "Selamat Datang Kembali, Admin!" : `WebGIS Desa ${villageName}`}</h1>
                <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
                    {isAdminLoggedIn ? `Kelola data spasial dan informasi geografis Desa ${villageName}.` : `Temukan informasi geografis, potensi, dan tata ruang Desa ${villageName} melalui peta interaktif.`}
                </p>
            </header> */}
            <main className="mt-5">
                {/* {isAdminLoggedIn ? (
                    <div>
                        <p className="mb-6 text-base text-gray-700 md:text-lg">Anda masuk sebagai administrator. Akses dashboard untuk mengelola data WebGIS.</p>
                        <Link to="/admin/dashboard" className="inline-block px-6 py-3 text-base text-white transition bg-blue-600 rounded-lg shadow-md md:text-lg hover:bg-blue-800 hover:shadow-lg">
                            Masuk ke Dashboard Admin
                        </Link>
                    </div>
                ) : (
                    <div>
                        <p className="mb-8 text-base text-gray-700 md:text-lg">Jelajahi peta interaktif untuk melihat detail wilayah, fasilitas umum, penggunaan lahan, dan informasi penting lainnya mengenai Desa {villageName}.</p>
                        <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
                            <Link to="/peta-desa" className="inline-block px-8 py-3 text-lg text-white transition bg-green-600 rounded-lg shadow-md hover:bg-green-800 hover:shadow-lg">
                                Jelajahi Peta Desa
                            </Link>
                            <Link to="/login" className="inline-block px-6 py-2 mt-2 text-base text-blue-600 transition border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white md:mt-0">
                                Login Admin
                            </Link>
                        </div>
                    </div>
                )} */}
                {/* {isAdminLoggedIn ? (
                    <div>
                        <p className="mb-6 text-base text-gray-700 md:text-lg">Anda masuk sebagai administrator. Akses dashboard untuk mengelola data WebGIS.</p>
                        <Link to="/admin/dashboard" className="inline-block px-6 py-3 text-base text-white transition bg-blue-600 rounded-lg shadow-md md:text-lg hover:bg-blue-800 hover:shadow-lg">
                            Masuk ke Dashboard Admin
                        </Link>
                    </div>
                ) : (
                    <div>
                        <p className="mb-8 text-base text-gray-700 md:text-lg">Jelajahi peta interaktif untuk melihat detail wilayah, fasilitas umum, penggunaan lahan, dan informasi penting lainnya mengenai Desa {villageName}.</p>
                        <Link to="/peta-desa" className="inline-block px-8 py-3 text-lg text-white transition bg-green-600 rounded-lg shadow-md hover:bg-green-800 hover:shadow-lg">
                            Jelajahi Peta Desa
                        </Link>
                    </div>
                )} */}
            </main>
        </div>
    );
};

export default LandingPage;
