import React, { useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddPaketProps {
    onFormSubmit: () => void;
}

const AddPaket: React.FC<AddPaketProps> = ({ onFormSubmit }) => {
    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        phone: "",
        facilities: "",
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description);
        formData.append("price", form.price);
        formData.append("phone", form.phone);
        formData.append("facilities", form.facilities);
        form.images.forEach((img) => {
            formData.append("images", img);
        });
        console.log(form);

        try {
            await axiosInstance.post("/data/paket", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            toast.success("Paket berhasil ditambahkan!");
            onFormSubmit();
        } catch (err) {
            console.error(err);
            toast.error("Gagal menambahkan paket.");
        }
    };

    return (
        <div className="max-w-4xl p-6 mx-auto mt-4">
            <h1 className="pb-2 mb-4 text-2xl font-bold text-center text-gray-800">Tambah Paket Wisata</h1>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 p-8 bg-white border border-gray-200 shadow-lg rounded-xl">
                <input name="name" value={form.name} onChange={handleChange} required placeholder="Nama Paket" className="p-2 border border-gray-200 rounded" />
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Deskripsi" rows={3} className="p-2 border border-gray-200 rounded" required />
                <input name="price" value={form.price} onChange={handleChange} placeholder="Harga" className="p-2 border border-gray-200 rounded" required />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Kontak" className="p-2 border border-gray-200 rounded" required />
                <textarea name="facilities" value={form.facilities} onChange={handleChange} placeholder="Fasilitas, pisahkan koma" className="p-2 border border-gray-200 rounded" rows={2} />
                <input type="file" multiple accept="image/*" onChange={handleFileChange} />
                <button type="submit" className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700">Simpan Paket</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddPaket;
