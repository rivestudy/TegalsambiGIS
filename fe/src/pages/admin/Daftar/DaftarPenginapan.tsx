import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import AddAccommodation from "../add/AddPenginapan"; // Renamed for clarity
import axiosInstance from "../../../utils/axiosInstance";
import LoadingAnimation from "../../../components/LoadingAnimation";

// Interface for accommodation data from the API
interface Accommodation {
    id: number;
    name: string;
    price: string;
    time_open_close: string;
}

const AccommodationList: React.FC = () => {
    const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
    const [activeTab, setActiveTab] = useState<"list" | "form">("list");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const fetchAccommodations = async () => {
        try {
            const response = await axiosInstance.get("/data/accommodation");
            setTimeout(() => {
                setAccommodations(response.data);
                setLoading(false);
            }, 800); // ⏳ Tambahan 800ms delay untuk smooth loading
        } catch (error) {
            console.error("Failed to fetch accommodations:", error);
            alert("Gagal memuat data penginapan.");
        }
    };

    // Fetch data when the list tab is active
    useEffect(() => {
        if (activeTab === "list") {
            fetchAccommodations();
        }
    }, [activeTab]);

    const handleEdit = (id: number) => {
        // Correct navigation path for editing an accommodation
        navigate(`/admin/edit/penginapan/${id}`);
    };

    const handleDelete = async (id: number) => {
        if (window.confirm("Yakin ingin menghapus penginapan ini?")) {
            try {
                await axiosInstance.delete(`/data/accommodation/${id}`);
                alert("Data penginapan berhasil dihapus!");
                // Refresh list by filtering out the deleted item
                setAccommodations(accommodations.filter((item) => item.id !== id));
            } catch (error) {
                console.error("Failed to delete accommodation:", error);
                alert("Gagal menghapus data.");
            }
        }
    };

    if (loading) return <LoadingAnimation />;

    return (
        <div className="max-w-6xl px-6 py-6 mx-auto">
            <div className="flex pb-2 space-x-4 border-b">
                <button onClick={() => setActiveTab("list")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "list" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Daftar Penginapan
                </button>
                <button onClick={() => setActiveTab("form")} className={`px-4 py-2 rounded-t-md font-semibold ${activeTab === "form" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>
                    Tambah Penginapan
                </button>
            </div>

            {activeTab === "list" && (
                <div className="p-6 mt-4 bg-white border border-gray-200 rounded-md shadow-md">
                    <h1 className="pb-2 mb-2 text-2xl font-bold text-center text-gray-800">Daftar Penginapan</h1>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm border border-gray-200 table-auto">
                            <thead className="text-left text-gray-700 bg-gray-100">
                                <tr>
                                    <th className="px-4 py-2 border">Nama Penginapan</th>
                                    <th className="px-4 py-2 border">Harga per Malam</th>
                                    <th className="px-4 py-2 border">Check-in / Check-out</th>
                                    <th className="w-32 px-4 py-2 text-center border">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accommodations.length > 0 ? (
                                    accommodations.map((item) => (
                                        <tr key={item.id} className="transition hover:bg-gray-50">
                                            <td className="px-4 py-2 font-medium text-gray-800 border">{item.name}</td>
                                            <td className="px-4 py-2 text-gray-700 border">{item.price}</td>
                                            <td className="px-4 py-2 text-gray-700 border">{item.time_open_close}</td>
                                            <td className="px-4 py-2 space-x-2 text-center border">
                                                <button onClick={() => handleEdit(item.id)} className="text-blue-600 hover:text-blue-800" title="Edit">
                                                    <FiEdit />
                                                </button>
                                                <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-800" title="Hapus">
                                                    <FiTrash />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="py-4 text-center text-gray-500">
                                            Tidak ada data penginapan.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {activeTab === "form" && <AddAccommodation onFormSubmit={() => setActiveTab("list")} />}
        </div>
    );
};

export default AccommodationList;
