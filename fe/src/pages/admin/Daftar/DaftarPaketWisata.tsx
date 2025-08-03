import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AddPaketWisata from "../add/AddPaketWisata";
import axios from "../../../utils/axiosInstance";
import LoadingAnimation from "../../../components/LoadingAnimation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface PaketWisata {
    id: number;
    name: string;
    description: string;
    price: string;
    phone: string;
    facilities: string;
}

// Format price to Rp. X.XXX,XX
const formatPrice = (value: string | number) => {
    const number = typeof value === "string" ? parseFloat(value) : value;
    const formatted = new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 2,
    }).format(number);

    return formatted.replace(/\./g, "#").replace(/,/g, ".").replace(/#/g, ","); // swap , and .
};

const DaftarPaketWisata: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"list" | "form">("list");
    const [paketList, setPaketList] = useState<PaketWisata[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchPakets = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/data/paket");
            setTimeout(() => {
                setPaketList(response.data);
                setLoading(false);
            }, 800);
        } catch (error) {
            console.error("Gagal mengambil data paket wisata:", error);
            toast.error("Gagal memuat data wisata.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPakets();
    }, []);

    const handleEdit = (id: number) => {
        navigate(`/admin/edit/paket/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Yakin ingin menghapus paket wisata ini?")) {
            try {
                await axios.delete(`/data/paket/${id}`);
                setPaketList((prev) => prev.filter((item) => item.id !== id));
                toast.success("Paket wisata berhasil dihapus!");
            } catch (error) {
                console.error("Gagal menghapus paket wisata:", error);
                toast.error("Gagal menghapus data.");
            }
        }
    };

    if (loading) return <LoadingAnimation />;

    return (
        <div className="max-w-6xl px-6 py-6 mx-auto">
            <ToastContainer position="top-right" autoClose={2500} />
            <div className="flex pb-2 space-x-4 border-b">
                <button
                    onClick={() => setActiveTab("list")}
                    className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
                    Daftar Paket
                </button>
                <button
                    onClick={() => setActiveTab("form")}
                    className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "form" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
                >
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
                                            <td className="px-4 py-2 font-semibold text-green-700 border">
                                                {formatPrice(paket.price)}
                                            </td>
                                            <td className="px-4 py-2 text-gray-700 border">
                                                <ul className="list-disc list-inside">
                                                    {paket.facilities.split(",").map((facility, index) => (
                                                        <li key={index}>{facility.trim()}</li>
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

            {activeTab === "form" && <AddPaketWisata onFormSubmit={fetchPakets} />}
        </div>
    );
};

export default DaftarPaketWisata;
