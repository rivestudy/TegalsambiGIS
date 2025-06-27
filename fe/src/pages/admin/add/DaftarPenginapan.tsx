import React, { useState } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import AddFacilities from "./AddPenginapan";
import { useNavigate } from "react-router-dom";

const DaftarPenginapan: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"list" | "form">("list");

    const dummyData = [
        {
            id: 1,
            name: "Penginapan A",
            price: "Rp 250.000 - Rp 500.000",
            checkInOut: "14.00 WIB / 12.00 WIB",
        },
        {
            id: 2,
            name: "Penginapan B",
            price: "Rp 150.000 - Rp 300.000",
            checkInOut: "13.00 WIB / 11.00 WIB",
        },
    ];

    const navigate = useNavigate();

    const handleEdit = (id: number) => {
        navigate(`/admin/edit/facilities/${id}`);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Yakin ingin menghapus penginapan ini?")) {
            console.log("Delete ID:", id);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-6 py-6">
            {/* Tabs */}
            <div className="flex space-x-4 border-b pb-2">
                <button onClick={() => setActiveTab("list")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Daftar Penginapan
                </button>
                <button onClick={() => setActiveTab("form")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "form" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Tambah Penginapan
                </button>
            </div>

            {/* Tabel List */}
            {activeTab === "list" && (
                <div className="bg-white p-6 rounded-md shadow-md border border-gray-200">
                    <h1 className="text-2xl text-center pb-2 font-bold mb-2 text-gray-800">Daftar Penginapan</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full table-auto border border-gray-200 text-sm">
                            <thead className="bg-gray-100 text-gray-700 text-left">
                                <tr>
                                    <th className="px-4 py-2 border">Nama Penginapan</th>
                                    <th className="px-4 py-2 border">Harga per Malam</th>
                                    <th className="px-4 py-2 border">Check-in / Check-out</th>
                                    <th className="px-4 py-2 border w-32 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dummyData.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="text-center py-4 text-gray-500">
                                            Tidak ada data penginapan.
                                        </td>
                                    </tr>
                                ) : (
                                    dummyData.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition">
                                            <td className="px-4 py-2 border font-medium text-gray-800">{item.name}</td>
                                            <td className="px-4 py-2 border text-gray-700">{item.price}</td>
                                            <td className="px-4 py-2 border text-gray-700">{item.checkInOut}</td>
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

            {/* Form Tambah */}
            {activeTab === "form" && <AddFacilities />}
        </div>
    );
};

export default DaftarPenginapan;
