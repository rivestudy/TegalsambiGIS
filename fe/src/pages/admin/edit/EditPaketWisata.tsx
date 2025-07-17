import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../utils/axiosInstance";

const EditPaket: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
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

    return (
        <div className="max-w-4xl p-6 mx-auto mt-4">
            <h1 className="pb-2 mb-4 text-2xl font-bold text-center text-gray-800">Edit Paket Wisata</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-8 bg-white border border-gray-200 shadow-lg rounded-xl">
                <input name="name" value={form.name} onChange={handleChange} required className="p-2 border rounded" />
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="p-2 border rounded" required />
                <input name="price" value={form.price} onChange={handleChange} required className="p-2 border rounded" />
                <input name="phone" value={form.phone} onChange={handleChange} required className="p-2 border rounded" />
                <textarea name="facilities" value={form.facilities} onChange={handleChange} rows={2} className="p-2 border rounded" />
                <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Perbarui Paket</button>
            </form>
        </div>
    );
};

export default EditPaket;
