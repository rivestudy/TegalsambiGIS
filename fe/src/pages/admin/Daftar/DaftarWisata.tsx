import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AddAttraction from "../add/AddWisata"; // Form component
import axiosInstance from "../../../utils/axiosInstance"; // Your axios instance

// Define a more specific type for the data received from the API
interface Attraction {
    id: number;
    name: string;
    category: string;
}

const AddAttractionPage: React.FC = () => {
    const [attractions, setAttractions] = useState<Attraction[]>([]);
    const [activeTab, setActiveTab] = useState<"list" | "form">("list");
    const [filter, setFilter] = useState("");
    const navigate = useNavigate();

    // Function to fetch data from the server
    const fetchAttractions = async () => {
        try {
            const response = await axiosInstance.get("/data/attraction");
            setAttractions(response.data);
        } catch (error) {
            console.error("Failed to fetch attractions:", error);
            alert("Gagal memuat data wisata.");
        }
    };

    // Fetch data when the component mounts
    useEffect(() => {
        if (activeTab === "list") {
            fetchAttractions();
        }
    }, [activeTab]);

    const handleEdit = (id: number) => {
        navigate(`/admin/edit/attraction/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Yakin ingin menghapus data wisata ini?")) {
            try {
                await axiosInstance.delete(`/data/attraction/${id}`);
                alert("Data wisata berhasil dihapus!");
                // Refresh the list after deletion
                setAttractions(attractions.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Failed to delete attraction:", error);
                alert("Gagal menghapus data wisata.");
            }
        }
    };

    const filteredData = filter ? attractions.filter((item) => item.category.toLowerCase() === filter.toLowerCase()) : attractions;

    return (
        <div className="max-w-6xl px-6 py-6 mx-auto">
            <div className="flex pb-2 space-x-4 border-b">
                <button onClick={() => setActiveTab("list")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Daftar Wisata
                </button>
                <button onClick={() => setActiveTab("form")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "form" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Tambah Wisata
                </button>
            </div>

            {activeTab === "list" && (
                <div className="p-6 mt-4 bg-white border border-gray-200 rounded-md shadow-md">
                    <h1 className="pb-2 mb-2 text-2xl font-bold text-center text-gray-800">Daftar Wisata</h1>
                    <div className="mb-4">
                        <label className="block mb-1 font-semibold">Filter Kategori</label>
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full p-2 border rounded">
                            <option value="">Semua Kategori</option>
                            <option value="Religi">Wisata Religi</option>
                            <option value="Budaya">Wisata Budaya</option>
                            <option value="Pesisir">Wisata Pesisir</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border border-gray-200 table-auto">
                            <thead className="text-left text-gray-700 bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">Nama Wisata</th>
                                    <th className="px-4 py-2 border">Kategori</th>
                                    <th className="w-32 px-4 py-2 text-center border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="py-4 text-center text-gray-500">
                                            Tidak ada data wisata.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item) => (
                                        <tr key={item.id} className="transition hover:bg-gray-50">
                                            <td className="px-4 py-2 font-medium text-gray-800 border">{item.name}</td>
                                            <td className="px-4 py-2 text-gray-600 border">{item.category}</td>
                                            <td className="px-4 py-2 space-x-2 text-center border">
                                                <button onClick={() => handleEdit(item.id)} className="text-blue-600 transition hover:text-blue-800" title="Edit">
                                                    <FiEdit className="inline-block" />
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="text-red-600 transition hover:text-red-800" title="Hapus">
                                                    <FiTrash className="inline-block" />
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

            {activeTab === "form" && <AddAttraction onFormSubmit={() => setActiveTab("list")} />}
        </div>
    );
};

export default AddAttractionPage;
