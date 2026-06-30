import React, { useState, useEffect, useMemo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, useLocation } from "react-router-dom"; // ✨ 1. Import useLocation
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import axios from "../../../utils/axiosInstance";
import HeroSection from "../../../components/HeroSection";
import LoadingAnimation from "../../../components/LoadingAnimation";
import heroBg from "../../../assets/pantaitegalsambi2.webp";
import { FaArrowRight, FaMapMarkerAlt, FaBed } from "react-icons/fa";

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

interface Item {
    id: number;
    name: string;
    description: string;
    images: string[];
    price?: number;
    category?: string;
}

const formatPrice = (price?: number): string =>
    price === 0 ? "Harga bervariasi" : `Mulai dari Rp ${price?.toLocaleString("id-ID")} /malam`;

const fallbackImage = "https://placehold.co/800x600/e2e8f0/4a5568?text=Gambar+Tidak+Tersedia";

const sanitizeItems = (items: any[]): Item[] => {
    return items.map((item) => ({
        ...item,
        images: Array.isArray(item.images)
            ? item.images.map((img: any) =>
                  typeof img?.dir === "string" ? `${IMAGE_BASE_URL}/${img.dir}` : ""
              ).filter(Boolean)
            : [],
    }));
};

const useSearch = <T extends { name: string }>(items: T[], searchTerm: string): T[] => {
    return useMemo(() => {
        if (!searchTerm) return items;
        const term = searchTerm.toLowerCase();
        return items.filter(item => item.name.toLowerCase().includes(term));
    }, [items, searchTerm]);
};

const animationConfig: Transition = {
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1], // Custom smooth easing
};

const getBounceAnimation = (direction: "top" | "right" | "left" | "bottom") => {
    const variants = {
        top: { initial: { opacity: 0, y: -60 }, whileInView: { opacity: 1, y: 0 } },
        right: { initial: { opacity: 0, x: 60 }, whileInView: { opacity: 1, x: 0 } },
        left: { initial: { opacity: 0, x: -60 }, whileInView: { opacity: 1, x: 0 } },
        bottom: { initial: { opacity: 0, y: 60 }, whileInView: { opacity: 1, y: 0 } },
    };
    return variants[direction];
};

