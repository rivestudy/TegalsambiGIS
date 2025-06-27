import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import AddAttraction from "./AddWisata"; // Pastikan ini file form-nya
import { useNavigate } from "react-router-dom";

const AddAttractionPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"list" | "form">("list");
    const [filter, setFilter] = useState("");

    const dummyData = [
        { id: 1, name: "Pantai Bahagia", category: "Pesisir" },
        { id: 2, name: "Candi Suci", category: "Religi" },
        { id: 3, name: "Pentas Seni", category: "Budaya" },
    ];

    const filteredData = filter ? dummyData.filter((item) => item.category.toLowerCase() === filter.toLowerCase()) : dummyData;

    const navigate = useNavigate();

    const handleEdit = (id: number) => {
        navigate(`/admin/edit/attraction/${id}`);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Yakin ingin menghapus wisata ini?")) {
            console.log("Delete ID:", id);
            // Tambahkan fungsi hapus di sini
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-6">
            {/* Tabs */}
            <div className="flex space-x-4 border-b pb-2">
                <button onClick={() => setActiveTab("list")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Daftar Wisata
                </button>
                <button onClick={() => setActiveTab("form")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "form" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Tambah Wisata
                </button>
            </div>

            {/* Tabel List */}
            {activeTab === "list" && (
                <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
                    <h1 className="text-2xl text-center pb-2 font-bold mb-2 text-gray-800"> Daftar Wisata</h1>
                    <div className="mb-4">
                        <label className="block font-semibold mb-1">Filter Kategori</label>
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="w-full p-2 border rounded">
                            <option value="">Semua Kategori</option>
                            <option value="Religi">Wisata Religi</option>
                            <option value="Budaya">Wisata Budaya</option>
                            <option value="Pesisir">Wisata Pesisir</option>
                        </select>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-gray-200 text-sm">
                            <thead className="bg-gray-100 text-gray-700 text-left">
                                <tr>
                                    <th className="px-4 py-2 border">Nama Wisata</th>
                                    <th className="px-4 py-2 border">Kategori</th>
                                    <th className="px-4 py-2 border w-32 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.length === 0 ? (
                                    <tr>
                                        <td colSpan={3} className="text-center py-4 text-gray-500">
                                            Tidak ada data wisata.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredData.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-2 border font-medium text-gray-800">{item.name}</td>
                                            <td className="px-4 py-2 border text-gray-600">{item.category}</td>
                                            <td className="px-4 py-2 border text-center space-x-2">
                                                <button onClick={() => handleEdit(item.id)} className="text-blue-600 hover:text-blue-800 transition" title="Edit">
                                                    <FiEdit className="inline-block" />
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800 transition" title="Hapus">
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

            {/* Form Tambah Wisata */}
            {activeTab === "form" && <AddAttraction />}
        </div>
    );
};

export default AddAttractionPage;
