// src/pages/PublicServicesPage.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../utils/axiosInstance";
import SectionGrid from "../../components/SectionGrid";
import HeroSection from "../../components/HeroSection";

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
            <HeroSection title="Fasilitas" breadcrumb="Fasilitas" bgImage="/pantaitegalsambi2.webp" placeholder="Cari layanan publik" />

            <SectionGrid title="Sarana & Prasarana Publik" description="Temukan berbagai fasilitas publik yang tersedia untuk menunjang aktivitas Anda di Tegalsambi." data={facilities} itemUrlPrefix="facility" cardColor="bg-green-100" />

            <SectionGrid
                title="Penginapan & Akomodasi"
                description="Dari hotel mewah hingga guesthouse nyaman, temukan akomodasi terbaik di Tegalsambi."
                data={accommodations}
                itemUrlPrefix="accommodation"
                cardColor="bg-orange-100"
                priceColor="text-orange-600"
                formatPrice={formatPrice}
            />
        </div>
    );
};

export default PublicServicesPage;
