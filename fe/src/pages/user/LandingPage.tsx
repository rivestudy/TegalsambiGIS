// src/pages/LandingPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const isAuthenticated = (): boolean => {
    return localStorage.getItem("token") !== null;
};

const LandingPage: React.FC = () => {
    const isAdminLoggedIn = isAuthenticated();
    const villageName = "Tegalsambi";

    return (
        <div className="font-sans text-gray-800 overflow-x-hidden">
            {/* Hero Section */}
            <section
                className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed flex items-center justify-center text-white text-center relative"
                style={{
                    backgroundImage: "url('/gambar_pantai.jpg')",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-30"></div>

                {/* Content */}
                <div className="relative z-10">
                    <motion.h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-6" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        TEGALSAMBI
                    </motion.h1>

                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.8 }}>
                        <Link to="#tentang" className="inline-block bg-white text-black font-semibold text-lg px-6 py-2 rounded-full shadow-md hover:bg-gray-200 transition">
                            Get Started !!
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* SECTION: TENTANG */}
            <section id="tentang" className="bg-white px-6 py-16">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Tentang Tegalsambi</h2>
                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                        id est laborum.
                    </p>
                </div>
            </section>

            {/* SECTION: WISATA LOKAL TEGALSAMBI */}
            <section id="wisata" className="bg-white px-6 pb-20">
                <div className="max-w-6xl mx-auto">
                    {/* Judul + deskripsi singkat */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Wisata lokal Tegalsambi</h2>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Grid kartu wisata */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                id: 1,
                                title: "To Explore nature",
                                img: "/images/wisata-1.jpg",
                                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            },
                            {
                                id: 2,
                                title: "To Explore nature",
                                img: "/images/wisata-2.jpg",
                                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            },
                            {
                                id: 3,
                                title: "To Explore nature",
                                img: "/images/wisata-3.jpg",
                                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            },
                        ].map(({ id, title, img, desc }, index) => (
                            <Link to={`/detail-wisata/${id}`} key={id} className="block">
                                <article className={` border border-gray-200 rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl`}>
                                    {/* Gambar */}
                                    <img src={img} alt={title} className="w-full h-48 object-cover" />

                                    {/* Konten */}
                                    <div className="p-4">
                                        <p className="text-[10px] uppercase tracking-widest text-purple-500 font-medium">For those who love</p>
                                        <h3 className="font-semibold text-xl text-gray-800 mb-2">{title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION: KULINER */}
            <section id="kuliner" className="bg-white px-6 pb-20">
                <div className="max-w-6xl mx-auto">
                    {/* Judul + deskripsi singkat */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800">Penginapan Desa Tegalsambi</h2>
                                <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur, sunt in culpa qui officia deserunt mollit anim id est laborum.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Grid kartu wisata */}
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {[
                            {
                                id: 1,
                                title: "Penginapan A",
                                img: "/images/wisata-1.jpg",
                                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            },
                            {
                                id: 2,
                                title: "Penginapan B",
                                img: "/images/wisata-2.jpg",
                                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            },
                            {
                                id: 3,
                                title: "Penginapan C",
                                img: "/images/wisata-3.jpg",
                                desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            },
                        ].map(({ id, title, img, desc }, index) => (
                            <Link to={`/detail-penginapan/${id}`} key={id} className="block">
                                <article className={` border border-gray-200 rounded-xl shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl`}>
                                    {/* Gambar */}
                                    <img src={img} alt={title} className="w-full h-48 object-cover" />

                                    {/* Konten */}
                                    <div className="p-4">
                                        <p className="text-[10px] uppercase tracking-widest text-purple-500 font-medium">Range Harga</p>
                                        <h3 className="font-semibold text-xl text-gray-800 mb-2">{title}</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                                    </div>
                                </article>
                            </Link>
                        ))}
                    </div>
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
