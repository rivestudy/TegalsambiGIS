import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance"; // Your axios instance
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../../../components/LoadingAnimation";

interface AddAttractionProps {
    onFormSubmit: () => void; // Callback to switch tab after submission
}

const AddAttraction: React.FC<AddAttractionProps> = ({ onFormSubmit }) => {
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        category: "",
        name: "",
        description: "",
        price: "",
        time_open_close: "",
        phone: "",
        email: "",
        instagram: "",
        facilities: "",
        location: "",
        points_of_attraction: "",
        images: [] as File[],
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // ⏱️ delay 800ms untuk tampilkan form
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setForm({ ...form, images: Array.from(files) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("category", form.category);
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("time_open_close", form.time_open_close);
        formData.append("phone", form.phone);
        formData.append("email", form.email);
        formData.append("instagram", form.instagram);
        formData.append("location", form.location);
        formData.append("facilities", JSON.stringify(form.facilities.split(",").map((f) => f.trim())));
        formData.append("points_of_attraction", JSON.stringify(form.points_of_attraction.split(",").map((a) => a.trim())));
        form.images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            await axiosInstance.post("/data/attraction", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Wisata berhasil ditambahkan!");
            onFormSubmit();
        } catch (error) {
            console.error("Failed to add attraction:", error);
            toast.error("Gagal menambahkan wisata.");
        }
    };

    if (loading) return <LoadingAnimation />;

    return (
        <div className="max-w-6xl p-6 mx-auto mt-4">
            <h1 className="pb-2 mb-2 text-2xl font-bold text-center text-gray-800">Tambah Wisata</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-8 bg-white border border-gray-200 shadow-lg md:grid-cols-2 rounded-xl">
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Kategori Wisata</label>
                    <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400" required>
                        <option value="">-- Pilih Kategori --</option>
                        <option value="Religi">Wisata Religi</option>
                        <option value="Budaya">Wisata Budaya</option>
                        <option value="Pesisir">Wisata Pesisir</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Nama Wisata</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Masukkan nama wisata"
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                        required
                    />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Deskripsi</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        rows={4}
                        placeholder="Tuliskan deskripsi wisata"
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Harga Tiket (per orang)</label>
                    <input type="text" name="price" value={form.price} onChange={handleChange} placeholder="e.g., Rp 10.000" className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Jam Operasional</label>
                    <input
                        type="text"
                        name="time_open_close"
                        value={form.time_open_close}
                        onChange={handleChange}
                        placeholder="e.g., Senin - Minggu, 08.00 - 17.00"
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Telepon</label>
                    <input
                        type="text"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Nomor telepon yang bisa dihubungi"
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Alamat email kontak" className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Instagram</label>
                    <input
                        type="text"
                        name="instagram"
                        value={form.instagram}
                        onChange={handleChange}
                        placeholder="e.g., @namawisata"
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Fasilitas</label>
                    <textarea
                        name="facilities"
                        value={form.facilities}
                        onChange={handleChange}
                        placeholder="Pisahkan dengan koma, contoh: Parkir, Toilet, Warung"
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                        rows={2}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Daya Tarik Utama</label>
                    <textarea
                        name="points_of_attraction"
                        value={form.points_of_attraction}
                        onChange={handleChange}
                        placeholder="Pisahkan dengan koma, contoh: Susur Pantai, Pentas Seni"
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                        rows={2}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Lokasi</label>
                    <textarea
                        name="location"
                        value={form.location}
                        onChange={handleChange}
                        placeholder="Koordinat, misal -6.614819, 110.651766"
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                        rows={2}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Gambar Wisata</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <div className="flex justify-end col-span-2">
                    <button type="submit" className="px-6 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700">
                        Simpan Wisata
                    </button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default AddAttraction;
