import React, { ReactNode, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate, Outlet, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ScrollToTop from "./components/layout/ScrollToTop";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Sidebar from "./components/layout/Sidebar";
import AdminHeader from "./components/layout/Header";

import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/user/LandingPage";
import AdminDashboard from "./pages/admin/AdminDashboard";

import AddAttraction from "./pages/admin/daftar/DaftarWisata";
import AccomodationList from "./pages/admin/daftar/DaftarPenginapan";
import DaftarPaketWisataPage from "./pages/admin/daftar/DaftarPaketWisata";
import AddMap from "./pages/admin/daftar/DaftarMap";
import DaftarFasilitas from "./pages/admin/daftar/DaftarFasilitas";

import EditWisata from "./pages/admin/edit/EditWisata";
import EditPenginapan from "./pages/admin/edit/EditPenginapan";
import EditMap from "./pages/admin/edit/EditMap";
import EditPaketWisata from "./pages/admin/edit/EditPaketWisata";
import EditFasilitas from "./pages/admin/edit/EditFasilitas";

import AboutPage from "./pages/user/AboutPage";
import AttractionPage from "./pages/user/Wisata/WisataPage";
import FacilitiesPage from "./pages/user/Fasilitas/FasilitasPage"; // Corrected import name
import MapPage from "./pages/user/WebgisPage";
import NotFoundPage from "./pages/user/NotFound";
import Masterplan from "./pages/user/MasterplanPage";

// Detail Pages
import PaketWisataDetail from "./pages/user/Wisata/PaketWisataDetail";
import AttractionDetail from "./pages/user/Wisata/WisataDetail";
import AccommodationDetail from "./pages/user/Fasilitas/PenginapanDetail"; // Import the new detail page
import FacilitiesDetail from "./pages/user/Fasilitas/FasilitasDetail";

// Secure auth helpers
const isAuthenticated = (): boolean => sessionStorage.getItem("token") !== null;
const getUserRole = (): string | null => sessionStorage.getItem("userRole");

interface ProtectedRouteProps {
    allowedRoles: string[];
    children?: ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
    if (!isAuthenticated()) return <Navigate to="/login" replace />;
    const userRole = getUserRole();
    if (!userRole || !allowedRoles.includes(userRole)) {
        sessionStorage.clear();
        return <Navigate to="/login" replace />;
    }
    return children ? <>{children}</> : <Outlet />;
};

const NavigationHandler: React.FC = () => {
    const navigate = useNavigate();
    const [authStatus, setAuthStatus] = useState(isAuthenticated());

    const handleLogout = () => {
        sessionStorage.clear();
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
    const role = getUserRole();
    const isAdmin = role === "admin";

    return (
        <>
            <ScrollToTop />
            {!isAdminRoute && <Navbar />}
            <div className="flex">
                {isAdminRoute && isAdmin && <Sidebar />}
                <div className={isAdminRoute && isAdmin ? "ml-64 w-full" : "w-full"}>
                    {isAdminRoute && isAdmin && <AdminHeader />}
                    <main className={isAdminRoute && isAdmin ? "pt-20 px-6 pb-10" : ""}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/about" element={<AboutPage />} />
                            <Route path="/attractions" element={<AttractionPage />} />
                            <Route path="/attraction/:id" element={<AttractionDetail />} /> {/* Corrected singular form */}
                            <Route path="/paket/:id" element={<PaketWisataDetail />} />
                            <Route path="/accommodation/:id" element={<AccommodationDetail />} /> {/* ADDED THIS ROUTE */}
                            <Route path="/facilities" element={<FacilitiesPage />} />
                            <Route path="/facility/:id" element={<FacilitiesDetail />} /> {/* Corrected singular form */}
                            <Route path="/peta-desa" element={<MapPage />} />
                            <Route path="/masterplan-tegalsambi" element={<Masterplan />} />
                            <Route path="/not-found" element={<NotFoundPage />} />
                            {/* Admin Routes */}
                            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                <Route path="/admin/daftar/wisata" element={<AddAttraction />} />
                                <Route path="/admin/daftar/penginapan" element={<AccomodationList />} />
                                <Route path="/admin/daftar/map" element={<AddMap />} />
                                <Route path="/admin/daftar/paket" element={<DaftarPaketWisataPage />} />
                                <Route path="/admin/daftar/fasilitas" element={<DaftarFasilitas />} />
                                <Route path="/admin/edit/wisata/:id" element={<EditWisata />} />
                                <Route path="/admin/edit/penginapan/:id" element={<EditPenginapan />} />
                                <Route path="/admin/edit/fasilitas/:id" element={<EditFasilitas />} />
                                <Route path="/admin/edit/paket/:id" element={<EditPaketWisata />} />
                                <Route path="/admin/edit/map/:id" element={<EditMap />} />
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
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
        </Router>
    );
}

export default App;
