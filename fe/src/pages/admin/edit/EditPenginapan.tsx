import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface PenginapanData {
    id: number;
    name: string;
    description: string;
    priceRange: string;
    checkInOut: string;
    facilities: string;
    activities: string;
    phone: string;
    email: string;
    instagram: string;
}

const EditPenginapan: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [form, setForm] = useState<PenginapanData>({
        id: Number(id),
        name: "",
        description: "",
        priceRange: "",
        checkInOut: "",
        facilities: "",
        activities: "",
        phone: "",
        email: "",
        instagram: "",
    });

    useEffect(() => {
        const dummyData = [
            {
                id: 1,
                name: "Penginapan A",
                description: "Lorem ipsum dolor sit amet...",
                priceRange: "Rp 250.000 - Rp 500.000",
                checkInOut: "Check-in: 14.00 WIB | Check-out: 12.00 WIB",
                facilities: "WiFi Gratis, TV & AC, Kamar Mandi Dalam, Parkir Luas",
                activities: "Jalan-jalan Sore, Kuliner Malam, Pasar Oleh-oleh, Menikmati Sunset",
                phone: "0821-9876-1234",
                email: "reservasi@penginapan.com",
                instagram: "@penginapan.tegalsambi",
            },
            {
                id: 2,
                name: "Penginapan B",
                description: "Tempat menginap nyaman di tengah kota...",
                priceRange: "Rp 300.000 - Rp 600.000",
                checkInOut: "Check-in: 13.00 WIB | Check-out: 11.00 WIB",
                facilities: "Kolam Renang, Restoran, AC, WiFi, Parkir Aman",
                activities: "City Tour, Shopping, Museum, Kuliner Khas",
                phone: "0822-3456-7890",
                email: "info@penginapanb.com",
                instagram: "@penginapan.b",
            },
        ];
        const selected = dummyData.find((item) => item.id === Number(id));
        if (selected) setForm(selected);
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Data Penginapan Diperbarui:", form);
        navigate("/admin/add/facilities");
    };

    return (
        <div className="max-w-4xl mx-auto px-6 py-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Edit Data Penginapan</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 shadow-md rounded-md border">
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Nama Penginapan</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Deskripsi</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full p-2 border rounded" required />
                </div>

                <div>
                    <label className="font-semibold block mb-1">Harga Per Malam</label>
                    <input name="priceRange" value={form.priceRange} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                <div>
                    <label className="font-semibold block mb-1">Jam Check-in / Check-out</label>
                    <input name="checkInOut" value={form.checkInOut} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Fasilitas</label>
                    <textarea name="facilities" value={form.facilities} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
                </div>

                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Aktivitas di Sekitar Penginapan</label>
                    <textarea name="activities" value={form.activities} onChange={handleChange} className="w-full p-2 border rounded" rows={2} />
                </div>

                <div>
                    <label className="font-semibold block mb-1">Telepon</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>

                <div>
                    <label className="font-semibold block mb-1">Email</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>

                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Instagram</label>
                    <input name="instagram" value={form.instagram} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>

                <div className="col-span-2 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate("/admin/add/facilities")} className="px-5 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium shadow-sm">
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

export default EditPenginapan;
