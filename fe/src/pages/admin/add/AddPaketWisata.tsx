import React, { useState, useEffect } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingAnimation from "../../../components/LoadingAnimation";

interface AddPaketProps {
    onFormSubmit: () => void;
}

const AddPaket: React.FC<AddPaketProps> = ({ onFormSubmit }) => {
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        phone: "",
        facilities: "",
        images: [] as File[],
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "price" || name === "phone") {
            const onlyNumbers = value.replace(/\D/g, "");
            setForm({ ...form, [name]: onlyNumbers });
        } else {
            setForm({ ...form, [name]: value });
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

        if (!form.name || !form.description || !form.price || !form.phone) {
            toast.error("Mohon lengkapi semua kolom wajib.");
            return;
        }

        const phoneRegex = /^\d+$/;
        if (!phoneRegex.test(form.phone) || form.phone.length < 8) {
            toast.error("Nomor telepon harus berupa angka dan minimal 8 digit.");
            return;
        }

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("phone", form.phone);
        formData.append(
            "facilities",
            JSON.stringify(
                form.facilities
                    .split(",")
                    .map((f) => f.trim())
                    .filter((f) => f !== "")
            )
        );

        form.images.forEach((img) => {
            formData.append("images", img);
        });

        try {
            await axiosInstance.post("/data/paket", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Paket berhasil ditambahkan!");
            await new Promise((res) => setTimeout(res, 3600));
            onFormSubmit();
        } catch (err) {
            console.error(err);
            toast.error("Gagal menambahkan paket.");
        }
    };

    if (loading) return <LoadingAnimation />;

    return (
        <div className="max-w-4xl p-6 mx-auto mt-4">
            <h1 className="pb-2 mb-4 text-2xl font-bold text-center text-gray-800">Tambah Paket Wisata</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-8 bg-white border border-gray-200 shadow-lg rounded-xl">
                <div>
                    <label className="block mb-1 font-semibold">Nama Paket</label>
                    <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        maxLength={50}
                        placeholder="Masukkan nama paket"
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Deskripsi</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="Tuliskan deskripsi paket"
                        rows={3}
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Harga</label>
                    <input name="price" value={form.price} onChange={handleChange} placeholder="Harga" className="w-full p-2 text-sm border border-gray-600 rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Telepon</label>
                    <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="Kontak yang bisa dihubungi"
                        maxLength={15}
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Fasilitas</label>
                    <textarea
                        name="facilities"
                        value={form.facilities}
                        onChange={handleChange}
                        placeholder="Pisahkan dengan koma, contoh: Transportasi, Makan, Penginapan"
                        className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400"
                        rows={2}
                    />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Gambar Paket</label>
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
                        Simpan Paket
                    </button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />
        </div>
    );
};

export default AddPaket;
