// src/pages/AttractionPage.tsx
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import axios from "../../../utils/axiosInstance";

interface Attraction {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
}

const formatPrice = (price: number): string => (price === 0 ? "Gratis" : `Rp ${price.toLocaleString("id-ID")} /pax`);
const fallbackImage = "https://placehold.co/800x600/e2e8f0/4a5568?text=Gambar+Tidak+Tersedia";

const getBounceAnimation = (direction: "top" | "right" | "left" | "bottom") => {
    const variants = {
        top: { initial: { opacity: 0, y: -60 }, whileInView: { opacity: 1, y: 0 } },
        right: { initial: { opacity: 0, x: 60 }, whileInView: { opacity: 1, x: 0 } },
        left: { initial: { opacity: 0, x: -60 }, whileInView: { opacity: 1, x: 0 } },
        bottom: { initial: { opacity: 0, y: 60 }, whileInView: { opacity: 1, y: 0 } },
    };
    return variants[direction];
};

const animationConfig: Transition = {
    type: "spring",
    bounce: 0.7,
    duration: 1.9,
};

const SectionContainer = ({ title, description, data, color, priceColor, direction }: { title: string; description: string; data: Attraction[]; color: string; priceColor: string; direction: "top" | "right" | "left" | "bottom" }) => {
    if (!data.length) return null;

    const anim = getBounceAnimation(direction);

    return (
        <motion.div className="max-w-screen-xl px-4 pt-10 pb-10 mx-auto" initial={anim.initial} whileInView={anim.whileInView} transition={animationConfig} viewport={{ once: true, amount: 0.2 }}>
            <h2 className="text-2xl font-bold text-gray-800 mb-1 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">{title}</h2>
            <p className="mb-4 text-gray-600">{description}</p>
            <p className="flex items-center gap-1 mb-2 text-sm italic text-gray-500">
                Geser untuk melihat destinasi lainnya <span className="animate-bounce">👉</span>
            </p>
            <Swiper
                spaceBetween={20}
                slidesPerView={1}
                breakpoints={{
                    640: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {data.map((item, idx) => (
                    <SwiperSlide key={item.id}>
                        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ ...animationConfig, delay: idx * 0.2 }} viewport={{ once: true, amount: 0.4 }}>
                            <Link to={item.category === "Paket" ? `/paket/${item.id}` : `/attraction/${item.id}`}>
                                <div className={`${color} mt-4 mb-4 shadow-md rounded-2xl overflow-hidden flex flex-col h-[350px] transition duration-300 hover:shadow-lg hover:-translate-y-2`}>
                                    <img src={item.images?.[0] || fallbackImage} alt={item.name} className="object-cover w-full h-48" />
                                    <div className="flex flex-col justify-between flex-grow p-5">
                                        <div>
                                            <h3 className="mb-1 text-lg font-bold">{item.name}</h3>
                                            <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                                        </div>
                                        <p className={`text-sm font-medium ${priceColor}`}>{formatPrice(item.price)}</p>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    );
};

const AttractionPage = () => {
    const [data, setData] = useState<Attraction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const dummyTourPackages: Attraction[] = [
        {
            id: 9991,
            name: "Paket A - Jelajah Budaya",
            description: "Rasakan pengalaman budaya Tegalsambi.",
            price: 50000,
            images: ["/paketA.jpg"],
            category: "Paket",
        },
        {
            id: 9992,
            name: "Paket B - Eksplor Tradisi",
            description: "Kenali tradisi lokal dengan kunjungan budaya.",
            price: 100000,
            images: ["/paketB.jpg"],
            category: "Paket",
        },
        {
            id: 9993,
            name: "Paket C - Experience Lengkap",
            description: "Jelajahi Tegalsambi dari budaya hingga alam.",
            price: 150000,
            images: ["/paketC.jpg"],
            category: "Paket",
        },
    ];

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                const response = await axios.get<Attraction[]>("/data/attraction");
                setData(response.data);
            } catch {
                setError("Tidak dapat memuat data wisata. Silakan coba lagi nanti.");
            } finally {
                setLoading(false);
            }
        };
        fetchAttractions();
    }, []);

    if (loading) return <div className="flex items-center justify-center h-screen">Memuat data wisata...</div>;
    if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

    const filterByCategory = (cats: string[]) => data.filter((item) => cats.includes(item.category));

    return (
        <div className="bg-white">
            <div className="relative h-[480px] bg-cover bg-center" style={{ backgroundImage: "url('/pantaitegalsambi2.webp')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                    <nav className="py-2">
                        <ol className="flex items-center space-x-2 text-sm font-semibold text-white">
                            <li>
                                <Link to="/" className="flex items-center hover:text-orange-400">
                                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
                                    </svg>
                                    Landing Page
                                </Link>
                            </li>
                            <li className="text-gray-400">/</li>
                            <li className="text-orange-300">Wisata Tegalsambi</li>
                        </ol>
                    </nav>
                    <h1 className="mb-6 text-4xl font-bold md:text-6xl drop-shadow-lg">Wisata Tegalsambi</h1>
                    <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
                        <div className="relative">
                            <input type="text" placeholder="Cari Wisata" className="w-full py-2 pl-10 pr-4 text-gray-500 border border-gray-300 rounded-full shadow-lg" />
                            <span className="absolute left-3 top-2.5 text-gray-400">
                                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0Z" />
                                </svg>
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            <SectionContainer
                title="Paket Wisata"
                description="Nikmati berbagai paket wisata dengan layanan lengkap dan pengalaman terbaik menjelajahi Tegalsambi."
                data={dummyTourPackages}
                color="bg-yellow-100"
                priceColor="text-yellow-600"
                direction="top"
            />

            <SectionContainer
                title="Wisata Religi & Sejarah"
                description="Jelajahi situs-situs suci dan tempat bersejarah yang kaya akan cerita dan nilai spiritual di Tegalsambi."
                data={filterByCategory(["Religi", "Sejarah"])}
                color="bg-blue-100"
                priceColor="text-blue-600"
                direction="right"
            />

            <SectionContainer
                title="Wisata Budaya & Workshop"
                description="Rasakan pengalaman budaya lokal yang otentik melalui berbagai kegiatan dan workshop interaktif."
                data={filterByCategory(["Budaya"])}
                color="bg-orange-100"
                priceColor="text-orange-600"
                direction="left"
            />

            <SectionContainer
                title="Wisata Pesisir"
                description="Nikmati keindahan pantai, angin laut, dan berbagai aktivitas air yang menyegarkan di pesisir Tegalsambi."
                data={filterByCategory(["Pesisir"])}
                color="bg-teal-100"
                priceColor="text-teal-600"
                direction="bottom"
            />
        </div>
    );
};

export default AttractionPage;
