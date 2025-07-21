import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../../../components/LoadingAnimation";

interface AddFasilitasProps {
    onFormSubmit: () => void;
}

const AddFasilitas: React.FC<AddFasilitasProps> = ({ onFormSubmit }) => {
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        nama_fasilitas: "",
        deskripsi_fasilitas: "",
        sub_fasilitas: "",
        lokasi_fasilitas: "",
        // --- CHANGED: Renamed for consistency ---
        images: [] as File[],
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // ⏱️ delay 800ms untuk tampilkan form
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            // --- CHANGED: Updated state property ---
            setForm({ ...form, images: Array.from(files) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.nama_fasilitas);
        formData.append("description", form.deskripsi_fasilitas);
        formData.append("facilities", JSON.stringify(form.sub_fasilitas.split(",").map((s) => s.trim())));
        formData.append("location", form.lokasi_fasilitas);

        form.images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            // The endpoint remains the same, but the payload is now correct
            await axiosInstance.post("/data/facility", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Fasilitas berhasil ditambahkan!");
            onFormSubmit();
        } catch (error) {
            console.error("Gagal menambahkan fasilitas:", error);
            toast.error("Gagal menambahkan fasilitas.");
        }
    };

    if (loading) return <LoadingAnimation />;

    return (
        <div className="max-w-4xl p-6 mx-auto mt-4">
            <h1 className="pb-2 mb-4 text-2xl font-bold text-center text-gray-800">Tambah Fasilitas</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-8 bg-white border border-gray-200 shadow-lg rounded-xl">
                <div>
                    <label className="block mb-1 font-semibold">Nama Fasilitas</label>
                    <input
                        type="text"
                        name="nama_fasilitas"
                        value={form.nama_fasilitas}
                        onChange={handleChange}
                        placeholder="Contoh: Aula, Lapangan, Perpustakaan"
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Deskripsi Fasilitas</label>
                    <textarea
                        name="deskripsi_fasilitas"
                        value={form.deskripsi_fasilitas}
                        onChange={handleChange}
                        placeholder="Deskripsi lengkap tentang fasilitas ini"
                        rows={3}
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Sub-fasilitas</label>
                    <textarea
                        name="sub_fasilitas"
                        value={form.sub_fasilitas}
                        onChange={handleChange}
                        placeholder="Pisahkan dengan koma, contoh: Proyektor, Kursi Lipat, AC"
                        rows={2}
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Lokasi Fasilitas</label>
                    <input
                        type="text"
                        name="lokasi_fasilitas"
                        value={form.lokasi_fasilitas}
                        onChange={handleChange}
                        placeholder="Contoh: Tegalsambi, Jepara"
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Gambar Fasilitas</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700">
                        Simpan Fasilitas
                    </button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default AddFasilitas;
