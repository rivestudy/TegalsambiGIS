import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AddUmkm from "../add/AddUMKM"; // Renders the Add UMKM form
import axiosInstance from "../../../utils/axiosInstance";
import LoadingAnimation from "../../../components/LoadingAnimation";

// Define the type for UMKM data
interface Umkm {
    id: number;
    name: string;
    // Category is removed from display as it's always "UMKM"
}

const DaftarUmkm: React.FC = () => {
    const [umkmList, setUmkmList] = useState<Umkm[]>([]);
    const [activeTab, setActiveTab] = useState<"list" | "form">("list");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    // Function to fetch UMKM data
    const fetchUmkm = async () => {
    setLoading(true);
    try {
        const response = await axiosInstance.get("/data/attraction");
        // Filter the response data to only include items with category "UMKM"
        const filteredData = response.data.filter(
            (item: any) => item.category === "UMKM"
        );

        setTimeout(() => {
            setUmkmList(filteredData); // Set the filtered data to state
            setLoading(false);
        }, 800);
    } catch (error) {
        console.error("Failed to fetch UMKM:", error);
        alert("Gagal memuat data UMKM.");
        setLoading(false);
    }
};

    // Fetch data when the component mounts or tab is switched to 'list'
    useEffect(() => {
        if (activeTab === "list") {
            fetchUmkm();
        }
    }, [activeTab]);

    const handleEdit = (id: number) => {
        navigate(`/admin/edit/umkm/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Yakin ingin menghapus data UMKM ini?")) {
            try {
                await axiosInstance.delete(`/data/umkm/${id}`);
                alert("Data UMKM berhasil dihapus!");
                setUmkmList(umkmList.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Failed to delete UMKM:", error);
                alert("Gagal menghapus data UMKM.");
            }
        }
    };

    if (loading && activeTab === 'list') return <LoadingAnimation />;

    return (
        <div className="max-w-6xl px-6 py-6 mx-auto">
            <div className="flex pb-2 space-x-4 border-b">
                <button onClick={() => setActiveTab("list")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Daftar UMKM
                </button>
                <button onClick={() => setActiveTab("form")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "form" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Tambah UMKM
                </button>
            </div>

            {activeTab === "list" && (
                <div className="p-6 mt-4 bg-white border border-gray-200 rounded-md shadow-md">
                    <h1 className="pb-4 mb-4 text-2xl font-bold text-center text-gray-800 border-b">Daftar UMKM</h1>
                    
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border border-gray-200 table-auto">
                            <thead className="text-left text-gray-700 bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">Nama Produk / Usaha</th>
                                    <th className="w-32 px-4 py-2 text-center border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {umkmList.length === 0 ? (
                                    <tr>
                                        <td colSpan={2} className="py-4 text-center text-gray-500">
                                            Tidak ada data UMKM.
                                        </td>
                                    </tr>
                                ) : (
                                    umkmList.map((item) => (
                                        <tr key={item.id} className="transition hover:bg-gray-50">
                                            <td className="px-4 py-2 font-medium text-gray-800 border">{item.name}</td>
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

            {activeTab === "form" && <AddUmkm onFormSubmit={() => setActiveTab("list")} />}
        </div>
    );
};

export default DaftarUmkm;