import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500">404</h1>
                <p className="text-xl text-gray-700 mt-4">Halaman tidak ditemukan</p>
                <Link to="/" className="inline-block mt-6 px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300">
                    Kembali ke Landing Page
                </Link>
            </div>
        </div>
    );
};

export default NotFound;
