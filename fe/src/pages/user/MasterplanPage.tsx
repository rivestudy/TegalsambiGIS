import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation";
import { FaChevronRight, FaFilePdf, FaBook, FaMap, FaBriefcase } from "react-icons/fa";

// daftar foto galeri pantai
import Pantai1 from "../../assets/Pantai/Pantai_1.webp";
import Pantai2 from "../../assets/Pantai/Pantai_2.webp";
import Pantai3 from "../../assets/Pantai/Pantai_3.webp";
import Pantai4 from "../../assets/Pantai/Pantai_4.webp";
import Pantai5 from "../../assets/Pantai/Pantai_5.webp";
import Pantai6 from "../../assets/Pantai/Pantai_6.webp";
import Pantai7 from "../../assets/Pantai/Pantai_7.webp";
import Pantai8 from "../../assets/Pantai/Pantai_8.webp";
import Pantai9 from "../../assets/Pantai/Pantai_9.webp";
import Pantai10 from "../../assets/Pantai/Pantai_10.webp";
// daftar foto galeri mbah surgi
import MbahSurgi1 from "../../assets/MbahSurgi/MbahSurgi_1.webp";
import MbahSurgi2 from "../../assets/MbahSurgi/MbahSurgi_2.webp";
import MbahSurgi3 from "../../assets/MbahSurgi/MbahSurgi_3.webp";
import MbahSurgi4 from "../../assets/MbahSurgi/MbahSurgi_4.webp";
import MbahSurgi5 from "../../assets/MbahSurgi/MbahSurgi_5.webp";
import MbahSurgi6 from "../../assets/MbahSurgi/MbahSurgi_6.webp";
import MbahSurgi7 from "../../assets/MbahSurgi/MbahSurgi_7.webp";
import MbahSurgi8 from "../../assets/MbahSurgi/MbahSurgi_8.webp";
// daftar foto galeri Mbah Babat
import MbahBabat1 from "../../assets/MbahBabat/Mbah_Babatan_1.webp";
import MbahBabat2 from "../../assets/MbahBabat/Mbah_Babatan_2.webp";
import MbahBabat3 from "../../assets/MbahBabat/Mbah_Babatan_3.webp";
import MbahBabat4 from "../../assets/MbahBabat/Mbah_Babatan_4.webp";
import MbahBabat5 from "../../assets/MbahBabat/Mbah_Babatan_5.webp";
import MbahBabat6 from "../../assets/MbahBabat/Mbah_Babatan_6.webp";
import MbahBabat7 from "../../assets/MbahBabat/Mbah_Babatan_7.webp";
// daftar foto galeri Mbah Tegal
import MbahTegal1 from "../../assets/MbahTegal/Mbah_Tegal_1.webp";
import MbahTegal2 from "../../assets/MbahTegal/Mbah_Tegal_2.webp";
import MbahTegal3 from "../../assets/MbahTegal/Mbah_Tegal_3.webp";
import MbahTegal4 from "../../assets/MbahTegal/Mbah_Tegal_4.webp";
import MbahTegal5 from "../../assets/MbahTegal/Mbah_Tegal_5.webp";
import MbahTegal6 from "../../assets/MbahTegal/Mbah_Tegal_6.webp";
import MbahTegal7 from "../../assets/MbahTegal/Mbah_Tegal_7.webp";
import MbahTegal8 from "../../assets/MbahTegal/Mbah_Tegal_8.webp";
// daftar foto galeri SNB
import SNB1 from "../../assets/SNB/SNB_1.webp";
import SNB2 from "../../assets/SNB/SNB_2.webp";
import SNB3 from "../../assets/SNB/SNB_3.webp";
import SNB4 from "../../assets/SNB/SNB_4.webp";
import SNB5 from "../../assets/SNB/SNB_5.webp";
import SNB6 from "../../assets/SNB/SNB_6.webp";
import SNB7 from "../../assets/SNB/SNB_7.webp";
import SNB8 from "../../assets/SNB/SNB_8.webp";
import SNB9 from "../../assets/SNB/SNB_9.webp";
import SNB10 from "../../assets/SNB/SNB_10.webp";
import SNB11 from "../../assets/SNB/SNB_11.webp";
import SNB12 from "../../assets/SNB/SNB_12.webp";
import SNB13 from "../../assets/SNB/SNB_13.webp";
import SNB14 from "../../assets/SNB/SNB_14.webp";
import SNB15 from "../../assets/SNB/SNB_15.webp";
import SNB16 from "../../assets/SNB/SNB_16.webp";
import SNB17 from "../../assets/SNB/SNB_17.webp";
import SNB18 from "../../assets/SNB/SNB_18.webp";
import SNB19 from "../../assets/SNB/SNB_19.webp";
import SNB20 from "../../assets/SNB/SNB_20.webp";
// poster
import poster from "../../assets/Poster.webp";

