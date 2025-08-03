import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "../../utils/axiosInstance"; // adjust if needed
import { GeoJsonObject, Feature } from 'geojson';

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

const MapPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("semua");
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);
  const [mapKey, setMapKey] = useState(Date.now());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attractionRes, accommodationRes, facilityRes] = await Promise.all([
          axios.get("/data/attraction"),
          axios.get("/data/accommodation"),
          axios.get("/data/facility"),
        ]);

        const features: Feature[] = [];

        // Attractions (pesisir, religi, budaya)
        for (const item of attractionRes.data ?? []) {
          const [lat, lng] = item.location.split(',').map(Number);
          features.push({
            type: "Feature",
            properties: {
              Name: item.name,
              Category: `Wisata ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}`,
              timestamp: new Date().toISOString()
            },
            geometry: {
              type: "Point",
              coordinates: [lng, lat, 0]
            }
          });
        }

        // Accommodations (penginapan)
        for (const item of accommodationRes.data ?? []) {
          const [lat, lng] = item.location.split(',').map(Number);
          features.push({
            type: "Feature",
            properties: {
              Name: item.name,
              Category: "Penginapan",
              timestamp: new Date().toISOString()
            },
            geometry: {
              type: "Point",
              coordinates: [lng, lat, 0]
            }
          });
        }

        // Facilities (no category in DB)
        for (const item of facilityRes.data ?? []) {
          const [lat, lng] = item.location.split(',').map(Number);
          features.push({
            type: "Feature",
            properties: {
              Name: item.name,
              Category: "Fasilitas",
              timestamp: new Date().toISOString()
            },
            geometry: {
              type: "Point",
              coordinates: [lng, lat, 0]
            }
          });
        }

        setGeoData({ type: "FeatureCollection", features });
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setTimeout(() => setLoading(false), 600); // Add animation delay
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!geoData) return { type: "FeatureCollection", features: [] };
    if (selectedFilter === "semua") return geoData;
    return {
      ...geoData,
      features: geoData.features.filter(
        (f: any) => f.properties?.Category === selectedFilter
      ),
    };
  }, [geoData, selectedFilter]);

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
            <li><strong>Koordinat:</strong> ${feature.geometry.coordinates.slice(0, 2).map((c: number) => c.toFixed(5)).join(', ')}</li>
          </ul>
        </div>`;
      layer.bindPopup(content);
    }
  };

  const mapCenter: [number, number] = useMemo(() => {
    const features = filteredData.features;
    if (features.length === 0) return [-6.9, 110.4]; // default fallback
    const latSum = features.reduce((sum, f: any) => sum + f.geometry.coordinates[1], 0);
    const lngSum = features.reduce((sum, f: any) => sum + f.geometry.coordinates[0], 0);
    return [latSum / features.length, lngSum / features.length];
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
        <motion.div className="grid w-full gap-8 grid-rows-10 md:col-span-3" initial={bounceVariant("left").initial} whileInView={bounceVariant("left").whileInView} transition={animationConfig}>
          <div className="row-span-2 p-4 bg-white border border-gray-300 shadow-lg rounded-2xl">
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

          <div className="relative p-2 overflow-hidden bg-white border border-gray-300 shadow-lg row-span-8 rounded-2xl">
            <style>{`
              .leaflet-container {
                position: relative !important;
                height: 100% !important;
                width: 100% !important;
                z-index: 0 !important;
              }
              .leaflet-top, .leaflet-bottom {
                z-index: 1 !important;
              }
            `}</style>
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
          </div>
        </motion.div>

        {/* Sidebar */}
        <motion.div className="w-full col-span-4 p-6 bg-white border border-gray-200 shadow-xl md:col-span-1 rounded-2xl" initial={bounceVariant("right").initial} whileInView={bounceVariant("right").whileInView} transition={{ ...animationConfig, delay: 0.3 }}>
          <h2 className="mb-4 text-2xl font-bold text-gray-700">Lokasi Ditampilkan</h2>
          <ul className="pr-2 space-y-3 overflow-y-auto text-sm text-gray-600 min-h-96">
            <AnimatePresence>
              {filteredData.features.length > 0 ? (
                filteredData.features.map((f: any, idx: number) => (
                  <motion.li
                    key={f.properties.Name + idx}
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
