
import React, { ReactNode, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import LandingPage from './pages/user/LandingPage'; 

const isAuthenticated = (): boolean => {
  return localStorage.getItem('token') !== null;
};

const getUserRole = (): string | null => {
  return localStorage.getItem('userRole');
};

interface ProtectedRouteProps {
  allowedRoles: string[];
  children?: ReactNode;
}
const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  const userRole = getUserRole();
  if (!userRole || !allowedRoles.includes(userRole)) {
    console.warn(`Role mismatch or missing role. User role: ${userRole}, Allowed: ${allowedRoles}. Redirecting to login.`);
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    return <Navigate to="/login" replace />;
  }
  return children ? <>{children}</> : <Outlet />;
};

const NavigationHandler: React.FC = () => {
  const navigate = useNavigate();
  const [authStatus, setAuthStatus] = useState(isAuthenticated());

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    setAuthStatus(false);
    navigate('/login');
  };

  useEffect(() => {
    const updateAuthStatus = () => {
      const currentAuthStatus = isAuthenticated();
      if (currentAuthStatus !== authStatus) {
        setAuthStatus(currentAuthStatus);
      }
    };
    const intervalId = setInterval(updateAuthStatus, 500);
    window.addEventListener('storage', updateAuthStatus);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', updateAuthStatus);
    };
  }, [authStatus]);

  if (!authStatus) { 
    return null; 
  }
  
  const role = getUserRole();

  return (
    <nav style={{ padding: '10px 20px', backgroundColor: '#e9ecef', marginBottom: '0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #dee2e6' }}>
      <div>
        <Link to="/" style={{ marginRight: '20px', fontWeight: 'bold', color: '#495057', textDecoration: 'none'  }}>Home</Link>
        <span style={{ marginRight: '20px', fontWeight: 'bold', color: '#495057' }}>
          Role: <strong style={{ color: '#007bff' }}>{role || 'N/A'}</strong>
        </span>
        {role === 'admin' && <Link to="/admin/dashboard" style={{ marginRight: '15px', color: '#007bff', textDecoration: 'none' }}>Admin Panel</Link>}
      </div>
      <button
        onClick={handleLogout}
        style={{
          padding: '8px 15px',
          cursor: 'pointer',
          backgroundColor: '#dc3545',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontWeight: 'bold'
        }}
      >
        Logout
      </button>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <NavigationHandler />
      <div >
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<LandingPage />} />

          <Route
            element={<ProtectedRoute allowedRoles={['admin']} />}
          >
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/" replace />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;