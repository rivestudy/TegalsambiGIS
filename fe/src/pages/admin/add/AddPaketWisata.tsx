import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddPaketWisataProps {
    onFormSubmit: () => void;
}

const AddPaketWisata: React.FC<AddPaketWisataProps> = ({ onFormSubmit }) => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        facilities: "",
        phone: "",
        email: "",
        instagram: "",
        images: [] as File[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("phone", form.phone);
        formData.append("email", form.email);
        formData.append("instagram", form.instagram);
        formData.append("facilities", JSON.stringify(form.facilities.split(",").map((f) => f.trim())));
        form.images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            await axiosInstance.post("/data/paket", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Paket wisata berhasil ditambahkan!");
            onFormSubmit();
        } catch (error) {
            console.error("Gagal menambahkan paket wisata:", error);
            toast.error("Gagal menambahkan paket wisata.");
        }
    };

    const inputClass = "w-full p-2 border rounded placeholder:text-gray-400 placeholder:text-sm focus:ring-2 focus:ring-blue-400";

    return (
        <div className="max-w-4xl p-6 mx-auto mt-4">
            <h1 className="pb-2 mb-4 text-2xl font-bold text-center text-gray-800">Tambah Paket Wisata</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-8 bg-white border border-gray-200 shadow-lg rounded-xl lg:grid-cols-2">
                <div>
                    <label className="block mb-1 font-semibold">Nama Paket Wisata</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Masukkan nama paket wisata" className={inputClass} />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Harga Paket</label>
                    <input type="text" name="price" value={form.price} onChange={handleChange} className={inputClass} placeholder="Contoh: Rp 50.000" />
                </div>
                <div className="lg:col-span-2">
                    <label className="block mb-1 font-semibold">Deskripsi Paket Wisata</label>
                    <textarea name="description" rows={4} value={form.description} onChange={handleChange} required placeholder="Tulis deskripsi paket wisata" className={inputClass} />
                </div>
                <div className="lg:col-span-2">
                    <label className="block mb-1 font-semibold">Fasilitas</label>
                    <textarea name="facilities" value={form.facilities} onChange={handleChange} placeholder="Pisahkan dengan koma, contoh: Transportasi, Makan Siang, Pemandu" className={inputClass} rows={2} />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Telepon</label>
                    <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Masukkan nomor telepon" className={inputClass} />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Masukkan alamat email" className={inputClass} />
                </div>
                <div className="lg:col-span-2">
                    <label className="block mb-1 font-semibold">Instagram</label>
                    <input type="text" name="instagram" placeholder="Masukkan username Instagram" value={form.instagram} onChange={handleChange} className={inputClass} />
                </div>
                <div className="lg:col-span-2">
                    <label className="block mb-1 font-semibold">Gambar Paket</label>
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleFileChange}
                        className="w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <div className="flex justify-end lg:col-span-2">
                    <button type="submit" className="px-6 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700">
                        Simpan Paket
                    </button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </div>
    );
};

export default AddPaketWisata;
