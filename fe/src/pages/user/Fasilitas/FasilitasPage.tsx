import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import type { Transition } from "framer-motion";
import axios from "../../../utils/axiosInstance";
import HeroSection from "../../../components/HeroSection";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../../components/LoadingAnimation";
import heroBg from "../../../assets/pantaitegalsambi2.webp";

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

interface Facility {
    id: number;
    name: string;
    description: string;
    images: string[];
    category: string;
}

const animationConfig: Transition = {
    type: "spring",
    duration: 1.8,
    bounce: 0.6,
};

const fallbackImage = "https://placehold.co/800x600/e2e8f0/4a5568?text=Gambar+Tidak+Tersedia";

const sanitizeItems = (items: any[]): Facility[] => {
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
        return items.filter(item => 
            item.name.toLowerCase().includes(term)
        );
    }, [items, searchTerm]);
};

const SectionContainer = ({ 
    title, 
    description, 
    data, 
    color, 
    direction,
    searchTerm 
}: { 
    title: string; 
    description: string; 
    data: Facility[]; 
    color: string; 
    direction: "top" | "right" | "left" | "bottom";
    searchTerm: string;
}) => {
    if (!data.length) return null;
    
    return (
        <motion.div 
            className="max-w-screen-xl px-4 pt-10 pb-10 mx-auto" 
            initial={{ opacity: 0, y: 50 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            transition={animationConfig} 
            viewport={{ once: true, amount: 0.2 }}
        >
            <h2 className="text-2xl font-bold text-gray-800 mb-1 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-green-300 to-green-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                {title}
            </h2>
            <p className="mb-4 text-gray-600">
                {searchTerm 
                    ? `Menampilkan ${data.length} hasil untuk "${searchTerm}"` 
                    : description}
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {data.map((item, idx) => (
                    <motion.div 
                        key={item.id} 
                        initial={{ opacity: 0, y: 50 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        transition={{ ...animationConfig, delay: idx * 0.1 }} 
                        viewport={{ once: true, amount: 0.4 }}
                    >
                        <Link to={`/facility/${item.id}`} className="block">
                            <div className={`${color} p-6 rounded-xl shadow-md transition duration-300 hover:shadow-lg hover:-translate-y-1`}>
                                <img 
                                    src={item.images.length > 0 ? item.images[0] : fallbackImage} 
                                    alt={item.name} 
                                    className="object-cover w-full h-48 mb-4 rounded-lg"
                                />
                                <h3 className="mb-2 text-xl font-semibold">{item.name}</h3>
                                <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

const FacilitiesPage = () => {
    const [facilities, setFacilities] = useState<Facility[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Facility[]>("/data/facility");
                setFacilities(sanitizeItems(response.data));
            } catch {
                setError("Tidak dapat memuat data fasilitas.");
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 800);
            }
        };
        fetchData();
    }, []);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    };

    const clearSearch = () => {
        setSearchTerm("");
    };

    const filteredPublicFacilities = useSearch(
        facilities.filter(item => item.category === "Public"),
        searchTerm
    );
    const filteredGovernmentFacilities = useSearch(
        facilities.filter(item => item.category === "Government"),
        searchTerm
    );
    const filteredOtherFacilities = useSearch(
        facilities.filter(item => !["Public", "Government"].includes(item.category)),
        searchTerm
    );

    if (loading) return <LoadingAnimation />;
    if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

    return (
        <div className="bg-white">
            <HeroSection 
                title="Fasilitas" 
                breadcrumb="Fasilitas" 
                bgImage={heroBg} 
                placeholder="Cari fasilitas"
                searchValue={searchTerm}
                onSearchChange={handleSearch}
                onClearSearch={clearSearch}
            />

            {/* Fasilitas Publik */}
            {filteredPublicFacilities.length > 0 && (
                <SectionContainer
                    title="Fasilitas Publik"
                    description="Temukan berbagai fasilitas publik yang tersedia untuk menunjang aktivitas Anda di Tegalsambi."
                    data={filteredPublicFacilities}
                    color="bg-blue-100"
                    direction="top"
                    searchTerm={searchTerm}
                />
            )}

            {/* Fasilitas Pemerintah */}
            {filteredGovernmentFacilities.length > 0 && (
                <SectionContainer
                    title="Fasilitas Pemerintah"
                    description="Akses berbagai layanan dan fasilitas pemerintah yang tersedia di Tegalsambi."
                    data={filteredGovernmentFacilities}
                    color="bg-green-100"
                    direction="right"
                    searchTerm={searchTerm}
                />
            )}

            {/* Fasilitas Lainnya */}
            {filteredOtherFacilities.length > 0 && (
                <SectionContainer
                    title="Fasilitas Lainnya"
                    description="Jelajahi berbagai fasilitas tambahan yang tersedia di Tegalsambi."
                    data={filteredOtherFacilities}
                    color="bg-purple-100"
                    direction="left"
                    searchTerm={searchTerm}
                />
            )}

            {/* No results message */}
            {searchTerm && 
                filteredPublicFacilities.length === 0 && 
                filteredGovernmentFacilities.length === 0 && 
                filteredOtherFacilities.length === 0 && (
                <div className="max-w-screen-xl px-4 py-20 mx-auto text-center">
                    <p className="mb-4 text-gray-600">Tidak ada fasilitas yang ditemukan untuk "{searchTerm}"</p>
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

export default FacilitiesPage;