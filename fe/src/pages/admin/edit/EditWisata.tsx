import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance"; // Your axios instance
import LoadingAnimation from "../../../components/LoadingAnimation";

// This interface matches the form state
interface AttractionFormState {
    category: string;
    name: string;
    description: string;
    price: string;
    time_open_close: string;
    phone: string;
    email: string;
    location: string;
    instagram: string;
    facilities: string; // Comma-separated string for the form
    points_of_attraction: string; // Comma-separated string for the form
}

const EditWisata: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState<AttractionFormState>({
        category: "",
        name: "",
        description: "",
        price: "",
        time_open_close: "",
        phone: "",
        email: "",
        instagram: "",
        location: "",
        facilities: "",
        points_of_attraction: "",
    });

    // Fetch data for the specific attraction
    useEffect(() => {
        const fetchAttraction = async () => {
            try {
                const response = await axiosInstance.get(`/data/attraction/${id}`);
                const data = response.data;

                // Transform backend data to match form state
                setForm({
                    category: data.category || "",
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price || "",
                    time_open_close: data.time_open_close || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    instagram: data.instagram || "",
                    location: data.location || "",
                    facilities: Array.isArray(data.facilities) ? data.facilities.join(", ") : "",
                    points_of_attraction: Array.isArray(data.points_of_attraction) ? data.points_of_attraction.join(", ") : "",
                });
            } catch (error) {
                console.error("Failed to fetch attraction data:", error);
                alert("Gagal memuat data wisata.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchAttraction();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Prepare payload for the API, transforming data back
        const payload = {
            ...form,
            facilities: form.facilities.split(",").map((f) => f.trim()),
            points_of_attraction: form.points_of_attraction.split(",").map((a) => a.trim()),
        };

        try {
            await axiosInstance.put(`/data/attraction/${id}`, payload);
            alert("Data berhasil diperbarui!");
            navigate("/admin/daftar/wisata");
        } catch (error) {
            console.error("Failed to update attraction:", error);
            alert("Gagal memperbarui data.");
        }
    };

    return loading ? (
        <LoadingAnimation />
    ) : (
        <div className="max-w-4xl px-6 py-6 mx-auto">
            <h1 className="mb-4 text-2xl font-bold text-center">Edit Data Wisata</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-6 bg-white border rounded-md shadow-md md:grid-cols-2">
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Kategori</label>
                    <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">-- Pilih Kategori --</option>
                        <option value="Religi">Wisata Religi</option>
                        <option value="Budaya">Wisata Budaya</option>
                        <option value="Pesisir">Wisata Pesisir</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Nama</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Deskripsi</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Harga Tiket</label>
                    <input name="price" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Jam Operasional</label>
                    <input name="time_open_close" value={form.time_open_close} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Telepon</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Instagram</label>
                    <input name="instagram" value={form.instagram} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Lokasi</label>
                    <input name="location" value={form.location} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Fasilitas</label>
                    <textarea name="facilities" value={form.facilities} onChange={handleChange} className="w-full p-2 border rounded" rows={2} placeholder="Pisahkan dengan koma..." />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Daya Tarik Utama</label>
                    <textarea name="points_of_attraction" value={form.points_of_attraction} onChange={handleChange} className="w-full p-2 border rounded" rows={2} placeholder="Pisahkan dengan koma..." />
                </div>
                <div className="flex justify-end col-span-2 space-x-4">
                    <button type="button" onClick={() => navigate("/admin/daftar/wisata")} className="px-5 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium shadow-sm">
                        Batal
                    </button>
                    <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium shadow-md">
                        Perbarui Wisata
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditWisata;
