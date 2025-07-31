import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import LoadingAnimation from "../../../components/LoadingAnimation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddAccommodationProps {
    onFormSubmit: () => void;
}

const AddAccommodation: React.FC<AddAccommodationProps> = ({ onFormSubmit }) => {
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        time_check_in: "",
        time_check_out: "",
        facilities: "",
        points_of_attraction: "",
        phone: "",
        email: "",
        instagram: "",
        images: [] as File[],
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === "phone") {
            const onlyNumbers = value.replace(/\D/g, "");
            if (onlyNumbers.length > 15) return;
            setForm({ ...form, phone: onlyNumbers });
        } else if (name === "price") {
            const onlyNumbers = value.replace(/\D/g, "");
            setForm({ ...form, price: onlyNumbers });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setForm({ ...form, images: Array.from(e.target.files) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi input wajib
        if (!form.name || !form.description || !form.phone || !form.email) {
            toast.error("Nama, deskripsi, email, dan nomor telepon wajib diisi.");
            return;
        }

        // Validasi nomor telepon
        if (!form.phone || form.phone.length < 8 || form.phone.length > 15) {
            toast.error("Nomor telepon harus berupa angka, minimal 8 digit dan maksimal 15 digit.");
            return;
        }

        // Validasi format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!form.email || !emailRegex.test(form.email)) {
            toast.error("Format email tidak valid.");
            return;
        }

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("time_open_close", `Check-in ${form.time_check_in}, Check-out ${form.time_check_out}`);
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
            toast.success("Penginapan berhasil ditambahkan!");
            await new Promise((resolve) => setTimeout(resolve, 3600));
            onFormSubmit();
        } catch (error) {
            console.error("Failed to add accommodation:", error);
            toast.error("Gagal menambahkan penginapan.");
        }
    };

    if (loading) return <LoadingAnimation />;

    return (
        <div className="max-w-6xl p-6 mx-auto mt-4">
            <h1 className="pb-2 mb-4 text-2xl font-bold text-center text-gray-800">Tambah Penginapan</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-8 bg-white border border-gray-200 shadow-lg md:grid-cols-2 rounded-xl">
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Nama Penginapan</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} required placeholder="Masukkan nama penginapan" className="w-full p-2 text-sm border rounded placeholder:text-gray-400" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Deskripsi</label>
                    <textarea name="description" value={form.description} onChange={handleChange} required placeholder="Tulis deskripsi penginapan" rows={4} className="w-full p-2 text-sm border rounded placeholder:text-gray-400" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Harga Per Malam</label>
                    <input type="text" name="price" value={form.price} onChange={handleChange} placeholder="Contoh: Rp 500.000" className="w-full p-2 text-sm border rounded placeholder:text-gray-400" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Jam Check-in</label>
                    <input type="time" name="time_check_in" value={form.time_check_in} onChange={handleChange} placeholder="Contoh: 14.00" required className="w-full p-2 text-sm border rounded" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Jam Check-out</label>
                    <input type="time" name="time_check_out" value={form.time_check_out} onChange={handleChange} required className="w-full p-2 text-sm border rounded" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Telepon</label>
                    <input type="text" name="phone" value={form.phone} onChange={handleChange} required placeholder="Masukkan nomor telepon" className="w-full p-2 text-sm border rounded placeholder:text-gray-400" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required placeholder="Masukkan alamat email" className="w-full p-2 text-sm border rounded placeholder:text-gray-400" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Instagram</label>
                    <input type="text" name="instagram" value={form.instagram} onChange={handleChange} placeholder="Masukkan username Instagram" className="w-full p-2 text-sm border rounded placeholder:text-gray-400" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Fasilitas</label>
                    <textarea name="facilities" value={form.facilities} onChange={handleChange} placeholder="Pisahkan dengan koma, contoh: WiFi, AC, Parkir" rows={2} className="w-full p-2 text-sm border rounded placeholder:text-gray-400" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Daya Tarik Sekitar</label>
                    <textarea
                        name="points_of_attraction"
                        value={form.points_of_attraction}
                        onChange={handleChange}
                        placeholder="Pisahkan dengan koma, contoh: Dekat pantai, Kuliner"
                        rows={2}
                        className="w-full p-2 text-sm border rounded placeholder:text-gray-400"
                    />
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
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AddAccommodation;
