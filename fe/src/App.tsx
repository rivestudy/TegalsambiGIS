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
import AccomodationList from "./pages/admin/add/DaftarPenginapan";
import AddMap from "./pages/admin/add/DaftarMap";

import EditWisata from "./pages/admin/edit/EditWisata";
import EditPenginapan from "./pages/admin/edit/EditPenginapan";
import EditMap from "./pages/admin/edit/EditMap";
import EditPage from "./pages/admin/EditPage";
import AddPage from "./pages/admin/AddPage";

import AboutPage from "./pages/user/AboutPage";
import AttractionPage from "./pages/user/AttractionPage";
import AccommodationPage from "./pages/user/AccommodationPage"; // Corrected import name
import FacilitiesPage from "./pages/user/FacilitesPage"; // Corrected import name
import MapPage from "./pages/user/MapPage";
import NotFoundPage from "./pages/user/NotFound";
import Masterplan from "./pages/user/masterplan";

// Detail Pages
import PaketWisataDetail from "./pages/user/PaketWisataDetail";
import AttractionDetail from "./pages/user/AttractionDetail";
import AccommodationDetail from "./pages/user/AccommodationDetail"; // Import the new detail page
import FacilitiesDetail from "./pages/user/FacilitiesDetail";

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
                            <Route path="/accommodation" element={<AccommodationPage />} /> {/* Corrected spelling */}
                            <Route path="/accommodation/:id" element={<AccommodationDetail />} /> {/* ADDED THIS ROUTE */}
                            <Route path="/facilities" element={<FacilitiesPage />} />
                            <Route path="/facility/:id" element={<FacilitiesDetail />} /> {/* Corrected singular form */}
                            <Route path="/peta-desa" element={<MapPage />} />
                            <Route path="/masterplan-tegalsambi" element={<Masterplan />} />
                            <Route path="/not-found" element={<NotFoundPage />} />
                            {/* Admin Routes */}
                            <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
                                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                                <Route path="/admin/add/attraction" element={<AddAttraction />} />
                                <Route path="/admin/add/facilities" element={<AccomodationList />} />
                                <Route path="/admin/add/map" element={<AddMap />} />
                                <Route path="/admin/add/page" element={<AddPage />} />
                                <Route path="/admin/edit/attraction/:id" element={<EditWisata />} />
                                <Route path="/admin/edit/facilities/:id" element={<EditPenginapan />} />
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
