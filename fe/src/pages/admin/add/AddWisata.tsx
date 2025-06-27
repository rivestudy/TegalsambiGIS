import React, { useState } from "react";

const AddAttraction: React.FC = () => {
    const [form, setForm] = useState({
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
        images: [] as File[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        console.log("Submitted Data:", form);
    };

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-2xl text-center pb-2 font-bold mb-2 text-gray-800"> Tambah Wisata</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg p-8 rounded-xl border border-gray-200">
                {/* Dropdown Kategori */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Kategori Wisata</label>
                    <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" required>
                        <option value="">-- Pilih Kategori --</option>
                        <option value="Religi">Wisata Religi</option>
                        <option value="Budaya">Wisata Budaya</option>
                        <option value="Pesisir">Wisata Pesisir</option>
                    </select>
                </div>

                {/* Nama */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Nama Wisata</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" required />
                </div>

                {/* Deskripsi */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Deskripsi</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={4} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" required />
                </div>

                {/* Harga & Jam */}
                <div>
                    <label className="font-semibold block mb-1">Harga Tiket (per orang)</label>
                    <input type="text" name="ticketPrice" value={form.ticketPrice} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" required />
                </div>
                <div>
                    <label className="font-semibold block mb-1">Jam Operasional</label>
                    <input
                        type="text"
                        name="openingHours"
                        placeholder="contoh: Senin - Minggu, 08.00 - 17.00 WIB"
                        value={form.openingHours}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                        required
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

                {/* Instagram */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Instagram</label>
                    <input type="text" name="instagram" value={form.instagram} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" />
                </div>

                {/* Fasilitas */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Fasilitas</label>
                    <textarea name="facilities" placeholder="Contoh: Parkir Luas, Toilet, Warung Makan" value={form.facilities} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400" rows={2} />
                </div>

                {/* Aktivitas */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Atraksi / Aktivitas</label>
                    <textarea
                        name="activities"
                        placeholder="Contoh: Susur Pantai, Pentas Seni, Workshop Budaya"
                        value={form.activities}
                        onChange={handleChange}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400"
                        rows={2}
                    />
                </div>

                {/* Gambar */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Gambar Wisata</label>

                    <div className="w-full border border-black rounded px-4 py-0 bg-gray-50 flex flex-col items-start gap-2">
                        <input type="file" multiple accept="image/*" onChange={handleFileChange} className="text-sm text-gray-700" />
                    </div>
                    <p className="text-sm text-gray-500">* Maksimal 5 gambar. Format: JPG, PNG</p>
                </div>

                {/* Tombol */}
                <div className="col-span-2 flex justify-end">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Simpan Wisata
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddAttraction;
