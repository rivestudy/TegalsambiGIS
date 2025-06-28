import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await axios.post("/auth/login", { email, password });
            const data = response.data;

            if (data.token) {
                sessionStorage.setItem("token", data.token);         // ✅ safer than localStorage
                sessionStorage.setItem("userRole", "admin");
                navigate("/admin/dashboard", { replace: true });
            } else {
                setError(data.message || "Login gagal. Pastikan kredensial admin benar.");
            }
        } catch (err: any) {
            setError(err.response?.data?.message || "Terjadi kesalahan pada server.");
            console.error("Error saat login:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen pt-20 bg-gradient-to-r from-blue-900 to-cyan-600">
            <div className="flex w-full max-w-4xl overflow-hidden bg-white shadow-2xl rounded-xl">
                <div className="relative hidden md:block md:w-1/2">
                    <img
                        src="https://www.tegalsambi.com/desa/upload/galeri/sedang_z1dpx4_whatsapp_image_2025-03-19_at_10.38.20.jpeg"
                        alt="Background"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://placehold.co/800x600/cccccc/ffffff?text=Image+Not+Available&font=montserrat";
                        }}
                        className="object-cover w-full h-full"
                    />
                </div>

                <div className="w-full p-10 md:w-1/2">
                    <h1 className="mb-6 text-4xl font-bold text-center text-gray-800">Login Admin</h1>

                    {error && <div className="p-3 mb-4 text-red-700 bg-red-100 rounded">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Masukkan email admin"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-1 text-sm text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-400"
                                placeholder="Kata sandi"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3 text-white rounded-lg text-lg font-semibold transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
                        >
                            {loading ? "Memproses..." : "Masuk"}
                        </button>
                    </form>

                    <p className="mt-6 text-sm text-center text-gray-500">&copy; {new Date().getFullYear()} Pemerintah Desa Tegalsambi</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
