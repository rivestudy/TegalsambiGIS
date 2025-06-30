import React, { useState } from "react";

const AddMap: React.FC = () => {
    const [form, setForm] = useState({
        name: "",
        // description: "",
        category: "",
        latitude: "",
        longitude: "",
        mapEmbed: "",
        // images: [] as File[],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const files = e.target.files;
    //     if (files) {
    //         setForm({ ...form, images: Array.from(files) });
    //     }
    // };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Data lokasi disubmit:", form);
        // TODO: kirim ke server
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <h1 className="text-2xl text-center pb-2 font-bold mb-4 text-gray-800">Tambah Lokasi Baru</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg p-8 rounded-xl border border-gray-200">
                {/* Nama Lokasi */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Nama Lokasi</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                {/* Deskripsi */}
                {/* <div className="col-span-2">
                    <label className="font-semibold block mb-1">Deskripsi</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full p-2 border rounded" required />
                </div> */}

                {/* Kategori */}
                <div className="col-span-2 md:col-span-1">
                    <label className="font-semibold block mb-1">Kategori</label>
                    <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded" required>
                        <option value="">Pilih Kategori</option>
                        <option value="wisata">Wisata Religi</option>
                        <option value="wisata">Wisata Budaya</option>
                        <option value="wisata">Wisata Pesisir</option>
                        <option value="kantor">Kantor</option>
                        <option value="fasilitas">Fasilitas</option>
                        <option value="penginapan">Penginapan</option>
                    </select>
                </div>

                {/* Embed Map */}
                <div className="col-span-2 md:col-span-1">
                    <label className="font-semibold block mb-1">Link Embed Google Maps</label>
                    <input type="text" name="mapEmbed" value={form.mapEmbed} onChange={handleChange} className="w-full p-2 border rounded" placeholder="https://www.google.com/maps/embed?pb=..." />
                </div>

                {/* Koordinat */}
                <div>
                    <label className="font-semibold block mb-1">Latitude</label>
                    <input type="text" name="latitude" value={form.latitude} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>
                <div>
                    <label className="font-semibold block mb-1">Longitude</label>
                    <input type="text" name="longitude" value={form.longitude} onChange={handleChange} className="w-full p-2 border rounded" />
                </div>

                {/* Upload Gambar */}
                {/* <div className="col-span-2">
                    <label className="font-semibold block mb-1">Gambar Lokasi</label>
                    <input type="file" multiple accept="image/*" onChange={handleFileChange} className="text-sm text-gray-700" />
                    <p className="text-sm text-gray-500">* Maksimal 5 gambar. Format: JPG, PNG</p>
                </div> */}

                {/* Tombol Simpan */}
                <div className="col-span-2 flex justify-end">
                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
                        Simpan Lokasi
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddMap;
