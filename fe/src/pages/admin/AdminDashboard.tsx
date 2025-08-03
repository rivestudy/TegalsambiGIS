import React, { useState, useEffect } from "react";
import {
    FaMosque,
    FaLandmark,
    FaUmbrellaBeach,
    FaHotel,
    FaBoxOpen,
    FaTools,
} from "react-icons/fa";
import LoadingAnimation from "../../components/LoadingAnimation";
import axiosInstance from "../../utils/axiosInstance";

// Dummy sanitize function – replace with your actual logic if needed
const sanitizeItems = (items: any[]) => {
    return Array.isArray(items) ? items : [];
};

const AdminDashboard: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        wisataReligi: 0,
        wisataBudaya: 0,
        wisataPesisir: 0,
        penginapan: 0,
        paketWisata: 0,
        fasilitas: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 800));

                const [attractionRes, accommodationRes, facilityRes, paketsRes] = await Promise.all([
                    axiosInstance.get("/data/attraction"),
                    axiosInstance.get("/data/accommodation"),
                    axiosInstance.get("/data/facility"),
                    axiosInstance.get("/data/paket"),
                ]);

                const attractions = sanitizeItems(attractionRes.data ?? []);
                const accommodations = sanitizeItems(accommodationRes.data ?? []);
                const facilities = sanitizeItems(facilityRes.data ?? []);
                const pakets = sanitizeItems(paketsRes.data ?? []);

                setStats({
                    wisataReligi: attractions.filter((item) => item.category === "Religi").length,
                    wisataBudaya: attractions.filter((item) => item.category === "Budaya").length,
                    wisataPesisir: attractions.filter((item) => item.category === "Pesisir").length,
                    penginapan: accommodations.length,
                    fasilitas: facilities.length,
                    paketWisata: pakets.length, // Replace with real fetch if available
                });
            } catch (err) {
                console.error("Gagal memuat data. Silakan coba lagi nanti.", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <LoadingAnimation />;

    return (
        <div className="p-6 pt-12">
            <h1 className="mb-6 text-2xl font-bold">Admin Dashboard</h1>

            {/* Kartu Statistik */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <DashboardCard
                    icon={<FaMosque className="text-3xl text-blue-600" />}
                    label="Wisata Religi"
                    count={stats.wisataReligi}
                    borderColor="border-blue-600"
                />
                <DashboardCard
                    icon={<FaLandmark className="text-3xl text-green-600" />}
                    label="Wisata Budaya"
                    count={stats.wisataBudaya}
                    borderColor="border-green-600"
                />
                <DashboardCard
                    icon={<FaUmbrellaBeach className="text-3xl text-yellow-500" />}
                    label="Wisata Pesisir"
                    count={stats.wisataPesisir}
                    borderColor="border-yellow-500"
                />
                <DashboardCard
                    icon={<FaHotel className="text-3xl text-purple-600" />}
                    label="Penginapan"
                    count={stats.penginapan}
                    borderColor="border-purple-600"
                />
                <DashboardCard
                    icon={<FaBoxOpen className="text-3xl text-pink-600" />}
                    label="Paket Wisata"
                    count={stats.paketWisata}
                    borderColor="border-pink-600"
                />
                <DashboardCard
                    icon={<FaTools className="text-3xl text-indigo-600" />}
                    label="Fasilitas"
                    count={stats.fasilitas}
                    borderColor="border-indigo-600"
                />
            </div>

            
        </div>
    );
};

interface CardProps {
    icon: React.ReactNode;
    label: string;
    count: number;
    borderColor: string;
}

const DashboardCard: React.FC<CardProps> = ({ icon, label, count, borderColor }) => {
    return (
        <div className={`flex items-center gap-4 p-5 bg-white ${borderColor} border-l-4 rounded-lg shadow-lg`}>
            {icon}
            <div>
                <p className="text-gray-500 text-m">{label}</p>
                <h3 className="text-2xl font-semibold">{count}</h3>
            </div>
        </div>
    );
};

export default AdminDashboard;
