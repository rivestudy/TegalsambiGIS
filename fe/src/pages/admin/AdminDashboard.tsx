import React, { useState, useEffect } from "react";
import { FaMosque, FaLandmark, FaUmbrellaBeach, FaHotel, FaChartBar, FaBoxOpen, FaTools } from "react-icons/fa";
import LoadingAnimation from "../../components/LoadingAnimation";

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
        // Simulasi fetch data dengan delay 800ms
        const fetchData = async () => {
            try {
                // Bisa diganti dengan API call asli di sini
                await new Promise((resolve) => setTimeout(resolve, 800));

                // Setelah "fetch", set datanya
                setStats({
                    wisataReligi: 5,
                    wisataBudaya: 7,
                    wisataPesisir: 4,
                    penginapan: 10,
                    paketWisata: 3,
                    fasilitas: 8,
                });
            } catch (err) {
                console.error("Gagal memuat data dashboard:", err);
            } finally {
                setLoading(false); // Setelah delay, tampilkan dashboard
            }
        };

        fetchData();
    }, []);

    if (loading) return <LoadingAnimation />;

    return (
        <div className="p-6 pt-12">
            <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

            {/* Kartu Statistik */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <div className="bg-white shadow-lg rounded-lg p-5 flex items-center gap-4 border-l-4 border-blue-600">
                    <FaMosque className="text-3xl text-blue-600" />
                    <div>
                        <p className="text-m text-gray-500">Wisata Religi</p>
                        <h3 className="text-2xl font-semibold">{stats.wisataReligi}</h3>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-5 flex items-center gap-4 border-l-4 border-green-600">
                    <FaLandmark className="text-3xl text-green-600" />
                    <div>
                        <p className="text-m text-gray-500">Wisata Budaya</p>
                        <h3 className="text-2xl font-semibold">{stats.wisataBudaya}</h3>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-5 flex items-center gap-4 border-l-4 border-yellow-500">
                    <FaUmbrellaBeach className="text-3xl text-yellow-500" />
                    <div>
                        <p className="text-m text-gray-500">Wisata Pesisir</p>
                        <h3 className="text-2xl font-semibold">{stats.wisataPesisir}</h3>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-5 flex items-center gap-4 border-l-4 border-purple-600">
                    <FaHotel className="text-3xl text-purple-600" />
                    <div>
                        <p className="text-m text-gray-500">Penginapan</p>
                        <h3 className="text-2xl font-semibold">{stats.penginapan}</h3>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-5 flex items-center gap-4 border-l-4 border-pink-600">
                    <FaBoxOpen className="text-3xl text-pink-600" />
                    <div>
                        <p className="text-m text-gray-500">Paket Wisata</p>
                        <h3 className="text-2xl font-semibold">{stats.paketWisata}</h3>
                    </div>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-5 flex items-center gap-4 border-l-4 border-indigo-600">
                    <FaTools className="text-3xl text-indigo-600" />
                    <div>
                        <p className="text-m text-gray-500">Fasilitas</p>
                        <h3 className="text-2xl font-semibold">{stats.fasilitas}</h3>
                    </div>
                </div>
            </div>

            {/* Seksi Tambahan */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                    <FaChartBar className="text-blue-500" /> Statistik Umum
                </h2>
                <div className="bg-white shadow-lg rounded-lg p-6 text-sm text-gray-600">
                    <p>Informasi tambahan tentang statistik pengunjung, kontribusi admin, atau tren kunjungan.</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
