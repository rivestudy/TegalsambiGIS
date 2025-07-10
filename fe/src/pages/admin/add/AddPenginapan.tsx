import React, { useState } from "react";

const AddFacilities: React.FC = () => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        priceRange: "",
        checkIn: "",
        checkOut: "",
        facilities: "",
        activities: "",
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Data penginapan disubmit:", form);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl text-center pb-2 font-bold mb-4 text-gray-800">Tambah Penginapan</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg p-8 rounded-xl border border-gray-200">
                {/* Nama Penginapan */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Nama Penginapan</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" required />
                </div>

                {/* Deskripsi */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Tentang Penginapan</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" required />
                </div>

                {/* Harga & Jam Check-in/out */}
                <div>
                    <label className="font-semibold block mb-1">Harga Per Malam</label>
                    <input type="text" name="priceRange" value={form.priceRange} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" placeholder="Contoh: Rp 500.000" />
                </div>
                <div>
                    <label className="font-semibold block mb-1">Jam Check-in</label>
                    <input type="text" name="checkIn" value={form.checkIn} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" placeholder="Contoh: 14.00 WIB" />
                    <label className="font-semibold block mt-4 mb-1">Jam Check-out</label>
                    <input type="text" name="checkOut" value={form.checkOut} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" placeholder="Contoh: 12.00 WIB" />
                </div>

                {/* Fasilitas */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Fasilitas Unggulan</label>
                    <textarea
                        name="facilities"
                        placeholder="Contoh: WiFi Gratis, TV & AC, Kamar Mandi Dalam, Parkir Luas"
                        value={form.facilities}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                        rows={2}
                    />
                </div>

                {/* Aktivitas Sekitar */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Daya Tarik Utama</label>
                    <textarea
                        name="activities"
                        placeholder="Contoh: Jalan-jalan Sore, Kuliner Malam, Pasar Oleh-oleh, Menikmati Sunset"
                        value={form.activities}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                        rows={2}
                    />
                </div>

                {/* Kontak */}
                <div>
                    <label className="font-semibold block mb-1">Telepon</label>
                    <input type="text" name="phone" value={form.phone} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                    <label className="font-semibold block mb-1">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" />
                </div>
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Instagram</label>
                    <input type="text" name="instagram" value={form.instagram} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" />
                </div>

                {/* Upload Gambar */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Gambar Penginapan</label>
                    <div className="w-full border border-black rounded px-4 py-0 bg-gray-50 flex flex-col items-start gap-2">
                        <input type="file" multiple accept="image/*" onChange={handleFileChange} className="text-sm text-gray-700" />
                    </div>
                    <p className="text-sm text-gray-500">* Maksimal 5 gambar. Format: JPG, PNG</p>
                </div>

                {/* Tombol Simpan */}
                <div className="col-span-2 flex justify-end">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Simpan Penginapan
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddFacilities;
