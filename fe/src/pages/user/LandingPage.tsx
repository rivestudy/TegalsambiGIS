import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../utils/axiosInstance";

// Updated interface to match backend data structure
interface Item {
    id: number;
    name: string;
    description: string;
    images: string[]; // Images is an array of strings
}

const LandingPage: React.FC = () => {
    const [attractions, setAttractions] = useState<Item[]>([]);
    const [accommodations, setAccommodations] = useState<Item[]>([]); // New state for accommodations
    const [facilities, setFacilities] = useState<Item[]>([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch all three data types concurrently
                const [attractionRes, accommodationRes, facilityRes] = await Promise.all([
                    axios.get("/data/attraction"),
                    axios.get("/data/accommodation"), // Fetching accommodation data
                    axios.get("/data/facility"), // Correct endpoint for facilities
                ]);
                setAttractions(attractionRes.data);
                setAccommodations(accommodationRes.data);
                setFacilities(facilityRes.data);
            } catch (err: any) {
                console.error(err);
                setError("Gagal memuat data. Silakan coba lagi nanti.");
            }
        };
        fetchData();
    }, []);

    // Fallback image in case the images array is empty
    const fallbackImage = "https://placehold.co/800x600/e2e8f0/4a5568?text=Gambar+Tidak+Tersedia";

    return (
        <div className="overflow-x-hidden font-sans text-gray-800">
            {/* Hero Section */}
            <section
                className="relative flex items-center justify-center min-h-screen text-center text-white bg-fixed bg-center bg-no-repeat bg-cover"
                style={{
                    backgroundImage: "url('/gambar_pantai.jpg')",
                }}
            >
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="relative z-10">
                    <motion.h1 className="mb-6 text-5xl font-extrabold md:text-6xl drop-shadow-lg" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        TEGALSAMBI
                    </motion.h1>
                </div>
            </section>

            {/* SECTION: TENTANG */}
            <section id="tentang" className="px-6 py-16 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Tentang Tegalsambi
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
                        id est laborum.
                    </p>
                </div>
            </section>

            {/* SECTION: WISATA LOKAL */}
            <section id="wisata" className="px-6 pb-20 bg-gray-50">
                <div className="max-w-6xl mx-auto mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Wisata Lokal Tegalsambi
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">Temukan tempat menarik dan destinasi terbaik di sekitar Desa Tegalsambi.</p>
                </div>
                <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
                    {attractions.slice(0, 3).map(({ id, name, description, images }) => (
                        <Link to={`/attraction/${id}`} key={`attraction-${id}`} className="block">
                            <article className="overflow-hidden transition transform bg-white border border-gray-200 shadow-md rounded-xl hover:scale-105 hover:shadow-xl">
                                <img src={images && images.length > 0 ? images[0] : fallbackImage} alt={name} className="object-cover w-full h-48" />
                                <div className="p-4">
                                    <p className="text-[10px] uppercase tracking-widest text-purple-600 font-medium">Wisata</p>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-800">{name}</h3>
                                    <p className="text-sm leading-relaxed text-gray-600">{description.slice(0, 100)}…</p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
                {attractions.length > 3 && (
                    <div className="flex justify-center pt-8">
                        <Link to="/attractions" className="flex items-center gap-2 px-6 py-2 text-gray-700 transition bg-gray-200 rounded-full hover:bg-gray-300">
                            Lihat Selengkapnya
                        </Link>
                    </div>
                )}
            </section>

            {/* SECTION: PENGINAPAN & AKOMODASI */}
            <section id="penginapan" className="px-6 pb-20 bg-white">
                <div className="max-w-6xl mx-auto mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Penginapan & Akomodasi
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">Pilihan akomodasi dan penginapan terbaik untuk kenyamanan Anda selama berkunjung.</p>
                </div>
                <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
                    {accommodations.slice(0, 3).map(({ id, name, description, images }) => (
                        <Link to={`/accommodation/${id}`} key={`accommodation-${id}`} className="block">
                            <article className="overflow-hidden transition transform bg-white border border-gray-200 shadow-md rounded-xl hover:scale-105 hover:shadow-xl">
                                <img src={images && images.length > 0 ? images[0] : fallbackImage} alt={name} className="object-cover w-full h-48" />
                                <div className="p-4">
                                    <p className="text-[10px] uppercase tracking-widest text-teal-600 font-medium">Akomodasi</p>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-800">{name}</h3>
                                    <p className="text-sm leading-relaxed text-gray-600">{description.slice(0, 100)}…</p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
                {accommodations.length > 3 && (
                    <div className="flex justify-center pt-8">
                        <Link to="/accommodations" className="flex items-center gap-2 px-6 py-2 text-gray-700 transition bg-gray-200 rounded-full hover:bg-gray-300">
                            Lihat Selengkapnya
                        </Link>
                    </div>
                )}
            </section>

            {/* SECTION: FASILITAS UMUM */}
            <section id="fasilitas" className="px-6 pb-20 bg-gray-50">
                <div className="max-w-6xl mx-auto mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                        Fasilitas Umum
                    </h2>
                    <p className="text-base leading-relaxed text-gray-700 md:text-lg">Sarana dan prasarana publik yang tersedia untuk mendukung aktivitas di Desa Tegalsambi.</p>
                </div>
                <div className="grid max-w-6xl gap-6 mx-auto md:grid-cols-2 lg:grid-cols-3">
                    {facilities.slice(0, 3).map(({ id, name, description, images }) => (
                        <Link to={`/facility/${id}`} key={`facility-${id}`} className="block">
                            <article className="overflow-hidden transition transform bg-white border border-gray-200 shadow-md rounded-xl hover:scale-105 hover:shadow-xl">
                                <img src={images && images.length > 0 ? images[0] : fallbackImage} alt={name} className="object-cover w-full h-48" />
                                <div className="p-4">
                                    <p className="text-[10px] uppercase tracking-widest text-blue-600 font-medium">Fasilitas</p>
                                    <h3 className="mb-2 text-xl font-semibold text-gray-800">{name}</h3>
                                    <p className="text-sm leading-relaxed text-gray-600">{description.slice(0, 100)}…</p>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
                {facilities.length > 3 && (
                    <div className="flex justify-center pt-8">
                        <Link to="/facilities" className="flex items-center gap-2 px-6 py-2 text-gray-700 transition bg-gray-200 rounded-full hover:bg-gray-300">
                            Lihat Selengkapnya
                        </Link>
                    </div>
                )}
            </section>

            {/* Display error message if data fetching fails */}
            {error && (
                <div className="py-10 text-center text-red-500 bg-red-100">
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
