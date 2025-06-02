import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // 2. Dapatkan fungsi navigate
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem('token', data.token);
        // Asumsi login ini selalu untuk admin, atau API response akan mengkonfirmasi role
        // Jika API mengembalikan role, gunakan data.role atau data.user.role
        localStorage.setItem('userRole', 'admin'); 

        console.log('Admin login berhasil:', data);

        // 3. Arahkan ke dashboard admin
        // Menggunakan { replace: true } agar halaman login tidak masuk ke history browser
        navigate('/admin/dashboard', { replace: true }); 

        // window.alert bisa dihapus karena redirect sudah cukup sebagai indikasi
        // Jika tetap ingin ada notifikasi, pertimbangkan komponen notifikasi yang lebih baik
        // daripada window.alert setelah redirect.

      } else {
        setError(data.message || 'Login gagal. Pastikan kredensial admin benar.');
      }
    } catch (err) {
      setError('Terjadi kesalahan pada server. Silakan coba lagi nanti.');
      console.error('Error saat login:', err);
    } finally {
      setLoading(false);
    }
    // setLoading(false); // Ini sudah ada di blok finally, jadi tidak perlu lagi di sini
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-[10%]">
      <div className="grid w-full max-w-5xl gap-0 overflow-hidden bg-white rounded-lg shadow-md md:grid-cols-3">
        <div className="hidden md:col-span-2 md:block">
          <img
            className="object-cover w-full h-full"
            src="https://www.tegalsambi.com/desa/upload/galeri/sedang_z1dpx4_whatsapp_image_2025-03-19_at_10.38.20.jpeg"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.onerror = null;
              target.src="https://placehold.co/800x600/cccccc/ffffff?text=Image+Not+Available&font=montserrat";
            }}
            alt="BG"
          />
        </div>

        <div className="flex flex-col justify-center p-10 md:col-span-1">
          <form
            onSubmit={handleSubmit}
            className="w-full"
          >
            <h1 className="mb-6 text-3xl font-bold text-center text-gray-800">Log In</h1>
        
            {error && (
              <p className="mb-4 text-center text-red-500">{error}</p>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-gray-600">
                Email:
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Your Email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-gray-600">
                Password:
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Kata Sandi"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 text-white rounded-lg text-lg transition-colors ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-cyan-400 hover:bg-blue-700'
              }`}
            >
              {loading ? 'Memproses...' : 'Log in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;