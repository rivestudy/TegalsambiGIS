import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AddPaketWisata from "../add/AddPaketWisata";

interface PaketWisata {
    id: number;
    name: string;
    description: string;
    price: string;
    contact: string;
    facilities: string[];
}

const DaftarPaketWisata: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"list" | "form">("list");

    // Dummy data for testing
    const [paketList, setPaketList] = useState<PaketWisata[]>([
        {
            id: 1,
            name: "Paket Wisata Pantai",
            description: "Menikmati keindahan pantai dan sunset.",
            price: "Rp250.000",
            contact: "081234567890",
            facilities: ["Transportasi", "Makan Siang", "Tiket Masuk"],
        },
        {
            id: 2,
            name: "Paket Wisata Budaya",
            description: "Kunjungan ke tempat budaya lokal.",
            price: "Rp300.000",
            contact: "089876543210",
            facilities: ["Guide", "Souvenir", "Transportasi"],
        },
    ]);

    const handleEdit = (id: number) => {
        navigate(`/admin/edit/paket/${id}`);
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Yakin ingin menghapus paket wisata ini?")) {
            setPaketList(paketList.filter((item) => item.id !== id));
            alert("Data paket wisata berhasil dihapus!");
        }
    };

    return (
        <div className="max-w-6xl px-6 py-6 mx-auto">
            <div className="flex pb-2 space-x-4 border-b">
                <button onClick={() => setActiveTab("list")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Daftar Paket
                </button>
                <button onClick={() => setActiveTab("form")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "form" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Tambah Paket
                </button>
            </div>

            {activeTab === "list" && (
                <div className="p-6 mt-4 bg-white border border-gray-200 rounded-md shadow-md">
                    <h1 className="pb-2 mb-4 text-2xl font-bold text-center text-gray-800">Daftar Paket Wisata</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border border-gray-200 table-auto">
                            <thead className="text-left text-gray-700 bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">Nama</th>
                                    <th className="px-4 py-2 border">Harga</th>
                                    <th className="px-4 py-2 border">Fasilitas</th>
                                    <th className="w-24 px-4 py-2 text-center border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paketList.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="py-4 text-center text-gray-500">
                                            Belum ada data paket wisata.
                                        </td>
                                    </tr>
                                ) : (
                                    paketList.map((paket) => (
                                        <tr key={paket.id} className="transition hover:bg-gray-50">
                                            <td className="px-4 py-2 font-medium text-gray-800 border">{paket.name}</td>
                                            <td className="px-4 py-2 text-green-700 font-semibold border">{paket.price}</td>
                                            <td className="px-4 py-2 text-gray-700 border">
                                                <ul className="list-disc list-inside">
                                                    {paket.facilities.map((f, i) => (
                                                        <li key={i}>{f}</li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td className="px-4 py-2 space-x-2 text-center border">
                                                <button onClick={() => handleEdit(paket.id)} className="text-blue-600 hover:text-blue-800" title="Edit">
                                                    <FiEdit />
                                                </button>
                                                <button onClick={() => handleDelete(paket.id)} className="text-red-600 hover:text-red-800" title="Hapus">
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

            {activeTab === "form" && <AddPaketWisata onFormSubmit={() => setActiveTab("list")} />}
        </div>
    );
};

export default DaftarPaketWisata;
