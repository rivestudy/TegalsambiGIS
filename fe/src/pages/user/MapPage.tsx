import React from "react";
import { motion } from "framer-motion";

const MapPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-900 to-cyan-600 py-10 px-4 pt-28">
            {/* Judul */}
            <motion.h1 className="text-4xl font-extrabold text-center mb-10 text-white" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                WebGIS Desa Tegalsambi
                <span className="block w-24 h-1 bg-blue-500 mx-auto mt-3 rounded-full"></span>
            </motion.h1>

            {/* Grid Map + Sidebar */}
            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Area Peta */}
                <motion.div className="md:col-span-3" initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
                    <div className="bg-white border border-gray-300 rounded-2xl shadow-lg h-[500px] flex items-center justify-center text-gray-500 text-lg italic">PETA AKAN DITAMPILKAN DI SINI</div>
                </motion.div>

                {/* Sidebar Legenda */}
                <motion.div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6" initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.8 }} viewport={{ once: true }}>
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Legenda</h2>
                    <ul className="space-y-4 text-gray-600 text-sm">
                        <li className="flex items-center">
                            <span className="inline-block w-4 h-4 bg-green-500 mr-3 rounded-full shadow"></span> Area Persawahan
                        </li>
                        <li className="flex items-center">
                            <span className="inline-block w-4 h-4 bg-blue-500 mr-3 rounded-full shadow"></span> Sungai
                        </li>
                        <li className="flex items-center">
                            <span className="inline-block w-4 h-4 bg-yellow-400 mr-3 rounded-full shadow"></span> Pemukiman
                        </li>
                        <li className="flex items-center">
                            <span className="inline-block w-4 h-4 bg-red-500 mr-3 rounded-full shadow"></span> Tempat Wisata
                        </li>
                        <li className="flex items-center">
                            <span className="inline-block w-4 h-4 bg-purple-500 mr-3 rounded-full shadow"></span> Kantor Pemerintahan
                        </li>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default MapPage;
