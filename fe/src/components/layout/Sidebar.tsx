import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHotel, FaSignOutAlt, FaTree, FaTachometerAlt } from "react-icons/fa";
import { FaSuitcaseRolling } from "react-icons/fa";
import { FaBuilding } from "react-icons/fa";

const AdminSidebar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const currentPath = location.pathname;

    const isActive = (path: string) => (currentPath.startsWith(path) ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-blue-500 hover:text-white");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        navigate("/login");
    };

    return (
        <aside className="fixed flex flex-col w-64 h-screen text-white bg-gray-900">
            {/* Logo */}
            <div className="flex items-center justify-center px-6 py-4 mt-4">
                <img src="/logoWeb.png" alt="Logo" className="object-contain h-12" />
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                <Link to="/admin/dashboard" className={`flex items-center gap-3 px-4 py-2 rounded ${isActive("/admin/dashboard")}`}>
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </Link>

                <Link to="/admin/daftar/wisata" className={`flex items-center gap-3 px-4 py-2 rounded ${isActive("/admin/daftar/wisata")}`}>
                    <FaTree />
                    <span>Wisata</span>
                </Link>

                <Link to="/admin/daftar/paket" className={`flex items-center gap-3 px-4 py-2 rounded ${isActive("/admin/daftar/paket")}`}>
                    <FaSuitcaseRolling />
                    <span>Paket Wisata</span>
                </Link>

                <Link to="/admin/daftar/fasilitas" className={`flex items-center gap-3 px-4 py-2 rounded ${isActive("/admin/daftar/fasilitas")}`}>
                    <FaBuilding />
                    <span>Fasilitas</span>
                </Link>

                <Link to="/admin/daftar/penginapan" className={`flex items-center gap-3 px-4 py-2 rounded ${isActive("/admin/daftar/penginapan")}`}>
                    <FaHotel />
                    <span>Penginapan</span>
                </Link>

               
            </nav>

            {/* Logout */}
            <div className="px-4 py-4 border-t border-gray-700">
                <button onClick={handleLogout} className="flex items-center justify-center w-full gap-2 px-4 py-2 font-semibold text-white bg-red-600 rounded hover:bg-red-700">
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
