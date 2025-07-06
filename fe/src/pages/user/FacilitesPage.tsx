import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "../../utils/axiosInstance";
import SectionGrid from "../../components/SectionGrid";
import HeroSection from "../../components/HeroSection";

interface Facility {
  id: number;
  name: string;
  description: string;
  images: string[];
}

const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Facility[]>("/data/facility");
        setFacilities(response.data);
      } catch {
        setError("Tidak dapat memuat data fasilitas.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Memuat data fasilitas...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="bg-white">
      <HeroSection title="Fasilitas Umum" breadcrumb="Fasilitas Umum" bgImage="/gambar_pantai.jpg" placeholder="Cari Fasilitas" />
      <SectionGrid
        title="Sarana & Prasarana Publik"
        description="Temukan berbagai fasilitas publik yang tersedia untuk menunjang aktivitas Anda di Tegalsambi."
        data={facilities}
        itemUrlPrefix="facility"
        cardColor="bg-green-100"
      />
    </div>
  );
};

export default FacilitiesPage;
