import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import axios from "../../../utils/axiosInstance";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaUtensils, FaBus, FaHotel, FaMapMarkerAlt, FaChevronLeft, FaCheckCircle, FaStar, FaBoxOpen, FaTimes } from "react-icons/fa";
import LoadingAnimation from "../../../components/LoadingAnimation";

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;

interface PaketWisata {
    id: number;
    name: string;
    description: string;
    price: number;
    facilities: string;
    phone: string;
    images: string[];
}

const formatPrice = (price: number) => (price === 0 ? "Gratis" : `Rp ${price.toLocaleString("id-ID")} /paket`);
const fallbackImage = "https://placehold.co/800x600/e2e8f0/4a5568?text=Gambar+Tidak+Tersedia";

const animationConfig = { duration: 0.8, ease: [0.16, 1, 0.3, 1] };

const facilityIcons: { [key: string]: React.ReactNode } = {
    Transportasi: <FaBus className="text-blue-500" />,
    Makan: <FaUtensils className="text-orange-500" />,
    Penginapan: <FaHotel className="text-purple-500" />,
    "Pemandu Wisata": <FaMapMarkerAlt className="text-red-500" />,
};

const PaketWisataDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [paket, setPaket] = useState<PaketWisata | null>(null);
    const [mainImage, setMainImage] = useState<string>(fallbackImage);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchPaket = async () => {
            try {
                const res = await axios.get(`/data/paket/${id}`);
                const data = res.data;
                
                const sanitizedImages = Array.isArray(data.images) 
                    ? data.images.map((img: any) => 
                        typeof img?.dir === "string" ? `${IMAGE_BASE_URL}/${img.dir}` : ""
                      ).filter(Boolean)
                    : [];

                setPaket({
                    ...data,
                    images: sanitizedImages.length > 0 ? sanitizedImages : [fallbackImage]
                });
                
                setMainImage(sanitizedImages.length > 0 ? sanitizedImages[0] : fallbackImage);
            } catch (err) {
                setError("Gagal memuat data paket wisata.");
            } finally {
                setLoading(false);
            }
        };

        fetchPaket();
    }, [id]);

    if (loading) return <LoadingAnimation />;
    if (error || !paket) return <div className="flex items-center justify-center h-screen text-red-500 bg-gray-50">{error}</div>;

    const imageList = paket.images.length > 0 ? paket.images : [fallbackImage];

    // Safely parse facilities if it's a string
    let parsedFacilities: string[] = [];
    if (typeof paket.facilities === "string") {
        try { parsedFacilities = JSON.parse(paket.facilities); } catch(e) { parsedFacilities = paket.facilities.split(',').map(f => f.trim()); }
    } else if (Array.isArray(paket.facilities)) {
        parsedFacilities = paket.facilities;
    }

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

                {/* Title overlay - moved slightly higher to avoid overlapping with bottom gradient */}
                <div className="absolute bottom-24 md:bottom-32 left-0 w-full z-10 px-6">
                    <motion.div className="max-w-6xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={animationConfig}>
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold text-white uppercase tracking-widest bg-yellow-600/90 dark:bg-yellow-500/90 shadow-md shadow-black/20 backdrop-blur-sm rounded-full">
                            <FaBoxOpen /> Paket Wisata
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2" style={{ textShadow: "0 4px 12px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.8)" }}>{paket.name}</h1>
                        <p className="text-lg md:text-xl text-gray-100 flex items-center gap-2" style={{ textShadow: "0 2px 6px rgba(0,0,0,0.8)" }}>
                            <FaMapMarkerAlt className="text-yellow-400 drop-shadow-md" /> Jelajahi Tegalsambi
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
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 inline-block pb-2 border-b-4 border-yellow-400">Deskripsi Paket</h2>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg whitespace-pre-wrap">{paket.description}</p>
                        </div>

                        {/* Gallery */}
                        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800 transition-colors duration-500">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 inline-block pb-2 border-b-4 border-yellow-400">Galeri Foto</h2>
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
                        
                        {/* Sticky Info Card */}
                        <div className="sticky top-28 bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-slate-800 transition-colors duration-500">
                            <h3 className="text-3xl font-extrabold text-yellow-600 mb-2">{formatPrice(paket.price)}</h3>
                            <div className="w-full h-px bg-gray-200 dark:bg-slate-700 my-6"></div>

                            <div className="space-y-5">
                                <div className="flex items-center gap-4 text-gray-700 dark:text-gray-300">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400"><FaPhoneAlt /></div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">Kontak Reservasi</p>
                                        <p className="font-medium">{paket.phone || "-"}</p>
                                    </div>
                                </div>
                            </div>

                                {parsedFacilities && parsedFacilities.length > 0 && (
                                <>
                                    <div className="w-full h-px bg-gray-200 dark:bg-slate-700 my-6"></div>
                                    <h4 className="font-bold text-gray-900 dark:text-white mb-4">Fasilitas Paket</h4>
                                    <div className="flex flex-col gap-3">
                                        {parsedFacilities.map((fac, index) => (
                                            <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700">
                                                <div className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center flex-shrink-0">
                                                    {facilityIcons[fac] || <FaCheckCircle className="text-green-500" />}
                                                </div>
                                                <span className="text-gray-700 dark:text-gray-300 font-medium">{fac}</span>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )}
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

export default PaketWisataDetail;