import React, { useState, useEffect, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import axios from "../../../utils/axiosInstance";
import HeroSection from "../../../components/HeroSection";
import LoadingAnimation from "../../../components/LoadingAnimation";
import heroBg from "../../../assets/pantaitegalsambi2.webp";

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

interface Attraction {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
}

const formatPrice = (price: number): string =>
    // eslint-disable-next-line eqeqeq
    price == 0 ? "Gratis" : `Rp ${price.toLocaleString("id-ID")} /pax`;

const fallbackImage =
    "https://placehold.co/800x600/e2e8f0/4a5568?text=Gambar+Tidak+Tersedia";

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

const sanitizeItems = (items: any[]): Attraction[] => {
    return items.map((item) => ({
        ...item,
        images: Array.isArray(item.images)
            ? item.images
                .map((img: any) =>
                    typeof img?.dir === "string" ? `${IMAGE_BASE_URL}/${img.dir}` : ""
                )
                .filter(Boolean)
            : [],
    }));
};

const useSearch = <T extends { name: string }>(items: T[], searchTerm: string): T[] => {
    return useMemo(() => {
        if (!searchTerm) return items;
        const term = searchTerm.toLowerCase();
        return items.filter((item) => item.name.toLowerCase().includes(term));
    }, [items, searchTerm]);
};

const SectionContainer = ({
    title,
    description,
    data,
    color,
    priceColor,
    direction,
    searchTerm,
    id,
}: {
    title: string;
    description: string;
    data: Attraction[];
    color: string;
    priceColor: string;
    direction: "top" | "right" | "left" | "bottom";
    searchTerm: string;
    id?: string;
}) => {
    if (!data.length) return null;

    const anim = getBounceAnimation(direction);
    return (
        <motion.div
            id={id}
            className="max-w-screen-xl px-4 pt-10 pb-10 mx-auto scroll-mt-24"
            initial={anim.initial}
            whileInView={anim.whileInView}
            transition={animationConfig}
            viewport={{ once: true, amount: 0.2 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-1 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                {title}
            </h2>
            <p className="mb-4 text-gray-600">
                {searchTerm
                    ? `Menampilkan ${data.length} hasil untuk "${searchTerm}"`
                    : description}
            </p>
            {data.length > 0 && (
                <>
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
                                <motion.div
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ ...animationConfig, delay: idx * 0.2 }}
                                    viewport={{ once: true, amount: 0.4 }}
                                >
                                    <Link
                                        to={
                                            item.category == null
                                                ? `/paket/${item.id}`
                                                : item.category === 'UMKM'
                                                    ? `/umkm/${item.id}`
                                                    : `/attraction/${item.id}`
                                        }
                                    >
                                        <div
                                            className={`${color} mt-4 mb-4 shadow-md rounded-2xl overflow-hidden flex flex-col h-[350px] transition duration-300 hover:shadow-lg hover:-translate-y-2`}
                                        >
                                            <img
                                                src={
                                                    item.images.length > 0
                                                        ? item.images[0]
                                                        : fallbackImage
                                                }
                                                alt={item.name}
                                                className="object-cover w-full h-48"
                                            />
                                            <div className="flex flex-col justify-between flex-grow p-5">
                                                <div>
                                                    <h3 className="mb-1 text-lg font-bold">
                                                        {item.name}
                                                    </h3>
                                                    <p className="text-sm text-gray-600 line-clamp-3">
                                                        {item.description}
                                                    </p>
                                                </div>
                                                <p
                                                    className={`text-sm font-medium ${priceColor}`}
                                                >
                                                    {formatPrice(item.price)}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}
        </motion.div>
    );
};

const WisataPage = () => {
    const [data, setData] = useState<Attraction[]>([]);
    const [paketData, setPaketData] = useState<Attraction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const location = useLocation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [attractionRes, paketRes] = await Promise.all([
                    axios.get<Attraction[]>("/data/attraction"),
                    axios.get<Attraction[]>("/data/paket"),
                ]);

                setData(sanitizeItems(attractionRes.data));
                setPaketData(sanitizeItems(paketRes.data));
            } catch {
                setError("Tidak dapat memuat data wisata. Silakan coba lagi nanti.");
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Wait for content to load before attempting to scroll
        if (location.hash && !loading) {
            const id = location.hash.replace("#", "");
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location.hash, loading]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
    };

    const filteredPaketData = useSearch(paketData, searchTerm);
    const filteredReligiData = useSearch(
        data.filter((item) => ["Religi", "Sejarah"].includes(item.category)),
        searchTerm
    );
    const filteredBudayaData = useSearch(
        data.filter((item) => item.category === "Budaya"),
        searchTerm
    );
    const filteredPesisirData = useSearch(
        data.filter((item) => item.category === "Pesisir"),
        searchTerm
    );
    const filteredUmkmData = useSearch(
        data.filter((item) => item.category === "UMKM"),
        searchTerm
    );

    if (loading) return <LoadingAnimation />;
    if (error)
        return (
            <div className="flex items-center justify-center h-screen text-red-500">
                {error}
            </div>
        );

    return (
        <div className="bg-white">
            <HeroSection
                title="Wisata Tegalsambi"
                breadcrumb="Wisata"
                bgImage={heroBg}
                placeholder="Cari wisata atau paket"
                searchValue={searchTerm}
                onSearchChange={handleSearch}
                onClearSearch={clearSearch}
            />

            {/* Paket Wisata */}
            {filteredPaketData.length > 0 && (
                <SectionContainer
                    id="paket"
                    title="Paket Wisata"
                    description="Nikmati berbagai paket wisata dengan layanan lengkap dan pengalaman terbaik menjelajahi Tegalsambi."
                    data={filteredPaketData}
                    color="bg-yellow-100"
                    priceColor="text-yellow-600"
                    direction="top"
                    searchTerm={searchTerm}
                />
            )}

            {/* Wisata Religi & Sejarah */}
            {filteredReligiData.length > 0 && (
                <SectionContainer
                    id="religi"
                    title="Wisata Religi & Sejarah"
                    description="Jelajahi situs-situs suci dan tempat bersejarah yang kaya akan cerita dan nilai spiritual di Tegalsambi."
                    data={filteredReligiData}
                    color="bg-blue-100"
                    priceColor="text-blue-600"
                    direction="right"
                    searchTerm={searchTerm}
                />
            )}

            {/* Wisata Budaya & Workshop */}
            {filteredBudayaData.length > 0 && (
                <SectionContainer
                    id="budaya"
                    title="Wisata Budaya & Workshop"
                    description="Rasakan pengalaman budaya lokal yang otentik melalui berbagai kegiatan dan workshop interaktif."
                    data={filteredBudayaData}
                    color="bg-orange-100"
                    priceColor="text-orange-600"
                    direction="left"
                    searchTerm={searchTerm}
                />
            )}

            {/* Wisata Pesisir */}
            {filteredPesisirData.length > 0 && (
                <SectionContainer
                    id="pesisir"
                    title="Wisata Pesisir"
                    description="Nikmati keindahan pantai, angin laut, dan berbagai aktivitas air yang menyegarkan di pesisir Tegalsambi."
                    data={filteredPesisirData}
                    color="bg-teal-100"
                    priceColor="text-teal-600"
                    direction="bottom"
                    searchTerm={searchTerm}
                />
            )}

            {/* UMKM */}
            {filteredUmkmData.length > 0 && (
                <SectionContainer
                    id="umkm"
                    title="UMKM Tegalsambi"
                    description="Temukan produk lokal berkualitas dari para pelaku UMKM di Tegalsambi yang kreatif dan inovatif."
                    data={filteredUmkmData}
                    color="bg-purple-100"
                    priceColor="text-purple-600"
                    direction="top"
                    searchTerm={searchTerm}
                />
            )}

            {/* No results message */}
            {searchTerm &&
                filteredPaketData.length === 0 &&
                filteredReligiData.length === 0 &&
                filteredBudayaData.length === 0 &&
                filteredPesisirData.length === 0 &&
                filteredUmkmData.length === 0 && (
                    <div className="max-w-screen-xl px-4 py-20 mx-auto text-center">
                        <p className="mb-4 text-gray-600">
                            Tidak ada hasil yang ditemukan untuk "{searchTerm}"
                        </p>
                        <button
                            onClick={clearSearch}
                            className="px-4 py-2 text-sm font-medium text-red-600 bg-red-100 rounded-lg hover:bg-red-200"
                        >
                            Hapus pencarian
                        </button>
                    </div>
                )}
        </div>
    );
};

export default WisataPage;