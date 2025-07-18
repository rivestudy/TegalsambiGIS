import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../../utils/axiosInstance";
import { FaParking, FaToilet, FaTicketAlt, FaMosque, FaUtensils, FaWifi, FaChild } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi";
import LoadingAnimation from "../../../components/LoadingAnimation";

// 1. Define a detailed interface for the attraction data
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

// Helper to format price
const formatPrice = (price: number) => (price === 0 ? "Gratis" : `Rp ${price.toLocaleString("id-ID")} /pax`);

// Helper to map facility names to icons
const facilityIcons: { [key: string]: React.ReactNode } = {
    "Parkir Luas": <FaParking className="mr-2 text-black-600" />,
    Toilet: <FaToilet className="mr-2 text-black-600" />,
    Mushola: <FaMosque className="mr-2 text-black-600" />,
    "Warung Makan": <FaUtensils className="mr-2 text-black-600" />,
    Gazebo: <GiCampingTent className="mr-2 text-black-600" />,
    "WiFi Gratis": <FaWifi className="mr-2 text-black-600" />,
    "Area Bermain": <FaChild className="mr-2 text-black-600" />,
};

const AttractionDetail = () => {
    // 2. State for the item, loading, and error handling
    const [item, setItem] = useState<Attraction | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [mainImage, setMainImage] = useState("");

    // 3. Get the 'id' from the URL
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id) return;

        const fetchAttraction = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`/data/attraction/${id}`);
                setItem(response.data);
                if (response.data.images && response.data.images.length > 0) {
                    setMainImage(response.data.images[0]);
                }
                setError(null);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat data wisata. Mungkin wisata ini tidak ada.");
            } finally {
                setLoading(false);
            }
        };

        fetchAttraction();
    }, [id]); // Refetch if the ID in the URL changes

    if (loading) return <LoadingAnimation />;
    if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;
    if (!item) return <div className="flex items-center justify-center h-screen">Wisata tidak ditemukan.</div>;

    // Use a fallback image if none are available
    const imageList = item.images && item.images.length > 0 ? item.images : ["https://placehold.co/800x600?text=No+Image"];
    if (mainImage === "") setMainImage(imageList[0]);

    return (
        <div className="min-h-screen px-4 py-16 bg-gradient-to-r from-blue-900 to-cyan-600">
            <motion.div className="text-center" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.0 }}>
                {/* Breadcrumb */}
                <div className="flex justify-center pt-5">
                    <div className="px-6 py-3 border rounded-full shadow-md bg-white/20 backdrop-blur-md border-white/30">
                        <nav>
                            <ol className="flex items-center space-x-2 text-sm font-semibold text-white">
                                <li>
                                    <Link to="/" className="flex items-center transition duration-300 hover:text-orange-400">
                                        {" "}
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
                                        </svg>{" "}
                                        Landing Page
                                    </Link>
                                </li>
                                <li className="text-gray-300">/</li>
                                <li>
                                    <Link to="/attractions" className="transition duration-300 hover:text-orange-400">
                                        Wisata Tegalsambi
                                    </Link>
                                </li>
                                <li className="text-gray-300">/</li>
                                <li className="font-bold text-orange-300">{item.name}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
                <h1 className="relative inline-block pt-1 mb-6 text-4xl font-extrabold text-white">
                    {item.name}
                    <span className="block w-20 h-1 mx-auto mt-2 bg-orange-400 rounded-full"></span>
                </h1>
            </motion.div>

            <motion.div className="flex flex-col max-w-screen-xl gap-10 mx-auto md:flex-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                {/* BAGIAN KIRI: Gambar dan Thumbnails */}
                <div className="md:w-1/2">
                    <img src={mainImage} alt={item.name} className="rounded-xl shadow-xl w-full object-cover h-[300px] md:h-[420px]" />
                    <div className="flex gap-4 p-2 mt-4 overflow-x-auto">
                        {imageList.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setMainImage(img)}
                                className={`w-20 h-20 rounded-md border-2 object-cover cursor-pointer transition duration-300 scale-95 hover:scale-100 ${mainImage === img ? "border-blue-500" : "border-transparent"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* BAGIAN KANAN: Informasi */}
                <div className="p-6 space-y-6 text-gray-800 border border-gray-200 shadow-xl md:w-1/2 bg-gradient-to-r from-sky-100 to-cyan-100 rounded-xl h-[400px] md:h-[520px] overflow-y-auto">
                    <div>
                        <h2 className="mb-2 font-semibold text-blue-900">Deskripsi Wisata</h2>
                        <p className="text-sm leading-relaxed text-gray-800">{item.description}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                        <div>
                            <h3 className="font-semibold text-blue-900">Harga Tiket</h3>
                            <p className="text-sm text-gray-800">{formatPrice(item.price)}</p>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900">Jam Operasional</h3>
                            <p className="text-sm text-gray-800">{item.time_open_close}</p>
                        </div>
                        <div>
                            <h3 className="mb-2 font-semibold text-blue-900">Fasilitas</h3>
                            <ul className="space-y-2">
                                {item.facilities.map((facility, index) => (
                                    <li key={index} className="flex items-center text-sm text-gray-800">
                                        {facilityIcons[facility] || <FaTicketAlt className="mr-2 text-black-600" />}
                                        {facility}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-semibold text-blue-900">Daya Tarik Utama</h3>
                            <ul className="text-sm text-gray-800 list-disc list-inside">
                                {item.points_of_attraction.map((point, index) => (
                                    <li key={index}>{point}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="mb-1 font-semibold text-blue-900">Kontak & Reservasi</h3>
                            <ul className="text-sm text-gray-800 list-disc list-inside gap-x-6">
                                {item.phone && <li>Telp: {item.phone}</li>}
                                {item.email && <li>Email: {item.email}</li>}
                                {item.instagram && <li>Instagram: {item.instagram}</li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </motion.div>
            {/* Lokasi */}
            <div className="max-w-screen-xl mx-auto mt-10">
                <div className="p-6 border border-gray-200 shadow-xl bg-gradient-to-r from-sky-100 to-cyan-100 rounded-xl">
                    <h3 className="mb-4 text-lg font-semibold text-blue-900">Lokasi Wisata</h3>
                    <p className="mb-4 text-sm text-gray-700">{item.location}</p>
                    <div className="overflow-hidden rounded-xl">
                        <iframe title="map" src={`https://maps.google.com/maps?q=${encodeURIComponent(item.location)}&output=embed`} width="100%" height="300" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttractionDetail;
