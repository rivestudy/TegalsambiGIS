import React from "react";
import { FaUserShield } from "react-icons/fa";

const AdminHeader: React.FC = () => {
    return (
        <header className="min-w-screen bg-gray-100 text-gray-800 shadow-lg fixed top-0 left-64 right-0 z-40 border-b border-gray-300">
            <div className="flex items-center justify-between px-8 py-5">
                {/* Tanggal di kiri */}
                <div className="text-sm text-gray-600 whitespace-nowrap">
                    {new Date().toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </div>

                {/* Branding di kanan */}
                <div className="flex items-center space-x-3 text-right">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-800">Administrator</h1>
                        <p className="text-sm text-gray-500">Panel Pengelolaan WebGIS Tegalsambi</p>
                    </div>
                    <FaUserShield className="text-blue-500 text-3xl" />
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
