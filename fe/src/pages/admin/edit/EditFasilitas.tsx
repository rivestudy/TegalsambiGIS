import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

const EditFasilitas: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: "",
        description: "",
        facilities: "",
        location: "",
        images: [] as File[],
    });

    useEffect(() => {
        const fetchFasilitas = async () => {
            try {
                const response = await axiosInstance.get(`/data/facility/${id}`);
                const data = response.data;
                setForm({
                    name: data.name,
                    description: data.description,
                    facilities: data.facilities.join(", "),
                    location: data.location,
                    images: [],
                });
            } catch (error) {
                console.error("Gagal memuat data fasilitas:", error);
                alert("Gagal memuat data fasilitas.");
            }
        };
        fetchFasilitas();
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
        formData.append("facilities", JSON.stringify(form.facilities.split(",").map((s) => s.trim())));
        formData.append("location", form.location);
        form.images.forEach((image) => {
            formData.append("images", image);
        });

        try {
            await axiosInstance.put(`/data/facility/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Fasilitas berhasil diperbarui!");
            navigate("/admin/daftar/fasilitas");
        } catch (error) {
            console.error("Gagal memperbarui fasilitas:", error);
            alert("Gagal memperbarui fasilitas.");
        }
    };

    return (
        <div className="max-w-4xl p-6 mx-auto mt-4">
            <h1 className="pb-2 mb-4 text-2xl font-bold text-center text-gray-800">Edit Fasilitas</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-8 bg-white border border-gray-200 shadow-lg rounded-xl">
                <div>
                    <label className="block mb-1 font-semibold">Nama Fasilitas</label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Deskripsi Fasilitas</label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Sub-fasilitas</label>
                    <textarea name="facilities" value={form.facilities} onChange={handleChange} rows={2} className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Lokasi Fasilitas</label>
                    <input type="text" name="location" value={form.location} onChange={handleChange} className="w-full p-2 text-sm border rounded focus:ring-2 focus:ring-blue-400" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Ganti Gambar (opsional)</label>
                    <input type="file" multiple accept="image/*" onChange={handleFileChange} className="w-full text-sm file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                </div>
                <div className="flex justify-end">
                    <button type="submit" className="px-6 py-2 text-white transition bg-blue-600 rounded-md hover:bg-blue-700">
                        Perbarui Fasilitas
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditFasilitas;
