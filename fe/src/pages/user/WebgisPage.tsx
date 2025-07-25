import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { GeoJsonObject } from 'geojson';

// --- Loading Component ---
const LoadingAnimation = () => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-900 to-cyan-600">
        <div className="w-16 h-16 border-4 border-white border-dashed rounded-full animate-spin"></div>
    </div>
);

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// --- GeoJSON Data ---
const geoJsonData = {
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": { "Name": "Makam Besar", "Category": "Wisata Religi", "timestamp": "2025/07/07 10:45:05.000" }, "geometry": { "type": "Point", "coordinates": [ 110.648862, -6.619537, 5.54 ] } },
    { "type": "Feature", "properties": { "Name": "Makam Kecil 1", "Category": "Wisata Religi", "timestamp": "2025/07/07 10:40:46.000" }, "geometry": { "type": "Point", "coordinates": [ 110.648960, -6.619655, 6.51 ] } },
    { "type": "Feature", "properties": { "Name": "Makam Kecil 2", "Category": "Wisata Religi", "timestamp": "2025/07/07 10:42:56.000" }, "geometry": { "type": "Point", "coordinates": [ 110.648755, -6.619456, 4.58 ] } },
    { "type": "Feature", "properties": { "Name": "Pohon Besar 1", "Category": "Wisata Budaya", "timestamp": "2025/07/07 10:49:07.000" }, "geometry": { "type": "Point", "coordinates": [ 110.648732, -6.619542, 4.94 ] } },
    { "type": "Feature", "properties": { "Name": "Pohon Besar 2", "Category": "Wisata Budaya", "timestamp": "2025/07/07 10:51:01.000" }, "geometry": { "type": "Point", "coordinates": [ 110.648833, -6.619591, 5.75 ] } },
    { "type": "Feature", "properties": { "Name": "Balai Desa Tegalsambi", "Category": "Kantor", "timestamp": "2025/07/07 10:52:15.000" }, "geometry": { "type": "Point", "coordinates": [ 110.648611, -6.619716, 4.98 ] } },
    { "type": "Feature", "properties": { "Name": "Puskesmas Tegalsambi", "Category": "Fasilitas", "timestamp": "2025/07/07 10:53:28.000" }, "geometry": { "type": "Point", "coordinates": [ 110.648545, -6.619757, 4.76 ] } },
    { "type": "Feature", "properties": { "Name": "Penginapan Tegalsambi A", "Category": "Penginapan", "timestamp": "2025/07/07 10:56:38.000" }, "geometry": { "type": "Point", "coordinates": [ 110.648478, -6.619669, 4.33 ] } },
    { "type": "Feature", "properties": { "Name": "Pantai Tegalsambi", "Category": "Wisata Pesisir", "timestamp": "2025/07/07 10:58:03.000" }, "geometry": { "type": "Point", "coordinates": [ 110.648585, -6.619583, 4.40 ] } }
  ]
};

// --- Animation ---
const bounceVariant = (dir: "top" | "bottom" | "left" | "right") => {
    const variants: any = {
        top: { initial: { opacity: 0, y: -60 }, whileInView: { opacity: 1, y: 0 } },
        bottom: { initial: { opacity: 0, y: 60 }, whileInView: { opacity: 1, y: 0 } },
        left: { initial: { opacity: 0, x: -60 }, whileInView: { opacity: 1, x: 0 } },
        right: { initial: { opacity: 0, x: 60 }, whileInView: { opacity: 1, x: 0 } }
    };
    return variants[dir];
};

const animationConfig: Transition = {
    type: "spring",
    bounce: 0.6,
    duration: 2.0,
};

