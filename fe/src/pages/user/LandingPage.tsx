// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null;
};

const LandingPage: React.FC = () => {
  const isAdminLoggedIn = isAuthenticated();
  const villageName = "Tegalsambi";

  return (
    <div className="min-h-[calc(100vh-120px)] flex flex-col justify-center items-center text-center px-5 py-10 font-sans text-gray-800">
      <header className="mb-8">
        <h1 className="mb-3 text-4xl font-semibold text-gray-800 md:text-5xl">
          {isAdminLoggedIn
            ? 'Selamat Datang Kembali, Admin!'
            : `WebGIS Desa ${villageName}`}
        </h1>
        <p className="text-lg leading-relaxed text-gray-600 md:text-xl">
          {isAdminLoggedIn
            ? `Kelola data spasial dan informasi geografis Desa ${villageName}.`
            : `Temukan informasi geografis, potensi, dan tata ruang Desa ${villageName} melalui peta interaktif.`}
        </p>
      </header>

      <main className="mt-5">
        {isAdminLoggedIn ? (
          <div>
            <p className="mb-6 text-base text-gray-700 md:text-lg">
              Anda masuk sebagai administrator. Akses dashboard untuk mengelola data WebGIS.
            </p>
            <Link
              to="/admin/dashboard"
              className="inline-block px-6 py-3 text-base text-white transition bg-blue-600 rounded-lg shadow-md md:text-lg hover:bg-blue-800 hover:shadow-lg"
            >
              Masuk ke Dashboard Admin
            </Link>
          </div>
        ) : (
          <div>
            <p className="mb-8 text-base text-gray-700 md:text-lg">
              Jelajahi peta interaktif untuk melihat detail wilayah, fasilitas umum, penggunaan lahan, dan informasi penting lainnya mengenai Desa {villageName}.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <Link
                to="/peta-desa"
                className="inline-block px-8 py-3 text-lg text-white transition bg-green-600 rounded-lg shadow-md hover:bg-green-800 hover:shadow-lg"
              >
                Jelajahi Peta Desa
              </Link>
              <Link
                to="/login"
                className="inline-block px-6 py-2 mt-2 text-base text-blue-600 transition border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white md:mt-0"
              >
                Login Admin
              </Link>
            </div>
          </div>
        )}
      </main>

      <footer className="pt-10 mt-auto text-sm text-center text-gray-600 border-t border-gray-300">
        <p>&copy; {new Date().getFullYear()} Pemerintah Desa {villageName}. Hak Cipta Dilindungi.</p>
        <p>Kabupaten Semarang, Jawa Tengah, Indonesia</p>
      </footer>
    </div>
  );
};

export default LandingPage;
