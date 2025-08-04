import React from "react";
import { FaUserShield } from "react-icons/fa";

const AdminHeader: React.FC = () => {
    return (
        <header className="fixed top-0 right-0 z-40 text-gray-800 bg-gray-100 border-b border-gray-300 shadow-lg min-w-screen left-64">
            <div className="flex items-center justify-between px-8 py-5">
                {/* Tanggal di kiri */}
                <div className="text-sm text-gray-600 whitespace-nowrap">
                    {new Date().toLocaleDateString("id-ID", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                        hour: "numeric",
                        minute: "numeric",
                    })}
                </div>

                {/* Branding di kanan */}
                <div className="flex items-center space-x-3 text-right">
                    <div>
                        <h1 className="text-lg font-semibold text-gray-800">Administrator</h1>
                        <p className="text-sm text-gray-500">Panel Pengelolaan WebGIS Tegalsambi</p>
                    </div>
                    <FaUserShield className="text-3xl text-blue-500" />
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;
