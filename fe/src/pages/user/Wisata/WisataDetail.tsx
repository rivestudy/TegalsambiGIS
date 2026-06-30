import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../../utils/axiosInstance";
import { FaClock, FaMoneyBillWave, FaPhoneAlt, FaEnvelope, FaInstagram, FaMapMarkerAlt, FaCheckCircle, FaStar, FaChevronLeft, FaTimes } from "react-icons/fa";
import LoadingAnimation from "../../../components/LoadingAnimation";

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

interface Attraction {
    id: number;
    name: string;
    description: string;
    price: number;
    time_open_close: string;
    facilities: string[];
    points_of_attraction: string[];
    phone: string;
    email: string;
    instagram: string;
    location: string;
    images: string[];
}

const formatPrice = (price: number) => (price === 0 ? "Gratis" : `Rp ${price.toLocaleString("id-ID")} /pax`);
const fallbackImage = "https://placehold.co/800x600/e2e8f0/4a5568?text=Gambar+Tidak+Tersedia";

const animationConfig = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

const WisataDetail = () => {
    const [item, setItem] = useState<Attraction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mainImage, setMainImage] = useState<string>(fallbackImage);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;

        const fetchAttraction = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/data/attraction/${id}`);
                const data = response.data;

                const sanitizedImages = Array.isArray(data.images)
                    ? data.images.map((img: any) =>
                        typeof img?.dir === "string" ? `${IMAGE_BASE_URL}/${img.dir}` : ""
                    ).filter(Boolean)
                    : [];

                let facilities: string[] = [];
                if (typeof data.facilities === "string") {
                    try { facilities = JSON.parse(data.facilities); } catch(e) { facilities = []; }
                } else if (Array.isArray(data.facilities)) {
                    facilities = data.facilities;
                }

                let points: string[] = [];
                if (typeof data.points_of_attraction === "string") {
                    try { points = JSON.parse(data.points_of_attraction); } catch(e) { points = []; }
                } else if (Array.isArray(data.points_of_attraction)) {
                    points = data.points_of_attraction;
                }

                setItem({
                    ...data,
                    facilities,
                    points_of_attraction: points,
                    images: sanitizedImages.length > 0 ? sanitizedImages : [fallbackImage]
                });

                setMainImage(sanitizedImages.length > 0 ? sanitizedImages[0] : fallbackImage);
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat data wisata. Mungkin wisata ini tidak ada.");
            } finally {
                setLoading(false);
            }
        };

        fetchAttraction();
    }, [id]);

    if (loading) return <LoadingAnimation />;
    if (error) return <div className="flex items-center justify-center h-screen text-red-500 bg-gray-50">{error}</div>;
    if (!item) return <div className="flex items-center justify-center h-screen bg-gray-50">Wisata tidak ditemukan.</div>;

    const imageList = item.images.length > 0 ? item.images : [fallbackImage];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-950 font-sans text-gray-800 dark:text-gray-200 pb-20 transition-colors duration-500">
            {/* Hero Image Header */}
            <div className="relative h-[60vh] md:h-[70vh] bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('${mainImage}')` }}>
                {/* Darkening overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
                {/* Seamless gradient transition to background */}
                <div className="absolute bottom-0 left-0 w-full h-48 md:h-64 bg-gradient-to-t from-gray-50 via-gray-50/80 to-transparent dark:from-slate-950 dark:via-slate-950/80" />
                
                {/* Navigation Breadcrumb */}
                <div className="absolute top-0 left-0 w-full p-6 z-10 pt-24 md:pt-32">
                    <div className="max-w-6xl mx-auto flex items-center">
                        <Link to="/attractions" className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-md text-white rounded-full hover:bg-white hover:text-gray-900 transition-all font-medium text-sm shadow-lg ring-1 ring-white/30">
                            <FaChevronLeft /> Kembali ke Wisata
                        </Link>
                    </div>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-16 md:bottom-24 left-0 w-full z-10 px-6">
                    <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={animationConfig}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold text-white uppercase tracking-widest bg-orange-600/90 dark:bg-orange-500/90 shadow-md shadow-black/20 backdrop-blur-sm rounded-full">
                            <FaMapMarkerAlt /> Destinasi Wisata
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2" style={{ textShadow: "0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.8)" }}>{item.name}</h1>
                        <p className="text-lg md:text-xl text-gray-100 flex items-center gap-2" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.8)" }}>
                            <FaMapMarkerAlt className="text-orange-400 drop-shadow-md" /> {item.location || "Tegalsambi, Jepara"}
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 -mt-4 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* Left Column (Description & Details) */}
                    <motion.div className="lg:col-span-2 space-y-8" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ ...animationConfig, delay: 0.1 }}>
                        
                        {/* About Card */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800 transition-colors duration-500">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 inline-block pb-2 border-b-4 border-orange-400">Tentang Wisata Ini</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">{item.description}</p>
                        </div>

                        {/* Points of Attraction */}
                        {item.points_of_attraction && item.points_of_attraction.length > 0 && (
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800 transition-colors duration-500">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 inline-block pb-2 border-b-4 border-orange-400">Daya Tarik Utama</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {item.points_of_attraction.map((point, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <FaStar className="text-yellow-400 mt-1 flex-shrink-0" />
                                            <span className="text-gray-700 dark:text-gray-300">{point}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Gallery */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800 transition-colors duration-500">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 inline-block pb-2 border-b-4 border-orange-400">Galeri Foto</h2>
                            <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
                                <AnimatePresence>
                                    {imageList.map((img, index) => (
                                        <motion.div
                                            key={index}
                                            className={`relative flex-shrink-0 snap-center rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 w-32 h-32 md:w-48 md:h-48 border-transparent hover:shadow-md hover:scale-105`}
                                            onClick={() => setSelectedImage(img)}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: index * 0.1 }}
                                        >
                                            <img src={img} alt={`Gallery ${index}`} className="w-full h-full object-cover" />
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column (Info Card) */}
                    <motion.div className="space-y-6" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ ...animationConfig, delay: 0.2 }}>
                        
                        <div className="sticky top-28 space-y-6">
                            {/* Info Card */}
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800 transition-colors duration-500">
                                <h3 className="text-3xl font-extrabold text-orange-500 mb-2">{formatPrice(item.price)}</h3>
                                <div className="w-full h-px bg-gray-200 dark:bg-slate-700 my-6"></div>

                                <div className="space-y-5">
                                    <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                                        <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500"><FaClock /></div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Jam Operasional</p>
                                            <p className="font-medium">{item.time_open_close || "Buka Setiap Hari"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400"><FaPhoneAlt /></div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Kontak (Telepon/WA)</p>
                                            <p className="font-medium">{item.phone || "-"}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                                        <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center text-pink-500 dark:text-pink-400"><FaInstagram /></div>
                                        <div>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Instagram</p>
                                            <p className="font-medium">{item.instagram || "-"}</p>
                                        </div>
                                    </div>
                                </div>

                                {item.facilities && item.facilities.length > 0 && (
                                    <>
                                        <div className="w-full h-px bg-gray-200 dark:bg-slate-700 my-6"></div>
                                        <h4 className="font-bold text-gray-900 dark:text-white mb-4">Fasilitas Tersedia</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {item.facilities.map((fac, index) => (
                                                <span key={index} className="flex items-center gap-1.5 text-sm px-3 py-1.5 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 rounded-lg">
                                                    <FaCheckCircle className="text-green-500" /> {fac}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Map Card */}
                            <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden transition-colors duration-500">
                                <h4 className="font-bold text-gray-900 dark:text-white mb-4 px-1 flex items-center gap-2"><FaMapMarkerAlt className="text-orange-500" /> Lokasi Peta</h4>
                                <div className="w-full h-48 rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 relative shadow-inner">
                                    <iframe
                                        title="Peta Lokasi"
                                        width="100%"
                                        height="100%"
                                        frameBorder="0"
                                        style={{ border: 0 }}
                                        src={`https://maps.google.com/maps?q=${encodeURIComponent(item.location ? `${item.name}, ${item.location}` : item.name)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                                        allowFullScreen
                                    ></iframe>
                                </div>
                                <a href={`https://maps.google.com/maps?q=${encodeURIComponent(item.location ? `${item.name}, ${item.location}` : item.name)}`} target="_blank" rel="noopener noreferrer" className="mt-4 w-full block text-center py-2.5 bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 font-bold rounded-xl hover:bg-orange-100 dark:hover:bg-orange-900/50 transition-colors text-sm shadow-sm">
                                    Buka di Google Maps
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
            
            {/* Fullscreen Image Modal */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            src={selectedImage}
                            className="max-w-full max-h-full rounded-lg shadow-2xl"
                            alt="Enlarged"
                        />
                        <button
                            className="absolute top-6 right-6 text-white bg-black/50 hover:bg-white/20 p-3 rounded-full transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <FaTimes size={24} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WisataDetail;