const GambarSNB = [SNB1, SNB2, SNB3, SNB4, SNB5, SNB6, SNB7, SNB8, SNB9, SNB10, SNB11, SNB12, SNB13, SNB14, SNB15, SNB16, SNB17, SNB18, SNB19, SNB20];
const GambarPantai = [Pantai1, Pantai2, Pantai3, Pantai4, Pantai5, Pantai6, Pantai7, Pantai8, Pantai9, Pantai10];
const GambarMbahSurgi = [MbahSurgi1, MbahSurgi2, MbahSurgi3, MbahSurgi4, MbahSurgi5, MbahSurgi6, MbahSurgi7, MbahSurgi8];
const GambarMbahBabat = [MbahBabat1, MbahBabat2, MbahBabat3, MbahBabat4, MbahBabat5, MbahBabat6, MbahBabat7];
const GambarMbahTegal = [MbahTegal1, MbahTegal2, MbahTegal3, MbahTegal4, MbahTegal5, MbahTegal6, MbahTegal7, MbahTegal8];

// Helper to shuffle images once on mount to keep it lightweight but dynamic
const useShuffledImages = (imageArray: string[], count: number) => {
    return useMemo(() => {
        const shuffled = [...imageArray].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }, [imageArray, count]);
};

// Bento Box Gallery Component for Modern Layout
const BentoGallery = ({ images, title, reverse = false }: { images: string[], title: string, reverse?: boolean }) => {
    const [idx, setIdx] = useState(0);

    useEffect(() => {
        if (images.length <= 3) return;
        const timer = setInterval(() => {
            setIdx((prev) => (prev + 3 >= images.length ? 0 : prev + 3));
        }, 5000); // 5 seconds interval for lightweight rotation
        return () => clearInterval(timer);
    }, [images.length]);

    const img1 = images[idx % images.length];
    const img2 = images[(idx + 1) % images.length];
    const img3 = images[(idx + 2) % images.length];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="mb-20"
        >
            <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-1 bg-blue-500 rounded-full"></div>
                <h3 className="text-2xl md:text-3xl font-extrabold text-gray-800 dark:text-gray-100">{title}</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-[220px] md:auto-rows-[250px]">
                {/* Image 1 (Large) */}
                <div className={`relative rounded-3xl overflow-hidden shadow-md group ${reverse ? 'md:col-start-2 md:col-span-2' : 'md:col-span-2'} md:row-span-2 bg-gray-200 dark:bg-slate-800`}>
                    <motion.img key={img1} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} src={img1} alt={`${title} 1`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                {/* Image 2 (Small 1) */}
                <div className={`relative rounded-3xl overflow-hidden shadow-md group bg-gray-200 dark:bg-slate-800 ${reverse ? 'md:col-start-1 md:row-start-1' : ''}`}>
                    <motion.img key={img2} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} src={img2} alt={`${title} 2`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                </div>
                {/* Image 3 (Small 2) */}
                <div className={`relative rounded-3xl overflow-hidden shadow-md group bg-gray-200 dark:bg-slate-800 ${reverse ? 'md:col-start-1 md:row-start-2' : ''}`}>
                    <motion.img key={img3} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} src={img3} alt={`${title} 3`} className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" loading="lazy" />
                </div>
            </div>
        </motion.div>
    );
};


