import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, GeoJSON, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from "../../utils/axiosInstance";
import { GeoJsonObject, Feature } from 'geojson';
import { FaChevronLeft, FaMapMarkedAlt, FaFilter } from "react-icons/fa";

const IMAGE_BASE_URL = process.env.REACT_APP_IMAGE_BASE_URL;
const fallbackImage = "https://placehold.co/800x600/e2e8f0/4a5568?text=Gambar+Tidak+Tersedia";

// --- Loading Component ---
const LoadingAnimation = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors duration-500">
    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
  </div>
);

// Fix Leaflet icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

const categoryIcons: Record<string, L.Icon> = {
  "Wisata Religi": new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  }),
  "Wisata Budaya": new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  }),
  "Wisata Pesisir": new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  }),
  "Penginapan": new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  }),
  "Fasilitas": new L.Icon({
    iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
  }),
};

const categoryColors: Record<string, string> = {
  "Wisata Religi": "bg-red-500",
  "Wisata Budaya": "bg-green-500",
  "Wisata Pesisir": "bg-orange-500",
  "Penginapan": "bg-violet-500",
  "Fasilitas": "bg-blue-500",
};

// Component to handle programmatic map flying
const MapFlyTo = ({ center }: { center: [number, number] | null }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 17, { duration: 1.5, easeLinearity: 0.25 });
    }
  }, [center, map]);
  return null;
};

