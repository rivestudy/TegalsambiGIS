// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
        // Store token
        localStorage.setItem('token', data.token);
        // Since only admins log in, set role to 'admin'
        localStorage.setItem('userRole', 'admin');

        console.log('Admin login berhasil:', data);
        
        // Navigate to admin dashboard
        navigate('/admin/dashboard');
      } else {
        setError(data.message || 'Login gagal. Pastikan kredensial admin benar.');
      }
    } catch (err) {
      setError('Terjadi kesalahan pada server. Silakan coba lagi nanti.');
      console.error('Error saat login:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
      <form onSubmit={handleSubmit} style={{ padding: '40px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#333' }}>Admin Login</h1>
        {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '16px' }}>{error}</p>}
        <div style={{ marginBottom: '16px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', color: '#555' }}>Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            placeholder="admin@example.com"
          />
        </div>
        <div style={{ marginBottom: '24px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', color: '#555' }}>Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
            placeholder="Kata Sandi"
          />
        </div>
        <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', backgroundColor: loading ? '#ccc' : '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px' }}>
          {loading ? 'Memproses...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;