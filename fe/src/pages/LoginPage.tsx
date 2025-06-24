import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok && data.token) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userRole", "admin");
                navigate("/admin/dashboard", { replace: true });
            } else {
                setError(data.message || "Login gagal. Pastikan kredensial admin benar.");
            }
        } catch (err) {
            setError("Terjadi kesalahan pada server. Silakan coba lagi nanti.");
            console.error("Error saat login:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-900 to-cyan-600 pt-20">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl flex overflow-hidden">
                {/* Kiri: Gambar */}
                <div className="hidden md:block md:w-1/2 relative">
                    <img
                        src="https://www.tegalsambi.com/desa/upload/galeri/sedang_z1dpx4_whatsapp_image_2025-03-19_at_10.38.20.jpeg"
                        alt="Background"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://placehold.co/800x600/cccccc/ffffff?text=Image+Not+Available&font=montserrat";
                        }}
                        className="h-full w-full object-cover"
                    />
                    {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                        <h2 className="text-white text-3xl font-semibold">Admin Panel</h2>
                    </div> */}
                </div>

                {/* Kanan: Form Login */}
                <div className="w-full md:w-1/2 p-10">
                    <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Login Admin</h1>

                    {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block mb-1 text-sm text-gray-600">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                placeholder="Masukkan email admin"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block mb-1 text-sm text-gray-600">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
                                placeholder="Kata sandi"
                            />
                        </div>

                        <button type="submit" disabled={loading} className={`w-full py-3 text-white rounded-lg text-lg font-semibold transition ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}>
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
