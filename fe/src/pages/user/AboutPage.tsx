import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-100 flex items-center justify-center px-4 py-16">
            <motion.div
                className="max-w-3xl bg-white rounded-3xl shadow-2xl p-10 text-center border border-gray-200"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <h1 className="text-4xl font-extrabold text-gray-800 mb-4 relative inline-block">
                    Tentang Kami
                    <span className="block w-20 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></span>
                </h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Selamat datang di <span className="font-semibold text-blue-600">Desa Tegalsambi</span>. Kami berkomitmen untuk memperkenalkan keindahan alam, kekayaan budaya, serta potensi lokal desa kami kepada dunia. Melalui website
                    ini, Anda dapat menjelajahi beragam destinasi wisata, kuliner khas, hingga informasi geografis dan kegiatan desa kami yang penuh warna.
                </p>
            </motion.div>
        </div>
    );
};

export default AboutPage;
