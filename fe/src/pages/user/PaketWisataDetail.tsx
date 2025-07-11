import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaInstagram, FaUtensils, FaBus, FaHotel, FaMapMarkerAlt } from "react-icons/fa";
import { useParams, Link } from "react-router-dom";

interface PaketWisata {
    id: number;
    name: string;
    description: string;
    price: number;
    facilities: string[];
    contact: {
        phone: string;
        email: string;
        instagram: string;
    };
    images: string[];
}

const formatPrice = (price: number) => (price === 0 ? "Gratis" : `Rp ${price.toLocaleString("id-ID")} /paket`);

const facilityIcons: { [key: string]: React.ReactNode } = {
    Transportasi: <FaBus className="mr-2 text-black-600" />,
    Makan: <FaUtensils className="mr-2 text-black-600" />,
    Penginapan: <FaHotel className="mr-2 text-black-600" />,
    "Pemandu Wisata": <FaMapMarkerAlt className="mr-2 text-black-600" />,
};

const dummyTourPackages: PaketWisata[] = [
    {
        id: 9991,
        name: "Paket A - Jelajah Budaya",
        description: "Eksplorasi budaya lokal dengan pemandu berpengalaman dan kuliner khas Tegalsambi.",
        price: 50000,
        facilities: ["Transportasi", "Makan"],
        contact: {
            phone: "0812-0000-1111",
            email: "paketA@tegalsambi.id",
            instagram: "@paketA_tegalsambi",
        },
        images: ["/penginapan.jpg", "/penginapan2.jpg", "/penginapan3.jpg"],
    },
    {
        id: 9992,
        name: "Paket B - Eksplor Tradisi",
        description: "Kunjungan ke pusat kerajinan dan tradisi lokal, cocok untuk wisata edukasi.",
        price: 100000,
        facilities: ["Transportasi", "Makan", "Pemandu Wisata"],
        contact: {
            phone: "0812-0000-2222",
            email: "paketB@tegalsambi.id",
            instagram: "@paketB_tegalsambi",
        },
        images: ["/penginapan.jpg", "/penginapan2.jpg", "/penginapan3.jpg"],
    },
    {
        id: 9993,
        name: "Paket C - Experience Lengkap",
        description: "Paket wisata lengkap dengan penginapan, kuliner, dan tur budaya.",
        price: 150000,
        facilities: ["Transportasi", "Makan", "Penginapan", "Pemandu Wisata"],
        contact: {
            phone: "0812-0000-3333",
            email: "paketC@tegalsambi.id",
            instagram: "@paketC_tegalsambi",
        },
        images: ["/penginapan.jpg", "/penginapan2.jpg", "/penginapan3.jpg"],
    },
];

const PaketWisataDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [paket, setPaket] = useState<PaketWisata | null>(null);
    const [mainImage, setMainImage] = useState<string>("");

    useEffect(() => {
        if (!id) return;
        const foundPaket = dummyTourPackages.find((p) => p.id === parseInt(id));
        if (foundPaket) {
            setPaket(foundPaket);
            if (foundPaket.images?.length) {
                setMainImage(foundPaket.images[0]);
            }
        }
    }, [id]);

    if (!paket) return <div className="flex items-center justify-center h-screen">Memuat detail paket wisata...</div>;

    return (
        <div className="min-h-screen px-4 py-16 bg-gradient-to-r from-blue-900 to-cyan-600 text-white">
            <motion.div className="text-center mb-2" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <div className="flex justify-center pt-4 pb-1">
                    <div className="px-6 py-3 border rounded-full shadow-md bg-white/20 backdrop-blur-md border-white/30">
                        <nav>
                            <ol className="flex items-center space-x-2 text-sm font-semibold text-white">
                                <li>
                                    <Link to="/" className="flex items-center transition duration-300 hover:text-orange-400">
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
                                <li className="font-bold text-orange-300">{paket.name}</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </motion.div>
            <motion.div className="text-center mb-4" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h1 className="text-4xl font-bold">{paket.name}</h1>
                <span className="block w-24 h-1 mx-auto mt-3 bg-yellow-400 rounded-full"></span>
            </motion.div>

            <motion.div className="flex flex-col max-w-screen-xl gap-10 mx-auto md:flex-row" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
                {/* KIRI - GAMBAR */}
                <div className="md:w-1/2">
                    <img src={mainImage} alt={paket.name} className="rounded-xl shadow-xl w-full object-cover h-[300px] md:h-[420px]" />
                    <div className="flex gap-4 p-2 mt-4 overflow-x-auto">
                        {paket.images?.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                onClick={() => setMainImage(img)}
                                className={`w-20 h-20 rounded-md border-2 object-cover cursor-pointer transition duration-300 scale-95 hover:scale-100 ${mainImage === img ? "border-purple-600" : "border-transparent"}`}
                            />
                        ))}
                    </div>
                </div>

                {/* KANAN - DETAIL */}
                <div className="p-6 space-y-6 text-gray-800 border border-gray-200 shadow-xl md:w-1/2 bg-gradient-to-r from-sky-100 to-cyan-100 rounded-xl h-[400px] md:h-[520px] overflow-y-auto">
                    <div>
                        <h2 className="mb-2 font-semibold text-indigo-900">Deskripsi Paket</h2>
                        <p className="text-sm leading-relaxed">{paket.description}</p>
                    </div>
                    <div>
                        <h2 className="mb-2 font-semibold text-indigo-900">Harga Paket</h2>
                        <p className="text-sm">{formatPrice(paket.price)}</p>
                    </div>
                    <div>
                        <h2 className="mb-2 font-semibold text-indigo-900">Fasilitas</h2>
                        <ul className="space-y-2 text-sm">
                            {paket.facilities.map((facility, idx) => (
                                <li key={idx} className="flex items-center">
                                    {facilityIcons[facility] || <FaMapMarkerAlt className="mr-2 text-black-600" />}
                                    {facility}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="mb-2 font-semibold text-indigo-900">Kontak & Reservasi</h2>
                        <ul className="space-y-2 text-sm">
                            <li className="flex items-center">
                                <FaPhoneAlt className="mr-2 text-indigo-700" /> {paket.contact.phone}
                            </li>
                            <li className="flex items-center">
                                <FaEnvelope className="mr-2 text-indigo-700" /> {paket.contact.email}
                            </li>
                            <li className="flex items-center">
                                <FaInstagram className="mr-2 text-indigo-700" /> {paket.contact.instagram}
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PaketWisataDetail;
