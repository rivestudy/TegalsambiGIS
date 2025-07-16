import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import axios from "../../../utils/axiosInstance";
import HeroSection from "../../../components/HeroSection";
import { Link } from "react-router-dom";

interface Facility {
    id: number;
    name: string;
    description: string;
    images: string[];
}

interface Accommodation {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
}

const formatPrice = (price?: number): string => (price === 0 ? "Harga bervariasi" : `Mulai dari Rp ${price?.toLocaleString("id-ID")} /malam`);

const animationConfig: Transition = {
    type: "spring",
    duration: 1.8,
    bounce: 0.6,
};

const fallbackImage = "https://placehold.co/800x600/e2e8f0/4a5568?text=Gambar+Tidak+Tersedia";

const PublicServicesPage = () => {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [facilitiesRes, accommodationsRes] = await Promise.all([axios.get<Facility[]>("/data/facility"), axios.get<Accommodation[]>("/data/accommodation")]);
                setFacilities(facilitiesRes.data);
                setAccommodations(accommodationsRes.data);
            } catch {
                setError("Tidak dapat memuat data fasilitas dan penginapan.");
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);

    if (loading) return <div className="flex items-center justify-center h-screen">Memuat data fasilitas...</div>;

    if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

    return (
        <div className="bg-white">
            <HeroSection title="Fasilitas" breadcrumb="Fasilitas" bgImage="/pantaitegalsambi2.webp" placeholder="Cari fasilitas atau penginapan" />

            {/* Section: Fasilitas */}
            <section id="fasilitas" className="px-6 py-16 bg-gray-50">
                <motion.div className="max-w-6xl mx-auto mb-8" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ ...animationConfig }} viewport={{ once: true, amount: 1.0 }}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-green-300 to-green-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Sarana & Prasarana Publik
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">Temukan berbagai fasilitas publik yang tersedia untuk menunjang aktivitas Anda di Tegalsambi.</p>
                </motion.div>

                <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
                    {facilities.slice(0, 3).map(({ id, name, images }, idx) => (
                        <motion.div key={id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig, delay: idx * 0.3 }} viewport={{ once: true, amount: 0.8 }}>
                            <Link to={`/facility/${id}`} className="block">
                                <article className="overflow-hidden transition transform border border-gray-200 shadow-md rounded-xl hover:scale-105 hover:shadow-xl bg-green-100/40">
                                    <img src={images.length > 0 ? images[0] : fallbackImage} alt={name} className="object-cover w-full h-48" />
                                    <div className="p-4">
                                        <p className="text-[10px] uppercase tracking-widest text-green-600 font-medium">Fasilitas</p>
                                        <h3 className="mb-2 text-xl font-semibold text-gray-800">{name}</h3>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Section: Akomodasi */}
            <section id="akomodasi" className="px-6 pb-20 bg-white">
                <motion.div className="max-w-6xl mx-auto mb-8" initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} transition={{ ...animationConfig }} viewport={{ once: true, amount: 1.0 }}>
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Penginapan & Akomodasi
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">Dari hotel mewah hingga guesthouse nyaman, temukan akomodasi terbaik di Tegalsambi.</p>
                </motion.div>

                <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
                    {accommodations.slice(0, 3).map(({ id, name, images, price }, idx) => (
                        <motion.div key={id} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig, delay: idx * 0.3 }} viewport={{ once: true, amount: 0.8 }}>
                            <Link to={`/accommodation/${id}`} className="block">
                                <article className="overflow-hidden transition transform border border-gray-200 shadow-md rounded-xl hover:scale-105 hover:shadow-xl bg-orange-100/40">
                                    <img src={images.length > 0 ? images[0] : fallbackImage} alt={name} className="object-cover w-full h-48" />
                                    <div className="p-4">
                                        <p className="text-[10px] uppercase tracking-widest text-orange-600 font-medium">Akomodasi</p>
                                        <h3 className="mb-1 text-xl font-semibold text-gray-800">{name}</h3>
                                        <p className="text-sm text-orange-700">{formatPrice(price)}</p>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PublicServicesPage;
