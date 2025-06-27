import React, { ReactNode, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import ScrollToTop from "./components/layout/ScrollToTop";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import AdminHeader from "./components/layout/Header";

import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/user/LandingPage";
import AdminDashboard from "./pages/admin/add/AdminDashboard";

import AddAttraction from "./pages/admin/add/DaftarWisata";
import AddFacilities from "./pages/admin/add/DaftarPenginapan";
import AddMap from "./pages/admin/add/AddMap";

// Admin edit
import EditWisata from "./pages/admin/edit/EditWisata";
// import EditAttraction from "./pages/admin/edit/EditAttraction";
import EditFacilities from "./pages/admin/edit/EditFacilities";
import EditMap from "./pages/admin/edit/EditMap";
import EditPage from "./pages/admin/EditPage";
import AddPage from "./pages/admin/AddPage";

// User pages
import AboutPage from "./pages/user/AboutPage";
import AttractionDetail from "./pages/user/AttractionDetail";
import AttractionPage from "./pages/user/AttractionPage";
import FacilitiesPage from "./pages/user/FacilitesPage";
import FacilitiesDetail from "./pages/user/FacilitiesDetail";
import MapPage from "./pages/user/MapPage";
import NotFoundPage from "./pages/user/NotFound";

const isAuthenticated = (): boolean => localStorage.getItem("token") !== null;
const getUserRole = (): string | null => localStorage.getItem("userRole");

interface ProtectedRouteProps {
    allowedRoles: string[];
    children?: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
    if (!isAuthenticated()) return <Navigate to="/login" replace />;
    const userRole = getUserRole();
    if (!userRole || !allowedRoles.includes(userRole)) {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        return <Navigate to="/login" replace />;
    }
    return children ? <>{children}</> : <Outlet />;
};

const NavigationHandler: React.FC = () => {
    const navigate = useNavigate();
    const [authStatus, setAuthStatus] = useState(isAuthenticated());

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        setAuthStatus(false);
        navigate("/login");
    };

    useEffect(() => {
        const updateAuthStatus = () => {
            const currentAuth = isAuthenticated();
            if (currentAuth !== authStatus) setAuthStatus(currentAuth);
        };
        const intervalId = setInterval(updateAuthStatus, 500);
        window.addEventListener("storage", updateAuthStatus);
        return () => {
            clearInterval(intervalId);
            window.removeEventListener("storage", updateAuthStatus);
        };
    }, [authStatus]);

    if (!authStatus) return null;

    const role = getUserRole();

    return (
        <nav className="flex items-center justify-between px-6 py-3 bg-gray-100 border-b border-gray-300">
            <div className="flex items-center gap-4 font-medium text-gray-700">
                <Link to="/" className="font-bold hover:underline">
                    Home
                </Link>
                <span>
                    Role: <span className="font-bold text-blue-600">{role || "N/A"}</span>
                </span>
                {role === "admin" && (
                    <Link to="/admin/dashboard" className="text-blue-600 hover:underline">
                        Admin Panel
                    </Link>
                )}
            </div>
            <button onClick={handleLogout} className="px-4 py-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">
                Logout
            </button>
        </nav>
    );
};

const AppContent = () => {
    const location = useLocation();
    const isAdminRoute = location.pathname.startsWith("/admin");
    const role = localStorage.getItem("userRole");
    const isAdmin = role === "admin";

    return (
        <>
            <ScrollToTop />
            {!isAdminRoute && <Navbar />}

            <div className="flex">
                {/* Sidebar khusus admin */}
                {isAdminRoute && isAdmin && <Sidebar />}

                <div className={isAdminRoute && isAdmin ? "ml-64 w-full" : "w-full"}>
                    {/* Header khusus admin */}
                    {isAdminRoute && isAdmin && <AdminHeader />}

                    <main className={isAdminRoute && isAdmin ? "pt-20 px-6 pb-10" : ""}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/attractions" element={<AttractionPage />} />
                            <Route path="/attractions/:id" element={<AttractionDetail />} />
                            <Route path="/facilities" element={<FacilitiesPage />} />
                            <Route path="/facilities/:id" element={<FacilitiesDetail />} />
                            <Route path="/peta-desa" element={<MapPage />} />
                            <Route path="/not-found" element={<NotFoundPage />} />

                            {/* Admin Routes (Dilindungi) */}
                            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                <Route path="/admin/add/attraction" element={<AddAttraction />} />
                                <Route path="/admin/add/facilities" element={<AddFacilities />} />
                                <Route path="/admin/add/map" element={<AddMap />} />
                                <Route path="/admin/add/page" element={<AddPage />} />
                                <Route path="/admin/edit/attraction/:id" element={<EditWisata />} />
                                {/* <Route path="/admin/edit/attraction/:id" element={<EditAttraction />} /> */}
                                <Route path="/admin/edit/facilities/:id" element={<EditFacilities />} />
                                <Route path="/admin/edit/map/:id" element={<EditMap />} />
                                <Route path="/admin/edit/page/:id" element={<EditPage />} />
                            </Route>

                            <Route path="*" element={<Navigate to="/not-found" replace />} />
                        </Routes>
                    </main>
                </div>
            </div>

            {!isAdminRoute && <Footer />}
        </>
    );
};

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;