const SectionContainer = ({
    title,
    description,
    data,
    color,
    priceColor,
    direction,
    searchTerm,
    type,
    id, // ✨ 2. Add id to props
}: {
    title: string;
    description: string;
    data: Item[];
    color: string;
    priceColor: string;
    direction: "top" | "right" | "left" | "bottom";
    searchTerm: string;
    type: "facility" | "accommodation";
    id?: string; // ✨ Make it optional
}) => {
    if (!data.length) return null;

    const anim = getBounceAnimation(direction);

    return (
        <motion.div
            id={id} // ✨ Apply the id here
            className="max-w-screen-xl px-4 pt-10 pb-10 mx-auto scroll-mt-24" // Added scroll-mt for better scroll position
            initial={anim.initial}
            whileInView={anim.whileInView}
            transition={animationConfig}
            viewport={{ once: true, amount: 0.2 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-1 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-green-300 to-green-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                {title}
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
                {searchTerm
                    ? `Menampilkan ${data.length} hasil untuk "${searchTerm}"`
                    : description}
            </p>
            <p className="flex items-center gap-1 mb-2 text-sm italic text-gray-500">
                Geser untuk melihat lebih banyak <span className="animate-bounce">👉</span>
            </p>
            <Swiper
                spaceBetween={20}
                slidesPerView={1.2}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {data.map((item, idx) => (
                    <SwiperSlide key={item.id}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ ...animationConfig, delay: idx * 0.2 }}
                            viewport={{ once: true, amount: 0.4 }}
                        >
                            <Link to={`/${type}/${item.id}`} className="block group h-full py-4">
                                <article className="relative overflow-hidden h-full min-h-[350px] bg-white dark:bg-slate-900 rounded-3xl shadow-lg transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-2xl border border-gray-100 dark:border-slate-800 mx-2">
                                    <div className="absolute inset-0 overflow-hidden">
                                        <img
                                            src={item.images.length > 0 ? item.images[0] : fallbackImage}
                                            alt={item.name}
                                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                                    
                                    <div className="absolute bottom-0 w-full p-6 transition-transform duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 mb-3 text-xs font-bold text-white uppercase tracking-wider ${color.replace('100', '500/90')} backdrop-blur-sm rounded-full`}>
                                            {type === "accommodation" ? <FaBed /> : <FaMapMarkerAlt />} {type === "accommodation" ? "Penginapan" : "Fasilitas"}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">{item.name}</h3>
                                        <p className="text-sm text-gray-200 line-clamp-2 mb-2">{item.description}</p>
                                        
                                        <div className="flex items-center justify-between text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">
                                            {type === "accommodation" ? (
                                                <span className="font-semibold text-yellow-300">{formatPrice(item.price)}</span>
                                            ) : (
                                                <span></span>
                                            )}
                                            <span className="flex items-center">Lihat Detail <FaArrowRight className="ml-2" /></span>
                                        </div>
                                    </div>
                                </article>
                            </Link>
                        </motion.div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </motion.div>
    );
};

const PublicServicePage = () => {
    const [facilities, setFacilities] = useState<Item[]>([]);
    const [accommodations, setAccommodations] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation(); // ✨ 3. Get the location object

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [facRes, accRes] = await Promise.all([
                    axios.get<Item[]>("/data/facility"),
                    axios.get<Item[]>("/data/accommodation")
                ]);
                setFacilities(sanitizeItems(facRes.data));
                setAccommodations(sanitizeItems(accRes.data));
            } catch {
                setError("Gagal memuat data fasilitas dan penginapan.");
            } finally {
                setTimeout(() => setLoading(false), 800);
            }
        };
        fetchData();
    }, []);

    // ✨ 4. Add useEffect to handle scrolling on page load/hash change
    useEffect(() => {
        if (location.hash && !loading) {
            const id = location.hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location.hash, loading]); // This effect runs when the hash or loading state changes

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
    };

    const filteredFacilities = useSearch(facilities, searchTerm);
    const filteredAccommodations = useSearch(accommodations, searchTerm);

    if (loading) return <LoadingAnimation />;
    if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

    return (
        <div className="bg-white dark:bg-slate-950 transition-colors duration-500 min-h-screen">
            <HeroSection
                title="Fasilitas & Akomodasi"
                breadcrumb="Fasilitas"
                bgImage={heroBg}
                placeholder="Cari fasilitas atau penginapan"
                searchValue={searchTerm}
                onSearchChange={handleSearch}
                onClearSearch={clearSearch}
            />

            {/* ✨ 5. Add the 'id' prop to each SectionContainer */}
            <SectionContainer
                id="fasilitas" // Corresponds to the link /facilities#fasilitas
                title="Fasilitas Umum"
                description="Temukan berbagai fasilitas publik yang tersedia untuk menunjang aktivitas Anda di Tegalsambi."
                data={filteredFacilities}
                color="bg-green-100"
                priceColor=""
                direction="left"
                searchTerm={searchTerm}
                type="facility"
            />

            <SectionContainer
                id="penginapan" // Corresponds to the link /facilities#penginapan
                title="Penginapan"
                description="Temukan akomodasi dan tempat menginap terbaik untuk liburan Anda di Desa Tegalsambi."
                data={filteredAccommodations}
                color="bg-orange-100"
                priceColor="text-orange-600"
                direction="right"
                searchTerm={searchTerm}
                type="accommodation"
            />

            {searchTerm &&
                filteredFacilities.length === 0 &&
                filteredAccommodations.length === 0 && (
                    <div className="max-w-screen-xl px-4 py-20 mx-auto text-center">
                        <p className="mb-4 text-gray-600 dark:text-gray-400">Tidak ada hasil yang ditemukan untuk "{searchTerm}"</p>
                        <button
                            onClick={clearSearch}
                            className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50"
                        >
                            Hapus pencarian
                        </button>
                    </div>
                )}
        </div>
    );
};

export default PublicServicePage;