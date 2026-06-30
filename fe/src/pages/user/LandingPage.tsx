import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import axios from "../../utils/axiosInstance";
import { FaChevronDown, FaMapMarkerAlt, FaBed, FaTree, FaArrowRight } from "react-icons/fa";

interface Item {
    id: number;
    name: string;
    description: string;
    images: string[];
}
const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

const LandingPage: React.FC = () => {
    const [attractions, setAttractions] = useState<Item[]>([]);
    const [accommodations, setAccommodations] = useState<Item[]>([]);
    const [facilities, setFacilities] = useState<Item[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [attractionRes, accommodationRes, facilityRes] = await Promise.all([
                    axios.get("/data/attraction"), 
                    axios.get("/data/accommodation"), 
                    axios.get("/data/facility")
                ]);

                setAttractions(sanitizeItems(attractionRes.data ?? []));
                setAccommodations(sanitizeItems(accommodationRes.data ?? []));
                setFacilities(sanitizeItems(facilityRes.data ?? []));
            } catch (err: any) {
                console.error(err);
                setError("Gagal memuat data. Silakan coba lagi nanti.");
            } 
        };

        fetchData();
    }, []);

    const fallbackImage = "https://placehold.co/800x600/e2e8f0/4a5568?text=Gambar+Tidak+Tersedia";

    const animationConfig: Transition = {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Custom smooth easing
    };

    const sanitizeItems = (items: any[]): Item[] =>
        items.map((item) => ({
            ...item,
            images: Array.isArray(item.images)
                ? item.images.map((img: any) =>
                      typeof img?.dir === "string" ? img.dir : ""
                  ).filter(Boolean)
                : [],
        }));

    const scrollToAbout = () => {
        document.getElementById("tentang")?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="relative overflow-x-hidden font-sans text-gray-800 dark:text-gray-100 bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
            {/* Decorative Background Blobs */}
            <div className="absolute top-[75vh] -left-10 w-[30rem] h-[30rem] bg-orange-300 dark:bg-orange-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[100px] opacity-40 animate-blob z-0 pointer-events-none"></div>
            <div className="absolute top-[65vh] -right-10 w-[30rem] h-[30rem] bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply dark:mix-blend-lighten filter blur-[100px] opacity-40 animate-blob animation-delay-2000 z-0 pointer-events-none"></div>
            {/* --- Hero Section --- */}
            <section className="relative flex flex-col items-center justify-center min-h-screen text-center text-white">
                {/* Masked Background Image Layer */}
                <div 
                    className="absolute inset-0 bg-fixed bg-center bg-no-repeat bg-cover z-0" 
                    style={{ 
                        backgroundImage: "url('/pantaitegalsambi2.webp')",
                        maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                        WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)"
                    }}
                >
                    {/* Darkening overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>
                </div>
                
                <div className="relative z-10 px-4 mt-20 w-full">
                    <motion.h1 
                        className="mb-4 text-6xl font-extrabold tracking-tight md:text-8xl text-white"
                        style={{ textShadow: "0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.8)" }}
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ ...animationConfig, delay: 0.2 }}
                    >
                        TEGALSAMBI
                    </motion.h1>
                    <motion.p 
                        className="max-w-2xl mx-auto mb-10 text-lg font-medium text-gray-100 md:text-2xl"
                        style={{ textShadow: "0 2px 6px rgba(0,0,0,0.8)" }}
                        initial={{ opacity: 0, y: 30 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        transition={{ ...animationConfig, delay: 0.4 }}
                    >
                        Jelajahi Pesona Alam, Budaya, dan Kriya Pesisir Jepara
                    </motion.p>
                    
                    <motion.button 
                        onClick={scrollToAbout}
                        className="flex items-center gap-2 px-8 py-4 mx-auto font-semibold text-gray-900 dark:text-white transition-all duration-300 bg-white/90 dark:bg-slate-900/80 backdrop-blur-md rounded-full hover:bg-white dark:hover:bg-slate-800 hover:scale-105 hover:shadow-xl shadow-lg ring-4 ring-white/20 dark:ring-white/10"
                        initial={{ opacity: 0, scale: 0.9 }} 
                        animate={{ opacity: 1, scale: 1 }} 
                        transition={{ ...animationConfig, delay: 0.6 }}
                    >
                        Mulai Jelajah <FaChevronDown className="animate-bounce mt-1" />
                    </motion.button>
                </div>
            </section>

            {/* --- Tentang Section --- */}
            <section id="tentang" className="relative px-6 py-24 z-10 transition-colors duration-500">
                <motion.div 
                    className="relative max-w-5xl mx-auto p-10 md:p-14 bg-white/70 dark:bg-slate-800/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 dark:border-slate-700/50" 
                    initial={{ opacity: 0, y: 40 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    transition={animationConfig} 
                    viewport={{ once: true, amount: 0.3 }}
                >
                    <div className="text-center mb-8">
                        <span className="text-sm font-bold tracking-widest text-orange-500 dark:text-orange-400 uppercase">Selamat Datang</span>
                        <h2 className="mt-2 text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                            Desa Wisata Tegalsambi
                        </h2>
                        <div className="w-24 h-1.5 mx-auto mt-6 bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"></div>
                    </div>
                    <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300 md:text-xl text-center">
                        Terletak di pesisir utara Kabupaten Jepara, Tegalsambi menawarkan keindahan alam seperti Pantai Pasir Putih dan hamparan sawah hijau. Dikenal dengan kekayaan budaya <strong>Perang Obor</strong> serta kearifan lokal kerajinan kriya, desa ini menjanjikan pengalaman wisata alam, budaya, dan edukasi yang tak terlupakan.
                    </p>
                </motion.div>
            </section>

            {/* --- Wisata Lokal --- */}
            <section id="wisata" className="px-6 py-20 bg-white dark:bg-slate-950 transition-colors duration-500">
                <motion.div className="max-w-7xl mx-auto mb-12 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={animationConfig} viewport={{ once: true, amount: 0.8 }}>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Destinasi Wisata</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Eksplorasi keindahan alam dan budaya lokal kami.</p>
                </motion.div>

                <div className="grid max-w-7xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
                    {attractions.slice(0, 3).map(({ id, name, images }, idx) => (
                        <motion.div key={id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig, delay: idx * 0.15 }} viewport={{ once: true, amount: 0.3 }}>
                            <Link to={`/attraction/${id}`} className="block group h-full">
                                <article className="relative overflow-hidden h-full min-h-[320px] bg-white dark:bg-slate-900 rounded-3xl shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl border border-gray-100 dark:border-slate-800">
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img src={images.length > 0 ? `${IMAGE_BASE_URL}/${images[0]}` : fallbackImage} alt={name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    
                                    <div className="absolute bottom-0 w-full p-6 transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-bold text-white uppercase tracking-wider bg-orange-500/90 backdrop-blur-sm rounded-full">
                                            <FaTree /> Wisata
                                        </span>
                                        <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-md">{name}</h3>
                                        <div className="flex items-center text-orange-300 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                                            Lihat Detail <FaArrowRight className="ml-2" />
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {attractions.length > 3 && (
                    <motion.div className="flex justify-center pt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={animationConfig} viewport={{ once: true }}>
                        <Link to="/attractions" className="px-8 py-3 font-semibold text-gray-900 dark:text-white transition bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-full hover:border-gray-900 dark:hover:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-700">
                            Lihat Semua Wisata
                        </Link>
                    </motion.div>
                )}
            </section>

            {/* --- Penginapan --- */}
            <section id="penginapan" className="px-6 py-20 bg-gray-50 dark:bg-slate-900 transition-colors duration-500">
                <motion.div className="max-w-7xl mx-auto mb-12 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={animationConfig} viewport={{ once: true, amount: 0.8 }}>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Akomodasi Nyaman</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Pilihan tempat menginap terbaik untuk istirahat Anda.</p>
                </motion.div>

                <div className="grid max-w-7xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
                    {accommodations.slice(0, 3).map(({ id, name, images }, idx) => (
                        <motion.div key={id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig, delay: idx * 0.15 }} viewport={{ once: true, amount: 0.3 }}>
                            <Link to={`/accommodation/${id}`} className="block group h-full">
                                <article className="relative overflow-hidden h-full min-h-[320px] bg-white dark:bg-slate-900 rounded-3xl shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl border border-gray-100 dark:border-slate-800">
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img src={images.length > 0 ? `${IMAGE_BASE_URL}/${images[0]}` : fallbackImage} alt={name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    {/* Glassmorphism content block at the bottom */}
                                    <div className="absolute bottom-0 w-full p-5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-lg border-t border-white/40 dark:border-slate-700/50 transform transition-transform duration-300">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 text-xs font-bold text-teal-700 dark:text-teal-300 uppercase tracking-wider bg-teal-100 dark:bg-teal-900/50 rounded-full">
                                                    <FaBed /> Penginapan
                                                </span>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
                                            </div>
                                            <div className="flex items-center justify-center w-10 h-10 mt-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-500 dark:text-gray-400 group-hover:bg-teal-500 group-hover:text-white transition-colors">
                                                <FaArrowRight />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {accommodations.length > 3 && (
                    <motion.div className="flex justify-center pt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={animationConfig} viewport={{ once: true }}>
                        <Link to="/accommodations" className="px-8 py-3 font-semibold text-gray-900 dark:text-white transition bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-full hover:border-gray-900 dark:hover:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-700">
                            Semua Penginapan
                        </Link>
                    </motion.div>
                )}
            </section>

            {/* --- Fasilitas Umum --- */}
            <section id="fasilitas" className="px-6 py-20 bg-white dark:bg-slate-950 transition-colors duration-500">
                <motion.div className="max-w-7xl mx-auto mb-12 text-center" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={animationConfig} viewport={{ once: true, amount: 0.8 }}>
                    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4">Fasilitas Publik</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-lg">Sarana penunjang kenyamanan aktivitas Anda di desa.</p>
                </motion.div>

                <div className="grid max-w-7xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-3">
                    {facilities.slice(0, 3).map(({ id, name, images }, idx) => (
                        <motion.div key={id} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig, delay: idx * 0.15 }} viewport={{ once: true, amount: 0.3 }}>
                            <Link to={`/facility/${id}`} className="block group h-full">
                                <article className="relative overflow-hidden h-full min-h-[320px] bg-white dark:bg-slate-900 rounded-3xl shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl border border-gray-100 dark:border-slate-800">
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img src={images.length > 0 ? `${IMAGE_BASE_URL}/${images[0]}` : fallbackImage} alt={name} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                                    </div>
                                    <div className="absolute bottom-0 w-full p-5 bg-white/85 dark:bg-slate-900/85 backdrop-blur-lg border-t border-white/40 dark:border-slate-700/50">
                                        <div className="flex items-start justify-between">
                                            <div>
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 mb-2 text-xs font-bold text-blue-700 dark:text-blue-300 uppercase tracking-wider bg-blue-100 dark:bg-blue-900/50 rounded-full">
                                                    <FaMapMarkerAlt /> Fasilitas
                                                </span>
                                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{name}</h3>
                                            </div>
                                            <div className="flex items-center justify-center w-10 h-10 mt-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-500 dark:text-gray-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                                <FaArrowRight />
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {facilities.length > 3 && (
                    <motion.div className="flex justify-center pt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={animationConfig} viewport={{ once: true }}>
                        <Link to="/facilities" className="px-8 py-3 font-semibold text-gray-900 dark:text-white transition bg-white dark:bg-slate-800 border-2 border-gray-200 dark:border-slate-700 rounded-full hover:border-gray-900 dark:hover:border-slate-500 hover:bg-gray-50 dark:hover:bg-slate-700">
                            Semua Fasilitas
                        </Link>
                    </motion.div>
                )}
            </section>

            {/* Error Handling */}
            {error && (
                <div className="fixed bottom-4 right-4 z-50 p-4 bg-red-100 border-l-4 border-red-500 rounded shadow-lg text-red-700">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
