import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

interface PaketWisataFormState {
    name: string;
    description: string;
    price: string;
    facilities: string;
    phone: string;
    email: string;
    instagram: string;
}

const EditPaketWisata: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [form, setForm] = useState<PaketWisataFormState>({
        name: "",
        description: "",
        price: "",
        facilities: "",
        phone: "",
        email: "",
        instagram: "",
    });

    useEffect(() => {
        const fetchPaket = async () => {
            try {
                const response = await axiosInstance.get(`/data/paket/${id}`);
                const data = response.data;

                setForm({
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    instagram: data.instagram || "",
                    facilities: Array.isArray(data.facilities) ? data.facilities.join(", ") : "",
                });
            } catch (error) {
                console.error("Gagal memuat data paket wisata:", error);
                alert("Gagal memuat data paket wisata.");
            }
        };

        if (id) fetchPaket();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...form,
            facilities: form.facilities.split(",").map((f) => f.trim()),
        };

        try {
            await axiosInstance.put(`/data/paket/${id}`, payload);
            alert("Data paket wisata berhasil diperbarui!");
            navigate("/admin/list/paket");
        } catch (error) {
            console.error("Gagal memperbarui paket wisata:", error);
            alert("Gagal memperbarui data paket wisata.");
        }
    };

    return (
        <div className="max-w-4xl px-6 py-6 mx-auto">
            <h1 className="mb-4 text-2xl font-bold text-center">Edit Data Paket Wisata</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-6 bg-white border rounded-md shadow-md md:grid-cols-2">
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Nama Paket Wisata</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-400 text-sm" placeholder="Masukkan nama" required />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Deskripsi</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full p-2 border rounded placeholder-gray-400 text-sm" placeholder="Masukkan deskripsi" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Harga</label>
                    <input name="price" value={form.price} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-400 text-sm" placeholder="Contoh: 50000" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Telepon</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-400 text-sm" placeholder="Contoh: 08123456789" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Fasilitas</label>
                    <textarea name="facilities" value={form.facilities} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-400 text-sm" rows={2} placeholder="Pisahkan dengan koma..." />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-400 text-sm" placeholder="contoh@email.com" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Instagram</label>
                    <input name="instagram" value={form.instagram} onChange={handleChange} className="w-full p-2 border rounded placeholder-gray-400 text-sm" placeholder="Contoh: wisatajepara" />
                </div>
                <div className="flex justify-end col-span-2 space-x-4">
                    <button type="button" onClick={() => navigate("/admin/list/paket")} className="px-5 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium shadow-sm">
                        Batal
                    </button>
                    <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium shadow-md">
                        Simpan Perubahan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPaketWisata;
