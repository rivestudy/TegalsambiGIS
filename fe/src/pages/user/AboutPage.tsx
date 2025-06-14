import React from "react";
import { motion } from "framer-motion";

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 flex items-center justify-center px-4">
            <motion.div className="max-w-3xl bg-white rounded-2xl shadow-lg p-8 text-center" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                <h1 className="text-3xl font-bold mb-4 text-gray-800">Tentang Kami</h1>
                <p className="text-gray-600 text-lg leading-relaxed">
                    Selamat datang di Desa Tegalsambi. Kami berkomitmen untuk memperkenalkan keindahan alam, budaya, serta potensi desa kami kepada dunia. Melalui website ini, Anda dapat menjelajahi wisata, kuliner, hingga informasi
                    geografis desa kami.
                </p>
            </motion.div>
        </div>
    );
};

export default AboutPage;
