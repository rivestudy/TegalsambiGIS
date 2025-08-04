import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../../../components/LoadingAnimation";

interface AddUmkmProps {
    onFormSubmit: () => void;
}

const AddUmkm: React.FC<AddUmkmProps> = ({ onFormSubmit }) => {
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        time_open_close: "",
        phone: "",
        email: "",
        instagram: "",
        location: "",
        images: [] as File[],
    });
    
    // State for operational hours helper
    const [operational, setOperational] = useState({
        dayStart: "",
        dayEnd: "",
        timeStart: "",
        timeEnd: "",
    });
    const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "phone" || name === "price") {
            const onlyNumbers = value.replace(/\D/g, "");
            setForm({ ...form, [name]: onlyNumbers });
        } else {
            setForm({ ...form, [name]: value });
        }
    };
    
    const handleOperationalChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const { name, value } = e.target;
        const updated = { ...operational, [name]: value };
        setOperational(updated);

        if (updated.dayStart && updated.dayEnd && updated.timeStart && updated.timeEnd) {
            const combined = `${updated.dayStart} - ${updated.dayEnd}, ${updated.timeStart} - ${updated.timeEnd}`;
            setForm({ ...form, time_open_close: combined });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setForm({ ...form, images: Array.from(files) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple validation
        if (!form.name || !form.description || !form.price || !form.location) {
            toast.error("Mohon lengkapi semua kolom wajib.");
            return;
        }

        const formData = new FormData();
        formData.append("category", "UMKM"); // Fixed category
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("time_open_close", form.time_open_close);
        formData.append("phone", form.phone);
        formData.append("email", form.email);
        formData.append("instagram", form.instagram);
        formData.append("location", form.location);

        form.images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            await axiosInstance.post("/data/attraction", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("UMKM berhasil ditambahkan!");
            await new Promise((resolve) => setTimeout(resolve, 3600));
            onFormSubmit();
        } catch (error: any) {
            console.error("Failed to add UMKM:", error);
            const message = error.response?.data?.message || "Terjadi kesalahan saat menyimpan data.";
            toast.error(`Gagal menambahkan UMKM: ${message}`);
        }
    };

    if (loading) return <LoadingAnimation />;

    return (
        <div className="max-w-6xl p-6 mx-auto mt-4">
            <h1 className="pb-2 mb-2 text-2xl font-bold text-center text-gray-800">Tambah UMKM</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-8 bg-white border border-gray-200 shadow-lg md:grid-cols-2 rounded-xl">
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Nama Produk / Usaha</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Masukkan nama produk atau usaha" className="w-full p-2 text-sm text-gray-400 border border-gray-200 rounded" required maxLength={50} />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Deskripsi</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Tuliskan deskripsi produk atau usaha" className="w-full p-2 text-sm text-gray-400 border border-gray-200 rounded" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Harga Produk</label>
                    <input name="price" value={form.price} onChange={handleChange} placeholder="Contoh: 15000" className="w-full p-2 text-sm text-gray-400 border border-gray-200 rounded" required />
                </div>
                <div className="grid grid-cols-2 gap-4 md:col-span-2">
                    <div><label className="block mb-1 font-semibold">Hari Buka</label><select name="dayStart" onChange={handleOperationalChange} className="w-full p-2 text-sm text-gray-400 border border-gray-200 rounded"><option value="">-- Pilih --</option>{days.map(d=><option key={d} value={d}>{d}</option>)}</select></div>
                    <div><label className="block mb-1 font-semibold">Hari Tutup</label><select name="dayEnd" onChange={handleOperationalChange} className="w-full p-2 text-sm text-gray-400 border border-gray-200 rounded"><option value="">-- Pilih --</option>{days.map(d=><option key={d} value={d}>{d}</option>)}</select></div>
                    <div><label className="block mb-1 font-semibold">Jam Buka</label><input type="time" name="timeStart" onChange={handleOperationalChange} className="w-full p-2 text-sm text-gray-400 border border-gray-200 rounded" /></div>
                    <div><label className="block mb-1 font-semibold">Jam Tutup</label><input type="time" name="timeEnd" onChange={handleOperationalChange} className="w-full p-2 text-sm text-gray-400 border border-gray-200 rounded" /></div>
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Telepon</label>
                    <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Nomor kontak usaha" maxLength={15} className="w-full p-2 text-sm text-gray-400 border border-gray-200 rounded" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Alamat email usaha" className="w-full p-2 text-sm text-gray-400 border border-gray-200 rounded" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Instagram</label>
                    <input type="text" name="instagram" value={form.instagram} onChange={handleChange} placeholder="contoh @namaumkm" className="w-full p-2 text-sm text-gray-400 border border-gray-200 rounded" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Lokasi (Koordinat)</label>
                    <input name="location" value={form.location} onChange={handleChange} placeholder="Contoh: -6.614819, 110.651766" className="w-full p-2 text-sm text-gray-400 border border-gray-200 rounded" required />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Gambar Produk/Usaha</label>
                    <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
                <div className="flex justify-end col-span-2">
                    <button type="submit" className="px-6 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700">
                        Simpan UMKM
                    </button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />
        </div>
    );
};

export default AddUmkm;