const MapPage = () => {
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("semua");
  const [geoData, setGeoData] = useState<GeoJsonObject | null>(null);
  const [mapKey, setMapKey] = useState(Date.now());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeCenter, setActiveCenter] = useState<[number, number] | null>(null);
  const markerRefs = useRef<Record<string, L.Layer>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attractionRes, accommodationRes, facilityRes] = await Promise.all([
          axios.get("/data/attraction"),
          axios.get("/data/accommodation"),
          axios.get("/data/facility"),
        ]);

        const features: Feature[] = [];

        const getFirstImage = (dataImages: any) => {
            if (Array.isArray(dataImages) && dataImages.length > 0) {
                return dataImages[0]?.dir ? `${IMAGE_BASE_URL}/${dataImages[0].dir}` : fallbackImage;
            }
            return fallbackImage;
        };

        for (const item of attractionRes.data ?? []) {
          const [lat, lng] = item.location.split(',').map(Number);
          features.push({
            type: "Feature",
            properties: { 
                Name: item.name, 
                Category: `Wisata ${item.category.charAt(0).toUpperCase() + item.category.slice(1)}`,
                Image: getFirstImage(item.images),
                Link: `/attraction/${item.id}`
            },
            geometry: { type: "Point", coordinates: [lng, lat, 0] }
          });
        }

        for (const item of accommodationRes.data ?? []) {
          const [lat, lng] = item.location.split(',').map(Number);
          features.push({
            type: "Feature",
            properties: { 
                Name: item.name, 
                Category: "Penginapan",
                Image: getFirstImage(item.images),
                Link: `/accommodation/${item.id}`
            },
            geometry: { type: "Point", coordinates: [lng, lat, 0] }
          });
        }

        for (const item of facilityRes.data ?? []) {
          const [lat, lng] = item.location.split(',').map(Number);
          features.push({
            type: "Feature",
            properties: { 
                Name: item.name, 
                Category: "Fasilitas",
                Image: getFirstImage(item.images),
                Link: `/facility/${item.id}`
            },
            geometry: { type: "Point", coordinates: [lng, lat, 0] }
          });
        }

        setGeoData({ type: "FeatureCollection", features });
      } catch (err) {
        console.error("Failed to load data", err);
      } finally {
        setTimeout(() => setLoading(false), 500);
      }
    };

    fetchData();
  }, []);

  const filteredData = useMemo(() => {
    if (!geoData) return { type: "FeatureCollection", features: [] };
    if (selectedFilter === "semua") return geoData;
    return {
      ...geoData,
      features: (geoData as any).features.filter((f: any) => f.properties?.Category === selectedFilter),
    };
  }, [geoData, selectedFilter]);

  useEffect(() => {
    setMapKey(Date.now());
  }, [selectedFilter]);

  const onEachFeature = (feature: any, layer: L.Layer) => {
    if (feature.properties?.Name) {
      const imageUrl = feature.properties.Image;
      const linkUrl = feature.properties.Link;
      
      const content = `
        <div class="min-w-[200px] overflow-hidden">
          <div class="h-32 w-full bg-cover bg-center rounded-t-lg" style="background-image: url('${imageUrl}')"></div>
          <div class="p-3 pb-2">
            <h3 class="text-[15px] font-bold text-gray-900 mb-1 leading-tight">${feature.properties.Name}</h3>
            <span class="inline-block px-2 py-0.5 bg-gray-100 text-gray-700 text-[10px] rounded font-semibold tracking-wide border border-gray-200 mb-2">
              ${feature.properties.Category}
            </span>
            <a href="${linkUrl}" class="block w-full text-center bg-blue-500 hover:bg-blue-600 !text-white text-[11px] font-bold py-1.5 rounded-md transition-colors shadow-sm">
              Lihat Detail
            </a>
          </div>
        </div>`;
        
      layer.bindPopup(content, { className: 'custom-rich-popup', closeButton: true });
      
      // Simpan referensi layer berdasarkan nama
      markerRefs.current[feature.properties.Name] = layer;

      // Open popup on hover
      layer.on('mouseover', function (e) {
        e.target.openPopup();
      });
    }
  };

  const initialMapCenter: [number, number] = useMemo(() => {
    if (!geoData || !geoData.features || (geoData.features as any[]).length === 0) return [-6.5925, 110.6481]; // Default Jepara/Tegalsambi fallback
    const features = geoData.features as any[];
    const latSum = features.reduce((sum: number, f: any) => sum + f.geometry.coordinates[1], 0);
    const lngSum = features.reduce((sum: number, f: any) => sum + f.geometry.coordinates[0], 0);
    return [latSum / features.length, lngSum / features.length];
  }, [geoData]);
  if (loading) return <LoadingAnimation />;

  return (
    <div className="h-screen w-full relative overflow-hidden bg-gray-50 dark:bg-slate-950 font-sans transition-colors duration-500">
      
      {/* --- Map Section (True Full Screen) --- */}
      <div className="absolute inset-0 z-0">
        <style>{`
          .leaflet-container { height: 100% !important; width: 100% !important; background: #e2e8f0; }
          .dark .leaflet-container { filter: invert(1) hue-rotate(180deg) brightness(95%) contrast(90%); }
          .leaflet-control-zoom { border: none !important; box-shadow: 0 4px 20px rgba(0,0,0,0.15) !important; border-radius: 12px !important; overflow: hidden; margin-top: 100px !important; margin-right: 20px !important; }
          .leaflet-control-zoom a { border: none !important; color: #475569 !important; background: white !important; transition: all 0.2s; width: 40px !important; height: 40px !important; line-height: 40px !important; font-size: 18px !important; }
          .dark .leaflet-control-zoom a { color: #cbd5e1 !important; background: #1e293b !important; }
          .leaflet-control-zoom a:hover { background: #f8fafc !important; color: #3b82f6 !important; }
          .dark .leaflet-control-zoom a:hover { background: #334155 !important; color: #60a5fa !important; }
          
          /* Un-invert the popup inside inverted map */
          .dark .custom-rich-popup { filter: invert(1) hue-rotate(180deg); }
          .custom-rich-popup .leaflet-popup-content-wrapper { padding: 0; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0,0,0,0.15), 0 8px 10px -6px rgba(0,0,0,0.1); border: 1px solid #f1f5f9; }
          .custom-rich-popup .leaflet-popup-content { margin: 0; }
          .custom-rich-popup .leaflet-popup-tip { box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); }
          .custom-rich-popup .leaflet-popup-close-button { color: white !important; text-shadow: 0 1px 3px rgba(0,0,0,0.5); z-index: 10; top: 4px !important; right: 4px !important; }
          .custom-scrollbar::-webkit-scrollbar { width: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; }
          .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #64748b; }
        `}</style>
        
        <MapContainer
          key={mapKey}
          center={initialMapCenter}
          zoom={15}
          zoomControl={false} // Will add custom positioned one
          scrollWheelZoom={true}
        >
          {/* Custom Positioned Zoom Control */}
          <div className="leaflet-top leaflet-right">
             <div className="leaflet-control-zoom leaflet-bar leaflet-control">
                <a className="leaflet-control-zoom-in" href="#" title="Zoom in" role="button" aria-label="Zoom in" onClick={(e)=>{e.preventDefault();}} >+</a>
                <a className="leaflet-control-zoom-out" href="#" title="Zoom out" role="button" aria-label="Zoom out" onClick={(e)=>{e.preventDefault();}} >−</a>
             </div>
          </div>

          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          
          <GeoJSON
            data={filteredData as GeoJsonObject}
            onEachFeature={onEachFeature}
            pointToLayer={(feature, latlng) => {
              const category = feature.properties?.Category;
              const icon = categoryIcons[category] || new L.Icon.Default();
              return L.marker(latlng, { icon });
            }}
          />

          <MapFlyTo center={activeCenter} />
        </MapContainer>
      </div>

      {/* --- Sidebar Panel (Floating Glassmorphism) --- */}
      {/* 80px top padding ensures it starts below the Navbar. On desktop it floats on the left, on mobile it's a bottom sheet */}
      <div className={`absolute z-10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shadow-2xl flex flex-col transition-all duration-300 overflow-hidden border border-white/50 dark:border-slate-700/50
          left-0 right-0 w-full rounded-t-2xl bottom-0 top-auto
          ${isSidebarOpen ? 'h-[85vh]' : 'h-[72px]'}
          md:left-4 md:right-auto md:w-[350px] lg:w-[380px] md:rounded-2xl
          ${isSidebarOpen ? 'md:top-[100px] md:bottom-6 md:h-auto' : 'md:top-[100px] md:bottom-auto md:h-[72px]'}`}>
        
        {/* Header & Mobile Toggle */}
        <div className="p-5 border-b border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 relative flex-shrink-0 cursor-pointer md:cursor-default transition-colors duration-500" onClick={() => window.innerWidth < 768 && setIsSidebarOpen(!isSidebarOpen)}>
          
          {/* Mobile Handle */}
          <div className="w-12 h-1.5 bg-gray-300 dark:bg-slate-600 rounded-full mx-auto mb-4 md:hidden"></div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 dark:text-blue-400 shadow-inner">
                  <FaMapMarkedAlt className="text-xl" />
               </div>
               <div>
                 <h1 className="text-xl font-extrabold text-gray-900 dark:text-white leading-none">Peta Desa</h1>
                 <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mt-1 block">WebGIS Tegalsambi</span>
               </div>
            </div>
            
            <button onClick={(e) => { e.stopPropagation(); setIsSidebarOpen(!isSidebarOpen); }} className="hidden md:flex w-8 h-8 rounded-full bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 items-center justify-center text-gray-600 dark:text-gray-300 transition-colors border border-gray-200 dark:border-slate-700">
               <FaChevronLeft className={`text-xs transition-transform ${!isSidebarOpen && 'rotate-180'}`} />
            </button>
          </div>
        </div>

        <div className={`flex flex-col flex-1 overflow-hidden transition-opacity duration-300 ${!isSidebarOpen ? 'opacity-0 hidden' : 'opacity-100'}`}>
            {/* Filter Area */}
            <div className="p-5 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-800/50 flex-shrink-0 transition-colors duration-500">
              <label className="mb-2 font-bold text-gray-700 dark:text-gray-300 text-xs uppercase tracking-wider flex items-center gap-2">
                  <FaFilter className="text-gray-400 dark:text-gray-500" /> Kategori Peta
              </label>
              <div className="relative">
                 <select 
                    value={selectedFilter} 
                    onChange={(e) => setSelectedFilter(e.target.value)} 
                    className="w-full p-3 pl-4 pr-10 text-sm font-medium text-gray-700 dark:text-gray-200 transition bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl appearance-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 outline-none shadow-sm cursor-pointer hover:border-gray-300 dark:hover:border-slate-600"
                 >
                    <option value="semua">Semua Lokasi</option>
                    <option value="Wisata Religi">Wisata Religi</option>
                    <option value="Wisata Budaya">Wisata Budaya</option>
                    <option value="Wisata Pesisir">Wisata Pesisir</option>
                    <option value="Fasilitas">Fasilitas Publik</option>
                    <option value="Penginapan">Penginapan</option>
                 </select>
                 {/* Custom select arrow */}
                 <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                 </div>
              </div>
            </div>

            {/* List of Locations (Scrollable) */}
            <div className="flex-1 overflow-y-auto px-5 pb-5 custom-scrollbar bg-white/80 dark:bg-slate-900/80 transition-colors duration-500">
              <h2 className="mb-3 pt-5 pb-3 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest sticky top-0 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md z-10 border-b border-gray-100/50 dark:border-slate-800/50 -mx-5 px-5">
                  Daftar Lokasi <span className="bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-full ml-1">{(filteredData as any).features.length}</span>
              </h2>
              
              <ul className="space-y-2 pb-10 md:pb-0">
                <AnimatePresence>
                  {(filteredData as any).features.length > 0 ? (
                    (filteredData as any).features.map((f: any, idx: number) => (
                      <motion.li
                        key={f.properties.Name + idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2, delay: Math.min(idx * 0.02, 0.3) }}
                        onClick={() => {
                            setActiveCenter([f.geometry.coordinates[1], f.geometry.coordinates[0]]);
                            if (window.innerWidth < 768) setIsSidebarOpen(false); // auto-close on mobile
                            
                            // Buka popup secara otomatis
                            setTimeout(() => {
                                const layer = markerRefs.current[f.properties.Name];
                                if (layer && (layer as any).openPopup) {
                                    (layer as any).openPopup();
                                }
                            }, 300);
                        }}
                        className="group flex items-start p-3 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/30 border border-transparent hover:border-blue-100 dark:hover:border-blue-900/50 transition-all cursor-pointer shadow-sm hover:shadow-md bg-white dark:bg-slate-800"
                      >
                        <span className={`mt-1.5 flex-shrink-0 w-2.5 h-2.5 rounded-full shadow-sm mr-3 ${categoryColors[f.properties.Category] || 'bg-gray-400'}`}></span>
                        <div>
                            <p className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{f.properties.Name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{f.properties.Category}</p>
                        </div>
                      </motion.li>
                    ))
                  ) : (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-10 text-center">
                      <div className="w-16 h-16 mb-4 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                        <FaMapMarkedAlt className="text-2xl" />
                      </div>
                      <p className="text-sm font-semibold text-gray-700">Tidak ada lokasi</p>
                      <p className="text-xs text-gray-500 mt-1">Silakan pilih kategori lain.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ul>
            </div>
        </div>

      </div>
    </div>
  );
};

export default MapPage;