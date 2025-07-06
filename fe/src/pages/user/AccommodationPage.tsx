import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import SectionGrid from "../../components/SectionGrid";

import HeroSection from "../../components/HeroSection";

interface Accommodation {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

const formatPrice = (price?: number): string => price === 0 ? "Harga bervariasi" : `Mulai dari Rp ${price?.toLocaleString("id-ID")} /malam`;

const AccommodationPage = () => {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Accommodation[]>("/data/accommodation");
        setAccommodations(response.data);
      } catch {
        setError("Tidak dapat memuat data penginapan.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div className="flex items-center justify-center h-screen">Memuat data penginapan...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="bg-white">
      <HeroSection title="Penginapan & Akomodasi" breadcrumb="Penginapan" bgImage="/gambar_pantai.jpg" placeholder="Cari Penginapan" />
      <SectionGrid
        title="Temukan Tempat Menginap Terbaik"
        description="Dari hotel mewah hingga guesthouse nyaman, temukan akomodasi terbaik di Tegalsambi."
        data={accommodations}
        itemUrlPrefix="accommodation"
        cardColor="bg-orange-100"
        priceColor="text-orange-600"
        formatPrice={formatPrice}
      />
    </div>
  );
};

export default AccommodationPage;
