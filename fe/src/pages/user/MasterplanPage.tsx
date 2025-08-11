import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation";

const bounceVariant = (direction: "top" | "bottom" | "left" | "right") => {
    switch (direction) {
        case "top":
            return { initial: { opacity: 0, y: -60 }, animate: { opacity: 1, y: 0 } };
        case "bottom":
            return { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } };
        case "left":
            return { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 } };
        case "right":
            return { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 } };
    }
};

const animationConfig: Transition = {
    type: "spring",
    bounce: 0.6,
    duration: 2.5,
};

const Masterplan: React.FC = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);

        return () => clearTimeout(timer);
    }, []);
    if (loading) return <LoadingAnimation />;

    return (
        <div className="min-h-screen px-4 py-12 pt-20 bg-gradient-to-r from-emerald-700 to-cyan-500">
            {/* Breadcrumb dan Judul */}
            <motion.div className="py-6 text-center" initial={bounceVariant("top").initial} animate={bounceVariant("top").animate} transition={animationConfig}>
                <nav className="mb-2">
                    <ol className="flex items-center justify-center space-x-2 text-sm font-semibold text-white">
                        <li>
                            <Link to="/" className="flex items-center transition duration-300 hover:text-orange-500">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
                                </svg>
                                Landing Page
                            </Link>
                        </li>
                        <li className="font-semibold text-gray-400">/</li>
                        <li className="font-bold text-orange-300">Masterplan Desa Wisata</li>
                    </ol>
                </nav>

                <h1 className="mb-3 text-4xl font-extrabold text-white">Masterplan Desa Wisata Tegalsambi</h1>
                <span className="block w-24 h-1 mx-auto mt-2 bg-orange-500 rounded-full"></span>

                <motion.p className="px-2 mx-auto mt-4 text-base font-medium leading-relaxed text-white max-w-7xl" initial={bounceVariant("left").initial} animate={bounceVariant("left").animate} transition={animationConfig}>
                    Desa Tegalsambi dikembangkan sebagai desa wisata yang mencakup tiga kategori utama: wisata budaya, wisata religi, dan wisata pesisir. Masterplan ini menjadi panduan pembangunan kawasan wisata yang berkelanjutan dengan
                    mempertimbangkan potensi lokal, kenyamanan pengunjung, serta pelestarian lingkungan dan budaya.
                </motion.p>
            </motion.div>

            {/* Gambar / Peta Masterplan */}
            <motion.div className="mx-auto max-w-7xl" initial={bounceVariant("bottom").initial} animate={bounceVariant("bottom").animate} transition={animationConfig}>
                <motion.h3 className="mb-4 text-xl font-semibold text-center text-white" initial={bounceVariant("right").initial} animate={bounceVariant("right").animate} transition={animationConfig}>
                    Gambaran Master Plan Desa Wisata Tegalsambi
                </motion.h3>

                <div className="w-full h-[400px] rounded-xl overflow-hidden border border-gray-300 shadow-lg">
                    <iframe
                        title="Master Plan Tegalsambi"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3956.2185929864593!2d110.65165!3d-6.61598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7124e318a3b30f%3A0x98f67c738c01625f!2sTegalsambi%2C%20Tahunan%2C%20Kabupaten%20Jepara%2C%20Jawa%20Tengah!5e0!3m2!1sid!2sid!4v1721033200000!5m2!1sid!2sid"
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </motion.div>

            <motion.div>
                {/* Download Buttons */}
                <div className="container grid grid-cols-3 gap-8 px-4 mx-auto mt-8">
                    <a
                        href="/files/buku-masterplan.pdf"
                        download
                        className="px-6 py-3 font-semibold text-center text-white transition duration-300 bg-white rounded-lg shadow bg-opacity-5 hover:bg-white hover:bg-opacity-30"
                    >
                        📘 Buku Masterplan
                    </a>
                    <a
                        href="/files/buku-manajemen-pembangunan.pdf"
                        download
                        className="px-6 py-3 font-semibold text-center text-white transition duration-300 bg-white rounded-lg shadow bg-opacity-5 hover:bg-white hover:bg-opacity-30"
                    >
                        📗 Buku Manajemen Pembangunan
                    </a>
                    <a
                        href="/files/buku-bisnis-bumdes.pdf"
                        download
                        className="px-6 py-3 font-semibold text-center text-white transition duration-300 bg-white rounded-lg shadow bg-opacity-5 hover:bg-white hover:bg-opacity-30"
                    >
                        📙 Buku Pengembangan Bisnis BUMDes
                    </a>
                </div>

            </motion.div>
        </div>
    );
};

export default Masterplan;
