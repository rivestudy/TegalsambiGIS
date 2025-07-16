import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

// Form state interface
interface AccommodationFormState {
    name: string;
    description: string;
    price: string;
    time_open_close: string;
    facilities: string; // Comma-separated for the form
    points_of_attraction: string; // Comma-separated for the form
    phone: string;
    email: string;
    instagram: string;
}

const EditAccommodation: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [form, setForm] = useState<AccommodationFormState>({
        name: "",
        description: "",
        price: "",
        time_open_close: "",
        facilities: "",
        points_of_attraction: "",
        phone: "",
        email: "",
        instagram: "",
    });

    useEffect(() => {
        const fetchAccommodation = async () => {
            try {
                const response = await axiosInstance.get(`/data/accommodation/${id}`);
                const data = response.data;
                
                // Transform backend data (arrays) to form data (comma-separated strings)
                setForm({
                    name: data.name || "",
                    description: data.description || "",
                    price: data.price || "",
                    time_open_close: data.time_open_close || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    instagram: data.instagram || "",
                    facilities: Array.isArray(data.facilities) ? data.facilities.join(', ') : "",
                    points_of_attraction: Array.isArray(data.points_of_attraction) ? data.points_of_attraction.join(', ') : "",
                });
            } catch (error) {
                console.error("Failed to fetch accommodation data:", error);
                alert("Gagal memuat data penginapan.");
            }
        };

        if (id) {
            fetchAccommodation();
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Transform form data back to the structure the backend expects
        const payload = {
            ...form,
            facilities: form.facilities.split(',').map(f => f.trim()),
            points_of_attraction: form.points_of_attraction.split(',').map(a => a.trim()),
        };

        try {
            await axiosInstance.put(`/data/accommodation/${id}`, payload);
            alert("Data penginapan berhasil diperbarui!");
            // Navigate back to a relevant list page
            navigate("/admin/add/accommodation"); // Or wherever your list is
        } catch (error) {
            console.error("Failed to update accommodation:", error);
            alert("Gagal memperbarui data.");
        }
    };

    return (
        <div className="max-w-4xl px-6 py-6 mx-auto">
            <h1 className="mb-4 text-2xl font-bold text-center">Edit Data Penginapan</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-6 bg-white border rounded-md shadow-md md:grid-cols-2">
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Nama Penginapan</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Deskripsi</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Harga Per Malam</label>
                    <input name="price" value={form.price} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Jam Check-in / Check-out</label>
                    <input name="time_open_close" value={form.time_open_close} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Fasilitas</label>
                    <textarea name="facilities" value={form.facilities} onChange={handleChange} className="w-full p-2 border rounded" rows={2} placeholder="Pisahkan dengan koma..."/>
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Daya Tarik Sekitar</label>
                    <textarea name="points_of_attraction" value={form.points_of_attraction} onChange={handleChange} className="w-full p-2 border rounded" rows={2} placeholder="Pisahkan dengan koma..."/>
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Telepon</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div className="col-span-2">
                    <label className="block mb-1 font-semibold">Instagram</label>
                    <input name="instagram" value={form.instagram} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div className="flex justify-end col-span-2 space-x-4">
                    <button type="button" onClick={() => navigate("/admin/add/accommodation")} className="px-5 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium shadow-sm">
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

export default EditAccommodation;