import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import LoadingAnimation from "../../../components/LoadingAnimation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface UmkmFormState {
    name: string;
    description: string;
    price: string;
    time_open_close: string;
    phone: string;
    email: string;
    location: string;
    instagram: string;
    images: File[];
}

const EditUmkm: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState<UmkmFormState>({
        name: "",
        description: "",
        price: "",
        time_open_close: "",
        phone: "",
        email: "",
        instagram: "",
        location: "",
        images: [],
    });

    useEffect(() => {
        const fetchUmkm = async () => {
            try {
                const { data } = await axiosInstance.get(`/data/umkm/${id}`);
                setForm({
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price?.toString() || "",
                    time_open_close: data.time_open_close || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    instagram: data.instagram || "",
                    location: data.location || "",
                    images: [], // Images are handled separately on update
                });
            } catch (err) {
                toast.error("Gagal memuat data UMKM.");
            } finally {
                setLoading(false);
            }
        };

        fetchUmkm();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "phone" || name === "price") {
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

        if (!form.name || !form.description || !form.price || !form.time_open_close || !form.location) {
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

        if (form.images.length > 0) {
            form.images.forEach((file) => formData.append("images", file));
        }

        try {
            await axiosInstance.put(`/data/umkm/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Data UMKM berhasil diperbarui!");
            await new Promise((resolve) => setTimeout(resolve, 3600));
            navigate("/admin/daftar/umkm");
        } catch (err) {
            toast.error("Gagal memperbarui data UMKM.");
        }
    };

    if (loading) return <LoadingAnimation />;

    return (
        <div className="max-w-4xl px-6 py-6 mx-auto">
            <h1 className="mb-4 text-2xl font-bold text-center">Edit Data UMKM</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-6 bg-white border rounded-md shadow-md md:grid-cols-2">
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Nama Produk / Usaha</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded" required />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Deskripsi</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full p-2 border border-gray-200 rounded" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Harga Produk</label>
                    <input name="price" value={form.price} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Jam Operasional</label>
                    <input name="time_open_close" value={form.time_open_close} onChange={handleChange} placeholder="Senin - Sabtu, 08:00 - 17:00" className="w-full p-2 border border-gray-200 rounded" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Telepon</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Instagram</label>
                    <input name="instagram" value={form.instagram} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Lokasi (Koordinat)</label>
                    <input name="location" value={form.location} onChange={handleChange} className="w-full p-2 border border-gray-200 rounded" required />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Upload Gambar Baru (Opsional)</label>
                    <p className="mb-2 text-xs italic text-gray-500">Unggah gambar baru untuk menggantikan yang lama. Jika tidak ada gambar yang diunggah, gambar lama akan tetap digunakan.</p>
                    <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full" />
                </div>
                <div className="flex justify-end col-span-2 space-x-4">
                    <button type="button" onClick={() => navigate("/admin/daftar/umkm")} className="px-5 py-2.5 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition font-medium shadow-sm">
                        Batal
                    </button>
                    <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium shadow-md">
                        Perbarui UMKM
                    </button>
                </div>
            </form>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="colored" />
        </div>
    );
};

export default EditUmkm;