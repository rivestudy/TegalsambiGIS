import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";

interface AddAccommodationProps {
    onFormSubmit: () => void;
}

const AddAccommodation: React.FC<AddAccommodationProps> = ({ onFormSubmit }) => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        time_open_close: "",
        facilities: "",
        points_of_attraction: "",
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
        if (e.target.files) {
            setForm({ ...form, images: Array.from(e.target.files) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("time_open_close", form.time_open_close);
        formData.append("phone", form.phone);
        formData.append("email", form.email);
        formData.append("instagram", form.instagram);

        formData.append("facilities", JSON.stringify(form.facilities.split(",").map((f) => f.trim())));
        formData.append("points_of_attraction", JSON.stringify(form.points_of_attraction.split(",").map((a) => a.trim())));

        form.images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            await axiosInstance.post("/data/accommodation", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Penginapan berhasil ditambahkan!");
            onFormSubmit();
        } catch (error) {
            console.error("Failed to add accommodation:", error);
            alert("Gagal menambahkan penginapan.");
        }
    };

    return (
        <div className="max-w-6xl p-6 mx-auto mt-4">
            <h1 className="pb-2 mb-4 text-2xl font-bold text-center text-gray-800">Tambah Penginapan</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-8 bg-white border border-gray-200 shadow-lg md:grid-cols-2 rounded-xl">
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Nama Penginapan</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 text-sm text-gray-700 placeholder-gray-400 border rounded" placeholder="Masukkan nama penginapan" required />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Deskripsi</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full p-2 text-sm text-gray-700 placeholder-gray-400 border rounded" placeholder="Tulis deskripsi penginapan" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Harga Per Malam</label>
                    <input type="text" name="price" value={form.price} onChange={handleChange} className="w-full p-2 text-sm text-gray-700 placeholder-gray-400 border rounded" placeholder="Contoh: Rp 500.000" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Jam Check-in / Check-out</label>
                    <input
                        type="text"
                        name="time_open_close"
                        value={form.time_open_close}
                        onChange={handleChange}
                        className="w-full p-2 text-sm text-gray-700 placeholder-gray-400 border rounded"
                        placeholder="Contoh: Check-in 14.00, Check-out 12.00"
                    />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Fasilitas</label>
                    <textarea
                        name="facilities"
                        placeholder="Pisahkan dengan koma, contoh: WiFi, AC, Parkir"
                        value={form.facilities}
                        onChange={handleChange}
                        className="w-full p-2 text-sm text-gray-700 placeholder-gray-400 border rounded"
                        rows={2}
                    />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Daya Tarik Sekitar</label>
                    <textarea
                        name="points_of_attraction"
                        placeholder="Pisahkan dengan koma, contoh: Dekat pantai, Kuliner"
                        value={form.points_of_attraction}
                        onChange={handleChange}
                        className="w-full p-2 text-sm text-gray-700 placeholder-gray-400 border rounded"
                        rows={2}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Telepon</label>
                    <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 text-sm text-gray-700 placeholder-gray-400 border rounded" placeholder="Masukkan nomor telepon" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 text-sm text-gray-700 placeholder-gray-400 border rounded" placeholder="Masukkan alamat email" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Instagram</label>
                    <input type="text" name="instagram" value={form.instagram} onChange={handleChange} className="w-full p-2 text-sm text-gray-700 placeholder-gray-400 border rounded" placeholder="Masukkan username Instagram" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Gambar Penginapan</label>
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
                        Simpan Penginapan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAccommodation;
