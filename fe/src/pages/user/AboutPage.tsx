import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
    return (
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center px-4 py-16"
            style={{
                backgroundImage: "url('/gambar_pantai.jpg')", // Pastikan file ada di /public/
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
