import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AddMap from "../add/AddMap"; // komponen form tambah lokasi
import LoadingAnimation from "../../../components/LoadingAnimation";

const DaftarLokasi: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"list" | "form">("list");
    const [selectedCategory, setSelectedCategory] = useState("semua");
    const [loading, setLoading] = useState(true);

    const dummyData = [
        {
            id: 1,
            name: "Makam A",
            category: "wisataReligi",
            latitude: "-6.5678",
            longitude: "110.6789",
        },
        {
            id: 2,
            name: "Makam B",
            category: "wisataReligi",
            latitude: "-6.6000",
            longitude: "110.7000",
        },
        {
            id: 3,
            name: "Wisata Budaya A",
            category: "wisataBudaya",
            latitude: "-6.5900",
            longitude: "110.7100",
        },
        {
            id: 4,
            name: "Pantai Tegalsambi",
            category: "wisataPesisir",
            latitude: "-6.5921",
            longitude: "110.6900",
        },
        {
            id: 5,
            name: "Balai Desa",
            category: "kantor",
            latitude: "-6.5610",
            longitude: "110.6800",
        },
        {
            id: 6,
            name: "Puskesmas Tegalsambi",
            category: "fasilitas",
            latitude: "-6.5630",
            longitude: "110.6830",
        },
        {
            id: 7,
            name: "Penginapan Tegalsambi A",
            category: "penginapan",
            latitude: "-6.5600",
            longitude: "110.6820",
        },
    ];

    const categoryOptions = [
        { label: "Semua Kategori", value: "semua" },
        { label: "Wisata Religi", value: "wisataReligi" },
        { label: "Wisata Budaya", value: "wisataBudaya" },
        { label: "Wisata Pesisir", value: "wisataPesisir" },
        { label: "Kantor", value: "kantor" },
        { label: "Fasilitas", value: "fasilitas" },
        { label: "Penginapan", value: "penginapan" },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000); // simulasi loading 1 detik

        return () => clearTimeout(timer);
    }, []);

    const categoryLabelMap: { [key: string]: string } = {
        wisataReligi: "Wisata Religi",
        wisataBudaya: "Wisata Budaya",
        wisataPesisir: "Wisata Pesisir",
        kantor: "Kantor",
        fasilitas: "Fasilitas",
        penginapan: "Penginapan",
        semua: "Semua Kategori",
    };

    const navigate = useNavigate();

    const handleEdit = (id: number) => {
        navigate(`/admin/edit/map/${id}`);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Yakin ingin menghapus lokasi ini?")) {
            console.log("Delete ID:", id);
        }
    };

    const filteredData = selectedCategory === "semua" ? dummyData : dummyData.filter((item) => item.category === selectedCategory);

    if (loading) return <LoadingAnimation />;

    return (
        <div className="max-w-6xl mx-auto px-6 py-6">
            {/* Tabs */}
            <div className="flex space-x-4 border-b pb-2">
                <button onClick={() => setActiveTab("list")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Daftar Lokasi
                </button>
                <button onClick={() => setActiveTab("form")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "form" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Tambah Lokasi
                </button>
            </div>

            {/* Tabel List Lokasi */}
            {activeTab === "list" && (
                <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
                    <h1 className="text-2xl text-center pb-2 font-bold mb-4 text-gray-800">Daftar Lokasi</h1>

                    {/* Filter Kategori */}
                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Filter Kategori</label>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full p-2 border rounded">
                            {categoryOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-gray-200 text-sm">
                            <thead className="bg-gray-100 text-gray-700 text-left">
                                <tr>
                                    <th className="px-4 py-2 border">Nama Lokasi</th>
                                    <th className="px-4 py-2 border">Kategori</th>
                                    <th className="px-4 py-2 border">Koordinat</th>
                                    <th className="px-4 py-2 border w-32 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-4 text-gray-500">
                                            Tidak ada data lokasi.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-2 border font-medium text-gray-800">{item.name}</td>
                                            <td className="px-4 py-2 border text-gray-700">{categoryLabelMap[item.category] || item.category}</td>
                                            <td className="px-4 py-2 border text-gray-700">{`${item.latitude}, ${item.longitude}`}</td>
                                            <td className="px-4 py-2 border text-center space-x-2">
                                                <button onClick={() => handleEdit(item.id)} className="text-blue-600 hover:text-blue-800" title="Edit">
                                                    <FiEdit />
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800" title="Hapus">
                                                    <FiTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Form Tambah Lokasi */}
            {activeTab === "form" && <AddMap />}
        </div>
    );
};

export default DaftarLokasi;
