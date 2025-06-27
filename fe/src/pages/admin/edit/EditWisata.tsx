import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface AttractionData {
    id: number;
    category: string;
    name: string;
    description: string;
    ticketPrice: string;
    openingHours: string;
    phone: string;
    email: string;
    instagram: string;
    facilities: string;
    activities: string;
}

const EditWisata: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState<AttractionData>({
        id: Number(id),
        category: "",
        name: "",
        description: "",
        ticketPrice: "",
        openingHours: "",
        phone: "",
        email: "",
        instagram: "",
        facilities: "",
        activities: "",
    });

    useEffect(() => {
        // TODO: Ganti dengan ambil data dari server
        const dummyData = [
            {
                id: 1,
                name: "Pantai Bahagia",
                category: "Pesisir",
                description: "Pantai indah.",
                ticketPrice: "5000",
                openingHours: "07.00 - 18.00",
                phone: "08211234567",
                email: "pantai@example.com",
                instagram: "@pantai",
                facilities: "Parkir, Toilet",
                activities: "Renang, Susur Pantai",
            },
            {
                id: 2,
                name: "Candi Suci",
                category: "Religi",
                description: "Candi kuno.",
                ticketPrice: "10000",
                openingHours: "08.00 - 17.00",
                phone: "08123456789",
                email: "candi@example.com",
                instagram: "@candi",
                facilities: "Warung, Toilet",
                activities: "Ziarah, Sejarah",
            },
        ];
        const selected = dummyData.find((item) => item.id === Number(id));
        if (selected) setForm(selected);
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Data diperbarui:", form);
        navigate("/admin/wisata");
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Edit Data Wisata</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 shadow-md rounded-md border">
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Kategori</label>
                    <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded">
                        <option value="">-- Pilih Kategori --</option>
                        <option value="Religi">Wisata Religi</option>
                        <option value="Budaya">Wisata Budaya</option>
                        <option value="Pesisir">Wisata Pesisir</option>
                    </select>
                </div>
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Nama</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Deskripsi</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full p-2 border rounded" required />
                </div>
                <div>
                    <label className="font-semibold block mb-1">Harga Tiket</label>
                    <input name="ticketPrice" value={form.ticketPrice} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="font-semibold block mb-1">Jam Operasional</label>
                    <input name="openingHours" value={form.openingHours} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="font-semibold block mb-1">Telepon</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="font-semibold block mb-1">Email</label>
                    <input name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Instagram</label>
                    <input name="instagram" value={form.instagram} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Fasilitas</label>
                    <textarea name="facilities" value={form.facilities} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
                </div>
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Aktivitas</label>
                    <textarea name="activities" value={form.activities} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
                </div>
                <div className="col-span-2 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate("/admin/add/attraction")} className="px-5 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium shadow-sm">
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

export default EditWisata;
