import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingAnimation from "../../../components/LoadingAnimation";

interface LokasiData {
    id: number;
    name: string;
    category: string;
    embedUrl: string;
    latitude: string;
    longitude: string;
}

const EditMap: React.FC = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState<LokasiData>({
        id: Number(id),
        name: "",
        category: "",
        embedUrl: "",
        latitude: "",
        longitude: "",
    });

    useEffect(() => {
        const dummyData: LokasiData[] = [
            {
                id: 1,
                name: "Makam A",
                category: "wisataReligi",
                embedUrl: "https://www.google.com/maps/embed?pb=!1m18...a",
                latitude: "-6.5678",
                longitude: "110.6789",
            },
            {
                id: 2,
                name: "Makam B",
                category: "wisataReligi",
                embedUrl: "https://www.google.com/maps/embed?pb=!1m18...b",
                latitude: "-6.6000",
                longitude: "110.7000",
            },
        ];
        const selected = dummyData.find((item) => item.id === Number(id));
        if (selected) {
            setForm(selected);
        }
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Data Lokasi Diperbarui:", form);
        navigate("/admin/add/map");
    };

    if (loading) return <LoadingAnimation />;

    return (
        <div className="max-w-3xl mx-auto px-6 py-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Edit Data Lokasi</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 shadow-md rounded-md border">
                {/* Nama Lokasi */}
                <div className="col-span-2">
                    <label className="font-semibold block mb-1">Nama Lokasi</label>
                    <input name="name" value={form.name} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                {/* Kategori */}
                <div>
                    <label className="font-semibold block mb-1">Kategori</label>
                    <select name="category" value={form.category} onChange={handleChange} className="w-full p-2 border rounded" required>
                        <option value="">Pilih Kategori</option>
                        <option value="wisataReligi">Wisata Religi</option>
                        <option value="wisataBudaya">Wisata Budaya</option>
                        <option value="wisataPesisir">Wisata Pesisir</option>
                        <option value="persawahan">Persawahan</option>
                        <option value="kantor">Kantor Desa</option>
                        <option value="fasilitas">Fasilitas Umum</option>
                        <option value="penginapan">Penginapan</option>
                    </select>
                </div>

                {/* Embed URL */}
                <div>
                    <label className="font-semibold block mb-1">Link Embed Google Maps</label>
                    <input name="embedUrl" value={form.embedUrl} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                {/* Latitude */}
                <div>
                    <label className="font-semibold block mb-1">Latitude</label>
                    <input name="latitude" value={form.latitude} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                {/* Longitude */}
                <div>
                    <label className="font-semibold block mb-1">Longitude</label>
                    <input name="longitude" value={form.longitude} onChange={handleChange} className="w-full p-2 border rounded" required />
                </div>

                {/* Tombol Aksi */}
                <div className="col-span-2 flex justify-end space-x-4">
                    <button type="button" onClick={() => navigate("/admin/daftar/map")} className="px-5 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium shadow-sm">
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

export default EditMap;
