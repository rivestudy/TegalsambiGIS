import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiEdit, FiTrash } from "react-icons/fi";
import AddFasilitas from "../add/AddFasilitas";

interface Fasilitas {
    id: number;
    nama_fasilitas: string;
    deskripsi_fasilitas: string;
    sub_fasilitas: string[];
    lokasi_fasilitas: string;
}

const DaftarFasilitas: React.FC = () => {
    const navigate = useNavigate();
    const [fasilitas, setFasilitas] = useState<Fasilitas[]>([
        {
            id: 1,
            nama_fasilitas: "Aula Serbaguna",
            deskripsi_fasilitas: "Tempat serbaguna untuk rapat dan acara besar.",
            sub_fasilitas: ["Proyektor", "Kursi Lipat", "AC"],
            lokasi_fasilitas: "Tegalsambi",
        },
        {
            id: 2,
            nama_fasilitas: "Perpustakaan Digital",
            deskripsi_fasilitas: "Perpustakaan dengan koleksi digital lengkap.",
            sub_fasilitas: ["Komputer", "Wi-Fi", "Rak Buku"],
            lokasi_fasilitas: "Jepara",
        },
    ]);

    const [activeTab, setActiveTab] = useState<"list" | "form">("list");

    const handleEdit = (id: number) => {
        navigate(`/admin/edit/fasilitas/${id}`);
    };

    // const handleDelete = (id: number) => {
    //     if (confirm("Yakin ingin menghapus fasilitas ini?")) {
    //         setFasilitas(fasilitas.filter((item) => item.id !== id));
    //         alert("Fasilitas berhasil dihapus!");
    //     }
    // };

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
                                            <td className="px-4 py-2 font-medium text-gray-800 border">{item.nama_fasilitas}</td>
                                            <td className="px-4 py-2 text-gray-600 border">{item.deskripsi_fasilitas}</td>
                                            <td className="px-4 py-2 text-gray-600 border">{item.sub_fasilitas.join(", ")}</td>
                                            <td className="px-4 py-2 text-gray-600 border">{item.lokasi_fasilitas}</td>
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

            {activeTab === "form" && <AddFasilitas onFormSubmit={() => setActiveTab("list")} />}
        </div>
    );
};

export default DaftarFasilitas;
