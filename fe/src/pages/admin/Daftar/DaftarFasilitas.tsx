import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import AddFasilitas from "../add/AddFasilitas";
import axiosInstance from "../../../utils/axiosInstance"; // Make sure this exists

interface Fasilitas {
    id: number;
    name: string;
    description: string;
    facilities: string[];
    location: string;
}

const DaftarFasilitas: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"list" | "form">("list");
    const [fasilitas, setFasilitas] = useState<Fasilitas[]>([]);

    useEffect(() => {
        fetchFasilitas();
    }, []);

    const fetchFasilitas = async () => {
        try {
            const response = await axiosInstance.get("/data/facility");
            setFasilitas(response.data);
        } catch (error) {
            console.error("Gagal mengambil data fasilitas:", error);
        }
    };

    const handleEdit = (id: number) => {
        navigate(`/admin/edit/fasilitas/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Yakin ingin menghapus fasilitas ini?")) {
            try {
                await axiosInstance.delete(`/data/facility/${id}`);
                alert("Data fasilitas berhasil dihapus!");
                setFasilitas(fasilitas.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Gagal menghapus fasilitas:", error);
                alert("Gagal menghapus data fasilitas.");
            }
        }
    };

    return (
        <div className="max-w-6xl px-6 py-6 mx-auto">
            <div className="flex pb-2 space-x-4 border-b">
                <button onClick={() => setActiveTab("list")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Daftar Fasilitas
                </button>
                <button onClick={() => setActiveTab("form")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "form" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Tambah Fasilitas
                </button>
            </div>

            {activeTab === "list" && (
                <div className="p-6 mt-4 bg-white border border-gray-200 rounded-md shadow-md">
                    <h1 className="pb-2 mb-2 text-2xl font-bold text-center text-gray-800">Daftar Fasilitas</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border border-gray-200 table-auto">
                            <thead className="text-left text-gray-700 bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">Nama Fasilitas</th>
                                    <th className="px-4 py-2 border">Deskripsi</th>
                                    <th className="px-4 py-2 border">Sub-fasilitas</th>
                                    <th className="px-4 py-2 border">Lokasi</th>
                                    <th className="w-32 px-4 py-2 text-center border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fasilitas.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="py-4 text-center text-gray-500">
                                            Tidak ada data fasilitas.
                                        </td>
                                    </tr>
                                ) : (
                                    fasilitas.map((item) => (
                                        <tr key={item.id} className="transition hover:bg-gray-50">
                                            <td className="px-4 py-2 font-medium text-gray-800 border">{item.name}</td>
                                            <td className="px-4 py-2 text-gray-600 border">{item.description}</td>
                                            <td className="px-4 py-2 text-gray-600 border">
                                                <ul className="list-disc list-inside">
                                                    {item.facilities.map((sub, i) => (
                                                        <li key={i}>{sub}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="px-4 py-2 text-gray-600 border">{item.location}</td>
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

            {activeTab === "form" && <AddFasilitas onFormSubmit={() => {
                fetchFasilitas(); // refresh list
                setActiveTab("list");
            }} />}
        </div>
    );
};

export default DaftarFasilitas;
