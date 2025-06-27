import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaMapMarkedAlt, FaHotel, FaSignOutAlt, FaTree, FaTachometerAlt } from "react-icons/fa";

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
        <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col fixed">
            {/* Logo */}
            <div className="px-6 mt-4 flex items-center justify-center py-4 text-2xl font-bold">LOGO</div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
                <Link to="/admin/dashboard" className={`flex items-center gap-3 px-4 py-2 rounded ${isActive("/admin/dashboard")}`}>
                    <FaTachometerAlt />
                    <span>Dashboard</span>
                </Link>

                <Link to="/admin/add/attraction" className={`flex items-center gap-3 px-4 py-2 rounded ${isActive("/admin/add/attraction")}`}>
                    <FaTree />
                    <span>Wisata</span>
                </Link>

                <Link to="/admin/add/facilities" className={`flex items-center gap-3 px-4 py-2 rounded ${isActive("/admin/add/facilities")}`}>
                    <FaHotel />
                    <span>Penginapan</span>
                </Link>

                <Link to="/admin/add/map" className={`flex items-center gap-3 px-4 py-2 rounded ${isActive("/admin/add/map")}`}>
                    <FaMapMarkedAlt />
                    <span>WebGIS</span>
                </Link>
            </nav>

            {/* Logout */}
            <div className="px-4 py-4 border-t border-gray-700">
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold">
                    <FaSignOutAlt />
                    Logout
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
