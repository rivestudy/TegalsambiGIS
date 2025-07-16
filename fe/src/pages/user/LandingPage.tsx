import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import axios from "../../utils/axiosInstance";

interface Item {
    id: number;
    name: string;
    description: string;
    images: string[];
}

const LandingPage: React.FC = () => {
    const [attractions, setAttractions] = useState<Item[]>([]);
    const [accommodations, setAccommodations] = useState<Item[]>([]);
    const [facilities, setFacilities] = useState<Item[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [attractionRes, accommodationRes, facilityRes] = await Promise.all([axios.get("/data/attraction"), axios.get("/data/accommodation"), axios.get("/data/facility")]);

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
        duration: 1.8,
        bounce: 0.6,
        type: "spring",
    };

    const sanitizeItems = (items: any[]): Item[] =>
        items.map((item) => ({
            ...item,
            images: Array.isArray(item.images) ? item.images : [],
        }));

    return (
        <div className="overflow-x-hidden font-sans text-gray-800">
            {/* Hero */}
            <section className="relative flex items-center justify-center min-h-screen text-center text-white bg-fixed bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/pantaitegalsambi2.webp')" }}>
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative z-10">
                    <motion.h1 className="mb-6 text-5xl font-extrabold md:text-6xl drop-shadow-lg" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ ...animationConfig, delay: 0.5 }}>
                        TEGALSAMBI
                    </motion.h1>
                </div>
            </section>

            {/* Tentang */}
            <section id="tentang" className="px-6 py-16 bg-white">
                <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig }} viewport={{ once: true, amount: 1.0 }}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Tentang Tegalsambi
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                        Desa Wisata Tegalsambi, yang terletak di pesisir utara Kabupaten Jepara dan diresmikan melalui SK Bupati No. 556/329 Tahun 2020, menawarkan keindahan alam seperti Pantai Pasir Putih dan hamparan sawah hijau, serta
                        kekayaan budaya seperti Upacara Tradisional Perang Obor. Masyarakatnya dikenal kreatif dalam seni ukir, produksi meubel, dan kerajinan dari limbah kayu. Beragam paket wisata alam, budaya, dan edukatif tersedia untuk
                        memberikan pengalaman yang berkesan bagi para pengunjung.
                    </p>
                </motion.div>
            </section>

            {/* Wisata Lokal */}
            <section id="wisata" className="px-6 pb-20 bg-gray-50">
                <motion.div className="max-w-6xl mx-auto mb-8" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ ...animationConfig }} viewport={{ once: true, amount: 1.0 }}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Wisata Lokal Tegalsambi
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">Temukan tempat menarik dan destinasi terbaik di sekitar Desa Tegalsambi.</p>
                </motion.div>

                <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
                    {attractions.slice(0, 3).map(({ id, name, images }, idx) => (
                        <motion.div key={id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig, delay: idx * 0.3 }} viewport={{ once: true, amount: 0.8 }}>
                            <Link to={`/attraction/${id}`} className="block">
                                <article className="overflow-hidden transition transform border border-gray-200 shadow-md rounded-xl hover:scale-105 hover:shadow-xl bg-blue-300/20">
                                    <img src={images.length > 0 ? images[0] : fallbackImage} alt={name} className="object-cover w-full h-48" />
                                    <div className="p-4">
                                        <p className="text-[10px] uppercase tracking-widest text-purple-600 font-medium">Wisata</p>
                                        <h3 className="mb-2 text-xl font-semibold text-gray-800">{name}</h3>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {attractions.length > 3 && (
                    <motion.div className="flex justify-center pt-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig, delay: 0.3 }} viewport={{ once: true, amount: 0.8 }}>
                        <Link to="/attractions" className="flex items-center gap-2 px-6 py-2 text-gray-700 transition bg-gray-200 rounded-full hover:bg-gray-300">
                            Lihat Selengkapnya
                        </Link>
                    </motion.div>
                )}
            </section>

            {/* Penginapan */}
            <section id="penginapan" className="px-6 pb-20 bg-white">
                <motion.div className="max-w-6xl mx-auto mb-8" initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ ...animationConfig }} viewport={{ once: true, amount: 1.0 }}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Penginapan & Akomodasi
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">Pilihan akomodasi dan penginapan terbaik untuk kenyamanan Anda selama berkunjung.</p>
                </motion.div>

                <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
                    {accommodations.slice(0, 3).map(({ id, name, images }, idx) => (
                        <motion.div key={id} initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ ...animationConfig, delay: idx * 0.3 }} viewport={{ once: true, amount: 0.8 }}>
                            <Link to={`/accommodation/${id}`} className="block">
                                <article className="overflow-hidden transition transform bg-orange-300/20 border border-gray-200 shadow-md rounded-xl hover:scale-105 hover:shadow-xl">
                                    <img src={images.length > 0 ? images[0] : fallbackImage} alt={name} className="object-cover w-full h-48" />
                                    <div className="p-4">
                                        <p className="text-[10px] uppercase tracking-widest text-teal-600 font-medium">Akomodasi</p>
                                        <h3 className="mb-2 text-xl font-semibold text-gray-800">{name}</h3>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {accommodations.length > 3 && (
                    <motion.div className="flex justify-center pt-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig, delay: 0.3 }} viewport={{ once: true, amount: 0.8 }}>
                        <Link to="/accommodations" className="flex items-center gap-2 px-6 py-2 text-gray-700 transition bg-gray-200 rounded-full hover:bg-gray-300">
                            Lihat Selengkapnya
                        </Link>
                    </motion.div>
                )}
            </section>

            {/* Fasilitas Umum */}
            <section id="fasilitas" className="px-6 pb-20 bg-gray-50">
                <motion.div className="max-w-6xl mx-auto mb-8" initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig }} viewport={{ once: true, amount: 1.0 }}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Fasilitas Umum
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">Sarana dan prasarana publik yang tersedia untuk mendukung aktivitas di Desa Tegalsambi.</p>
                </motion.div>

                <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
                    {facilities.slice(0, 3).map(({ id, name, images }, idx) => (
                        <motion.div key={id} initial={{ opacity: 0, y: -60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig, delay: idx * 0.3 }} viewport={{ once: true, amount: 0.8 }}>
                            <Link to={`/facility/${id}`} className="block">
                                <article className="overflow-hidden transition transform bg-green-300/20 border border-gray-200 shadow-md rounded-xl hover:scale-105 hover:shadow-xl">
                                    <img src={images.length > 0 ? images[0] : fallbackImage} alt={name} className="object-cover w-full h-48" />
                                    <div className="p-4">
                                        <p className="text-[10px] uppercase tracking-widest text-blue-600 font-medium">Fasilitas</p>
                                        <h3 className="mb-2 text-xl font-semibold text-gray-800">{name}</h3>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {facilities.length > 3 && (
                    <motion.div className="flex justify-center pt-8" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig }} viewport={{ once: true, amount: 0.8 }}>
                        <Link to="/facilities" className="flex items-center gap-2 px-6 py-2 text-gray-700 transition bg-gray-200 rounded-full hover:bg-gray-300">
                            Lihat Selengkapnya
                        </Link>
                    </motion.div>
                )}
            </section>

            {/* Error Handling */}
            {error && (
                <div className="py-10 text-center text-red-500 bg-red-100">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
