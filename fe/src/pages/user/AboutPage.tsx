import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-16"
            style={{
                backgroundImage: "url('/pantaitegalsambi2.webp')",
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
            <motion.div
                className="max-w-3xl w-full bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-xl p-10 text-center text-white"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                {/* Breadcrumb */}
                <nav className="py-2">
                    <ol className="flex justify-center items-center font-semibold text-lg space-x-2 text-sm text-white">
                        <li>
                            <Link to="/" className="flex items-center hover:text-orange-400 transition duration-300">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
                                </svg>
                                Landing Page
                            </Link>
                        </li>
                        <li className="text-gray-400 font-semibold">/</li>
                        <li className="text-orange-300 font-bold">Tentang Kami</li>
                    </ol>
                </nav>
                <h1 className="text-4xl font-extrabold mb-4 relative inline-block">
                    Tentang Kami
                    <span className="block w-20 h-1 bg-orange-400 mx-auto mt-2 rounded-full"></span>
                </h1>
                <p className="text-white/90 text-lg leading-relaxed">
                    Selamat datang di <span className="font-semibold text-yellow-300">Desa Tegalsambi</span>. Kami berkomitmen untuk memperkenalkan keindahan alam, kekayaan budaya, serta potensi lokal desa kami kepada dunia. Melalui website
                    ini, Anda dapat menjelajahi beragam destinasi wisata, kuliner khas, hingga informasi geografis dan kegiatan desa kami yang penuh warna.
                </p>
            </motion.div>
        </div>
    );
};

export default AboutPage;