const Masterplan: React.FC = () => {
    const [loading, setLoading] = useState(true);
    
    // Select images once
    // Use full images array, don't slice it so they can rotate
    const snbImages = useShuffledImages(GambarSNB, GambarSNB.length);
    const pantaiImages = useShuffledImages(GambarPantai, GambarPantai.length);
    const surgiImages = useShuffledImages(GambarMbahSurgi, GambarMbahSurgi.length);
    const tegalImages = useShuffledImages(GambarMbahTegal, GambarMbahTegal.length);
    const babatImages = useShuffledImages(GambarMbahBabat, GambarMbahBabat.length);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);

    if (loading) return <LoadingAnimation />;

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-500 pt-24 pb-20 font-sans relative overflow-hidden">
            
            {/* --- BACKGROUND MESH DECORATION --- */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[100px]"></div>
                <div className="absolute top-[20%] right-[-10%] w-[30%] h-[50%] rounded-full bg-emerald-400/10 dark:bg-emerald-600/10 blur-[100px]"></div>
                <div className="absolute bottom-[-10%] left-[20%] w-[50%] h-[40%] rounded-full bg-orange-400/10 dark:bg-orange-600/10 blur-[120px]"></div>
            </div>

            {/* --- HEADER SECTION --- */}
            <div className="max-w-7xl mx-auto px-6 mb-16 relative z-10">
                <nav className="mb-6">
                    <ol className="flex items-center space-x-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        <li>
                            <Link to="/" className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                                Landing Page
                            </Link>
                        </li>
                        <li className="text-gray-400 dark:text-gray-500"><FaChevronRight className="text-[10px]" /></li>
                        <li className="text-blue-600 dark:text-blue-400 font-bold">Masterplan</li>
                    </ol>
                </nav>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl"
                >
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6 tracking-tight">
                        Masterplan Desa Wisata <span className="text-blue-600 dark:text-blue-400">Tegalsambi</span>
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed font-medium">
                        Desa Tegalsambi dikembangkan sebagai desa wisata yang mencakup tiga kategori utama: wisata budaya, wisata religi, dan wisata pesisir. Masterplan ini menjadi panduan pembangunan kawasan wisata yang berkelanjutan dengan mempertimbangkan potensi lokal, kenyamanan pengunjung, serta pelestarian lingkungan dan budaya.
                    </p>
                </motion.div>
            </div>

            {/* --- GAMBARAN POSTER & VIDEO SECTION --- */}
            <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md py-20 border-y border-white/50 dark:border-slate-800/50 shadow-sm mb-20 relative z-10 transition-colors duration-500">
                <div className="max-w-7xl mx-auto px-6">
                    
                    {/* Poster Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="order-2 lg:order-1"
                        >
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Sustainable Coastal Tourism</h3>
                            <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
                                <p>
                                    Masterplan Desa Wisata Pesisir Tangguh Tegalsambi dirancang untuk mengembangkan potensi alam, budaya, dan ekonomi masyarakat melalui konsep pariwisata pesisir yang berkelanjutan.
                                </p>
                                <p>
                                    Kawasan wisata ini dibagi menjadi tiga zona utama:
                                    <strong className="text-blue-600 dark:text-blue-400"> Zona Religi</strong>, <strong className="text-orange-500 dark:text-orange-400">Zona Pantai</strong>, dan <strong className="text-emerald-600 dark:text-emerald-400">Zona Seni Budaya</strong>, 
                                    yang terintegrasi dengan infrastruktur ramah lingkungan, konservasi pesisir, dan digitalisasi.
                                </p>
                                <p>
                                    Tujuan utama pengembangan ini adalah menciptakan desa wisata tangguh yang berdaya saing, berkelanjutan, serta tetap menjaga kelestarian lingkungan dan kearifan lokal setempat.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="order-1 lg:order-2 rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-800 p-2"
                        >
                            <img src={poster} alt="Poster Masterplan Tegalsambi" className="w-full h-auto rounded-2xl object-cover" />
                        </motion.div>
                    </div>

                    {/* Video Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="rounded-3xl overflow-hidden shadow-2xl border border-gray-100 dark:border-slate-800 bg-gray-900 aspect-video relative"
                        >
                            <iframe title="Video Masterplan Tegalsambi" src="https://www.youtube.com/embed/oGE3Ydgwr1Y" className="absolute inset-0 w-full h-full" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Visualisasi Masterplan</h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px] mb-4">
                                Saksikan visualisasi 3D rencana pengembangan Desa Wisata Tegalsambi. Memadukan potensi alam, sejarah, budaya dan seni, Desa Wisata Tegalsambi diharapkan mampu menjadi desa wisata yang semakin maju dan terus berkembang.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
                                Melalui penataan ruang yang tertata, perbaikan infrastruktur, serta penambahan amenitas pariwisata kelas menengah, kami bersiap menyambut wisatawan dengan pengalaman yang tak terlupakan.
                            </p>
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* --- GALERI BENTO BOX --- */}
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <BentoGallery title="Zona Seni & Budaya" images={snbImages} />
                <BentoGallery title="Zona Pesisir Pantai" images={pantaiImages} reverse={true} />
                <BentoGallery title="Makam Mbah Surgimanis" images={surgiImages} />
                <BentoGallery title="Makam Mbah Tegal" images={tegalImages} reverse={true} />
                <BentoGallery title="Makam Mbah Babatan" images={babatImages} />
            </div>

            {/* --- DOWNLOAD SECTION --- */}
            <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto px-6 mt-10 mb-10"
            >
                <div className="bg-gradient-to-br from-blue-900 to-indigo-900 rounded-3xl p-10 md:p-14 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-400 opacity-10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
                    
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">Unduh Dokumen Masterplan</h3>
                    <p className="text-blue-200 mb-10 max-w-2xl mx-auto relative z-10">Pelajari lebih lanjut mengenai kajian teknis, kesiapan masyarakat, dan kerangka manajemen pembangunan Desa Wisata Tegalsambi.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
                        <a href="https://drive.google.com/uc?export=download&id=1XquM8FOhdLktGdaqiQVCWW-HX7hKVPcY" target="_blank" rel="noreferrer" className="group flex flex-col items-center p-6 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-xl mb-4 shadow-lg group-hover:scale-110 transition-transform"><FaMap /></div>
                            <span className="font-semibold text-white text-sm">Buku Masterplan</span>
                        </a>
                        <a href="https://drive.google.com/uc?export=download&id=15UxvF4syxbB_XllbGEdf00VuR3ENqnqH" target="_blank" rel="noreferrer" className="group flex flex-col items-center p-6 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center text-xl mb-4 shadow-lg group-hover:scale-110 transition-transform"><FaBook /></div>
                            <span className="font-semibold text-white text-sm">Kajian Masyarakat</span>
                        </a>
                        <a href="https://drive.google.com/uc?export=download&id=1KMHRvZ7RLaE_IY5VXCLY691BrST9q2dx" target="_blank" rel="noreferrer" className="group flex flex-col items-center p-6 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xl mb-4 shadow-lg group-hover:scale-110 transition-transform"><FaFilePdf /></div>
                            <span className="font-semibold text-white text-sm">Manajemen Pembangunan</span>
                        </a>
                        <a href="https://drive.google.com/uc?export=download&id=1_hBAuCU-ciVYYuB_PqBJ0OtyXRYNmYGM" target="_blank" rel="noreferrer" className="group flex flex-col items-center p-6 bg-white/10 hover:bg-white/20 border border-white/10 backdrop-blur-md rounded-2xl transition-all duration-300 hover:-translate-y-1">
                            <div className="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl mb-4 shadow-lg group-hover:scale-110 transition-transform"><FaBriefcase /></div>
                            <span className="font-semibold text-white text-sm">Pengembangan BUMDes</span>
                        </a>
                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export default Masterplan;