// --- Main Component ---
const MapPage = () => {
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState("semua");
    const [mapKey, setMapKey] = useState(Date.now());

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const filteredData = useMemo(() => {
        if (selectedFilter === "semua") return geoJsonData;
        return {
            ...geoJsonData,
            features: geoJsonData.features.filter(
                f => f.properties?.Category === selectedFilter
            ),
        };
    }, [selectedFilter]);

    useEffect(() => {
        setMapKey(Date.now());
    }, [selectedFilter]);

    const onEachFeature = (feature: any, layer: L.Layer) => {
        if (feature.properties?.Name) {
            const content = `
                <div class="p-1">
                  <h3 class="text-base font-bold text-gray-800 mb-1">${feature.properties.Name}</h3>
                  <ul class="text-xs text-gray-600 space-y-0.5">
                    <li><strong>Kategori:</strong> ${feature.properties.Category}</li>
                    <li><strong>Waktu:</strong> ${new Date(feature.properties.timestamp).toLocaleTimeString()}</li>
                    <li><strong>Koordinat:</strong> ${feature.geometry.coordinates.slice(0, 2).map((c: number) => c.toFixed(5)).join(', ')}</li>
                  </ul>
                </div>`;
            layer.bindPopup(content);
        }
    };

    const mapCenter: [number, number] = useMemo(() => {
        const latSum = filteredData.features.reduce((sum, f) => sum + f.geometry.coordinates[1], 0);
        const lngSum = filteredData.features.reduce((sum, f) => sum + f.geometry.coordinates[0], 0);
        const count = filteredData.features.length || 1;
        return [latSum / count, lngSum / count];
    }, [filteredData]);

    if (loading) return <LoadingAnimation />;

    return (
        <div className="min-h-screen px-4 py-12 pt-16 bg-gradient-to-r from-blue-900 to-cyan-600 pb-14">
            {/* Title */}
            <motion.div className="py-8 text-center" initial={bounceVariant("top").initial} whileInView={bounceVariant("top").whileInView} transition={animationConfig} viewport={{ once: true }}>
                <nav className="mb-1">
                    <ol className="flex items-center justify-center space-x-2 text-sm font-semibold text-white">
                        <li>
                            <Link to="/" className="flex items-center transition duration-300 hover:text-orange-400">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
                                </svg>
                                Landing Page
                            </Link>
                        </li>
                        <li className="font-semibold text-gray-400">/</li>
                        <li className="font-bold text-orange-300">WebGIS</li>
                    </ol>
                </nav>
                <h1 className="mb-3 text-4xl font-extrabold text-white">WebGIS Desa Tegalsambi</h1>
                <span className="block w-24 h-1 mx-auto mt-2 bg-blue-500 rounded-full"></span>
            </motion.div>

            {/* Main Grid */}
            <div className="grid max-w-screen-xl grid-cols-1 gap-8 mx-auto md:grid-cols-4">
                {/* Map Section */}
                <motion.div className="space-y-4 md:col-span-3" initial={bounceVariant("left").initial} whileInView={bounceVariant("left").whileInView} transition={animationConfig}>
                    <div className="p-4 bg-white border border-gray-300 shadow-lg rounded-2xl">
                        <label className="block mb-2 font-semibold text-gray-700">Tampilkan Kategori:</label>
                        <select value={selectedFilter} onChange={(e) => setSelectedFilter(e.target.value)} className="w-full p-2 text-sm transition border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <option value="semua">Semua Titik</option>
                            <option value="Wisata Religi">Wisata Religi</option>
                            <option value="Wisata Budaya">Wisata Budaya</option>
                            <option value="Wisata Pesisir">Wisata Pesisir</option>
                            <option value="Kantor">Kantor</option>
                            <option value="Fasilitas">Fasilitas</option>
                            <option value="Penginapan">Penginapan</option>
                        </select>
                    </div>

                    <div className="bg-white border border-gray-300 rounded-2xl shadow-lg h-[450px] md:h-[500px] p-2 flex items-center justify-center overflow-hidden">
                        {typeof window !== "undefined" && (
                            <MapContainer 
                                key={mapKey}
                                center={mapCenter}
                                zoom={17}
                                scrollWheelZoom={true}
                                style={{ height: "100%", width: "100%", borderRadius: '14px' }}
                            >
                                <TileLayer
                                    attribution='&copy; OpenStreetMap contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                                <GeoJSON data={filteredData as GeoJsonObject} onEachFeature={onEachFeature} />
                            </MapContainer>
                        )}
                    </div>
                </motion.div>

                {/* Sidebar */}
                <motion.div className="p-6 bg-white border border-gray-200 shadow-xl rounded-2xl" initial={bounceVariant("right").initial} whileInView={bounceVariant("right").whileInView} transition={{ ...animationConfig, delay: 0.3 }}>
                    <h2 className="mb-4 text-2xl font-bold text-gray-700">Lokasi Ditampilkan</h2>
                    <ul className="pr-2 space-y-3 overflow-y-auto text-sm text-gray-600 h-96">
                        <AnimatePresence>
                            {filteredData.features.length > 0 ? (
                                filteredData.features.map((f, idx) => (
                                    <motion.li
                                        key={f.properties.Name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                                        className="flex items-center p-2 rounded-md hover:bg-gray-100"
                                    >
                                        <span className="flex-shrink-0 w-3 h-3 mr-3 bg-blue-600 rounded-full shadow"></span>
                                        {f.properties.Name}
                                    </motion.li>
                                ))
                            ) : (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="mt-4 text-center text-gray-500"
                                >
                                    Tidak ada lokasi untuk kategori ini.
                                </motion.p>
                            )}
                        </AnimatePresence>
                    </ul>
                </motion.div>
            </div>
        </div>
    );
};

export default MapPage;
