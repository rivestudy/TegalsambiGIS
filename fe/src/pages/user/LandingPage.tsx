// src/pages/LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// Helper to check authentication status (assuming admin login)
const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null; // Checks if an admin token exists
};

const LandingPage: React.FC = () => {
  const isAdminLoggedIn = isAuthenticated();
  const villageName = "Tegalsambi"; 

  return (
    <div style={{
      textAlign: 'center',
      padding: '40px 20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      color: '#333',
      minHeight: 'calc(100vh - 120px)', 
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ fontSize: '2.8em', color: '#2c3e50', fontWeight: '600', marginBottom: '10px' }}>
          {isAdminLoggedIn ? `Selamat Datang Kembali, Admin!` : `WebGIS Desa ${villageName}`}
        </h1>
        <p style={{ fontSize: '1.3em', color: '#555', marginTop: '5px', lineHeight: '1.6' }}>
          {isAdminLoggedIn
            ? `Kelola data spasial dan informasi geografis Desa ${villageName}.`
            : `Temukan informasi geografis, potensi, dan tata ruang Desa ${villageName} melalui peta interaktif.`}
        </p>
      </header>

      <main style={{ marginTop: '20px' }}>
        {isAdminLoggedIn ? (
          // Content for logged-in Admin
          <div>
            <p style={{ fontSize: '1.1em', marginBottom: '30px', color: '#444' }}>
              Anda masuk sebagai administrator. Akses dashboard untuk mengelola data WebGIS.
            </p>
            <Link
              to="/admin/dashboard"
              style={{
                padding: '14px 30px',
                fontSize: '1.1em',
                color: 'white',
                backgroundColor: '#007bff', // Blue for admin actions
                textDecoration: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 123, 255, 0.2)',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                display: 'inline-block'
              }}
              onMouseOver={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#0056b3';
                (e.target as HTMLAnchorElement).style.boxShadow = '0 6px 12px rgba(0, 123, 255, 0.3)';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#007bff';
                (e.target as HTMLAnchorElement).style.boxShadow = '0 4px 8px rgba(0, 123, 255, 0.2)';
              }}
            >
              Masuk ke Dashboard Admin
            </Link>
          </div>
        ) : (
          // Content for Public Visitors
          <div>
            <p style={{ fontSize: '1.1em', marginBottom: '35px', color: '#444' }}>
              Jelajahi peta interaktif untuk melihat detail wilayah, fasilitas umum, penggunaan lahan, dan informasi penting lainnya mengenai Desa {villageName}.
            </p>
            <Link
              to="/peta-desa" // This route needs to be defined in App.tsx and lead to your map component
              style={{
                padding: '15px 35px',
                fontSize: '1.2em',
                color: 'white',
                backgroundColor: '#28a745', // Green for public exploration
                textDecoration: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(40, 167, 69, 0.2)',
                transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
                display: 'inline-block',
                marginRight: '15px'
              }}
              onMouseOver={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#1e7e34';
                (e.target as HTMLAnchorElement).style.boxShadow = '0 6px 12px rgba(40, 167, 69, 0.3)';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#28a745';
                (e.target as HTMLAnchorElement).style.boxShadow = '0 4px 8px rgba(40, 167, 69, 0.2)';
              }}
            >
              Jelajahi Peta Desa
            </Link>
            <Link
              to="/login"
              style={{
                padding: '10px 20px',
                fontSize: '1em',
                color: '#007bff',
                backgroundColor: 'transparent',
                border: '2px solid #007bff',
                textDecoration: 'none',
                borderRadius: '8px',
                transition: 'background-color 0.3s ease, color 0.3s ease',
                display: 'inline-block',
                marginTop: '20px' // Give some space if it wraps or for visual separation
              }}
               onMouseOver={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = '#007bff';
                (e.target as HTMLAnchorElement).style.color = 'white';
              }}
              onMouseOut={(e) => {
                (e.target as HTMLAnchorElement).style.backgroundColor = 'transparent';
                (e.target as HTMLAnchorElement).style.color = '#007bff';
              }}
            >
              Login Admin
            </Link>
          </div>
        )}
      </main>

      <footer style={{ marginTop: 'auto', paddingTop: '30px', borderTop: '1px solid #ddd', color: '#666', fontSize: '0.9em' }}>
        <p>&copy; {new Date().getFullYear()} Pemerintah Desa {villageName}. Hak Cipta Dilindungi.</p>
        <p>Kabupaten Semarang, Jawa Tengah, Indonesia</p>
      </footer>
    </div>
  );
};

export default LandingPage;
