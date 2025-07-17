import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

const EditFasilitas: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        nama_fasilitas: "",
        deskripsi_fasilitas: "",
        sub_fasilitas: "",
        lokasi_fasilitas: "",
        gambar_fasilitas: [] as File[],
    });

    useEffect(() => {
        const fetchFasilitas = async () => {
            try {
                const response = await axiosInstance.get(`/data/fasilitas/${id}`);
                const data = response.data;
                setForm({
                    nama_fasilitas: data.nama_fasilitas,
                    deskripsi_fasilitas: data.deskripsi_fasilitas,
                    sub_fasilitas: data.sub_fasilitas.join(", "),
                    lokasi_fasilitas: data.lokasi_fasilitas,
                    gambar_fasilitas: [],
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
            setForm({ ...form, gambar_fasilitas: Array.from(files) });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("nama_fasilitas", form.nama_fasilitas);
        formData.append("deskripsi_fasilitas", form.deskripsi_fasilitas);
        formData.append("sub_fasilitas", JSON.stringify(form.sub_fasilitas.split(",").map((s) => s.trim())));
        formData.append("lokasi_fasilitas", form.lokasi_fasilitas);
        form.gambar_fasilitas.forEach((image) => {
            formData.append("gambar_fasilitas", image);
        });

        try {
            await axiosInstance.put(`/data/fasilitas/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            alert("Fasilitas berhasil diperbarui!");
            navigate("/admin/facilities");
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
                    <input type="text" name="nama_fasilitas" value={form.nama_fasilitas} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 text-sm" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Deskripsi Fasilitas</label>
                    <textarea name="deskripsi_fasilitas" value={form.deskripsi_fasilitas} onChange={handleChange} rows={3} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 text-sm" required />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Sub-fasilitas</label>
                    <textarea name="sub_fasilitas" value={form.sub_fasilitas} onChange={handleChange} rows={2} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 text-sm" />
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Lokasi Fasilitas</label>
                    <input type="text" name="lokasi_fasilitas" value={form.lokasi_fasilitas} onChange={handleChange} className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-400 text-sm" required />
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
