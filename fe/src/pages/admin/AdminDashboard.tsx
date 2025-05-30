// src/pages/admin/AdminDashboard.tsx
import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Admin Dashboard</h1>
      <div style={{ marginTop: '30px', border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
        <h2>Manajemen Lokasi</h2>

      </div>
      <div style={{ marginTop: '20px', border: '1px solid #eee', padding: '20px', borderRadius: '8px' }}>
        <h2>Setelan</h2>
        <button style={{ padding: '10px 15px', cursor: 'pointer' }}>Ganti Password</button>
      </div>
    </div>
  );
};

export default AdminDashboard;