import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";
import LoadingAnimation from "../../../components/LoadingAnimation";

const EditPaket: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        phone: "",
        facilities: "",
        images: [] as File[],
    });

    useEffect(() => {
        const fetchPaket = async () => {
            try {
                const { data } = await axiosInstance.get(`/data/paket/${id}`);
                setForm({
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    phone: data.phone,
                    facilities: data.facilities,
                    images: [],
                });
            } catch (err) {
                alert("Gagal mengambil data paket.");
            } finally {
                setLoading(false);
            }
        };
        fetchPaket();
    }, [id]);

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("phone", form.phone);
        formData.append("facilities", form.facilities);
        form.images.forEach((file) => {
            formData.append("images", file);
        });

        try {
            await axiosInstance.put(`/data/paket/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Paket berhasil diperbarui!");
            navigate("/admin/daftar/paket");
        } catch (err) {
            console.error(err);
            alert("Gagal memperbarui paket.");
        }
    };

    if (loading) return <LoadingAnimation />;

    return (
        <div className="max-w-4xl px-4 mx-auto mt-6">
            <h1 className="mb-6 text-2xl font-bold text-center text-gray-800">Edit Paket Wisata</h1>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-8 bg-white border border-gray-200 shadow-lg md:grid-cols-2 rounded-xl">
                {/* Nama Paket */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium text-gray-700">Nama Paket</label>
                    <input name="name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded-md" />
                </div>

                {/* Deskripsi */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium text-gray-700">Deskripsi</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} required className="w-full p-2 border border-gray-200 rounded-md" />
                </div>

                {/* Harga */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Harga</label>
                    <input name="price" value={form.price} onChange={handleChange} required className="w-full p-2 border rounded-md" />
                </div>

                {/* Nomor Telepon */}
                <div>
                    <label className="block mb-1 font-medium text-gray-700">Nomor Telepon</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required className="w-full p-2 border rounded-md" />
                </div>

                {/* Fasilitas */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium text-gray-700">Fasilitas</label>
                    <textarea name="facilities" value={form.facilities} onChange={handleChange} rows={2} className="w-full p-2 border border-gray-200 rounded-md" />
                </div>

                {/* Upload Gambar */}
                <div className="col-span-2">
                    <label className="block mb-1 font-medium text-gray-700">Upload Gambar</label>
                    <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full" />
                </div>

                {/* Tombol Aksi */}
                <div className="flex justify-end col-span-2 pt-2 space-x-4">
                    <button type="button" onClick={() => navigate("/admin/daftar/paket")} className="px-5 py-2.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium shadow-sm">
                        Batal
                    </button>
                    <button type="submit" className="px-5 py-2.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium shadow-md">
                        Perbarui Paket
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditPaket;
