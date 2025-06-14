import React from "react";

const MapPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-10 px-4 pt-24">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">WebGIS Desa Tegalsambi</h1>

            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Area Peta */}
                <div className="md:col-span-3">
                    <div className="bg-gray-300 rounded-lg shadow-md h-[600px] flex items-center justify-center text-gray-700">
                        {/* Placeholder Map */}
                        <span>PETA AKAN DITAMPILKAN DI SINI</span>
                    </div>
                </div>

                {/* Sidebar Legenda / Info */}
                <div className="bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-4">Legenda / Informasi</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li>
                            <span className="inline-block w-4 h-4 bg-green-500 mr-2 rounded-full"></span> Area Persawahan
                        </li>
                        <li>
                            <span className="inline-block w-4 h-4 bg-blue-500 mr-2 rounded-full"></span> Sungai
                        </li>
                        <li>
                            <span className="inline-block w-4 h-4 bg-yellow-500 mr-2 rounded-full"></span> Pemukiman
                        </li>
                        <li>
                            <span className="inline-block w-4 h-4 bg-red-500 mr-2 rounded-full"></span> Tempat Wisata
                        </li>
                        <li>
                            <span className="inline-block w-4 h-4 bg-purple-500 mr-2 rounded-full"></span> Kantor Pemerintahan
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MapPage;
