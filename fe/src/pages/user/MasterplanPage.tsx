import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Transition } from "framer-motion";
import { Link } from "react-router-dom";
import LoadingAnimation from "../../components/LoadingAnimation";

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

const bounceVariant = (direction: "top" | "bottom" | "left" | "right") => {
    switch (direction) {
        case "top":
            return { initial: { opacity: 0, y: -60 }, animate: { opacity: 1, y: 0 } };
        case "bottom":
            return { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 } };
        case "left":
            return { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 } };
        case "right":
            return { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 } };
    }
};

const animationConfig: Transition = {
    type: "spring",
    bounce: 0.6,
    duration: 2.5,
};

const SNBSection: React.FC = () => {
    const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

    useEffect(() => {
        const getUniqueIndexes = () => {
            const allIndexes = Array.from({ length: GambarSNB.length }, (_, i) => i);
            for (let i = allIndexes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allIndexes[i], allIndexes[j]] = [allIndexes[j], allIndexes[i]];
            }
            return allIndexes.slice(0, 4);
        };

        setVisibleIndexes(getUniqueIndexes());
        const interval = setInterval(() => {
            setVisibleIndexes(getUniqueIndexes());
        }, 4800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-6 max-w-7xl mx-auto mt-6 relative">
            {visibleIndexes.map((index, i) => (
                <div key={i} className="relative h-72 rounded-2xl overflow-hidden shadow-xl">
                    <AnimatePresence mode="sync">
                        <motion.img
                            key={index}
                            src={GambarSNB[index]}
                            alt={`SNB ${i + 1}`}
                            className="absolute inset-0 object-cover w-full h-full rounded-2xl"
                            initial={{ scale: 1, x: "100%", opacity: 0 }}
                            animate={{ scale: 1.1, x: 0, opacity: 1 }}
                            exit={{ scale: 1, x: "-100%", opacity: 0 }}
                            transition={{
                                scale: { duration: 4, ease: "easeInOut" },
                                x: { duration: 0.8, ease: "easeInOut" },
                                opacity: { duration: 0.8, ease: "easeInOut" },
                            }}
                        />
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

const PantaiSection: React.FC = () => {
    const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

    useEffect(() => {
        // fungsi untuk ambil 3 index unik
        const getUniqueIndexes = () => {
            const allIndexes = Array.from({ length: GambarPantai.length }, (_, i) => i);
            for (let i = allIndexes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allIndexes[i], allIndexes[j]] = [allIndexes[j], allIndexes[i]];
            }
            return allIndexes.slice(0, 3);
        };
        setVisibleIndexes(getUniqueIndexes());
        const interval = setInterval(() => {
            setVisibleIndexes(getUniqueIndexes());
        }, 4800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-6 max-w-7xl mx-auto mt-6 relative">
            {/* Foto atas penuh (col-span 2) */}
            <div className="relative col-span-2 h-full rounded-2xl overflow-hidden shadow-xl">
                <AnimatePresence mode="sync">
                    <motion.img
                        key={visibleIndexes[0]}
                        src={GambarPantai[visibleIndexes[0]]}
                        alt="Pantai Atas"
                        className="absolute inset-0 object-cover w-full h-full rounded-2xl"
                        initial={{ scale: 1, x: "100%", opacity: 0 }}
                        animate={{ scale: 1.1, x: 0, opacity: 1 }}
                        exit={{ scale: 1, x: "-100%", opacity: 0 }}
                        transition={{
                            scale: { duration: 4, ease: "easeInOut" },
                            x: { duration: 0.8, ease: "easeInOut" },
                            opacity: { duration: 0.8, ease: "easeInOut" },
                        }}
                    />
                </AnimatePresence>
            </div>

            {/* 2 foto kecil di bawah */}
            {visibleIndexes.slice(1).map((index, i) => (
                <div key={i} className="relative h-60 rounded-2xl overflow-hidden shadow-xl">
                    <AnimatePresence mode="sync">
                        <motion.img
                            key={index}
                            src={GambarPantai[index]}
                            alt={`Pantai ${i + 1}`}
                            className="absolute inset-0 object-cover w-full h-full rounded-2xl"
                            initial={{ scale: 1, x: "100%", opacity: 0 }}
                            animate={{ scale: 1.1, x: 0, opacity: 1 }}
                            exit={{ scale: 1, x: "-100%", opacity: 0 }}
                            transition={{
                                scale: { duration: 4, ease: "easeInOut" },
                                x: { duration: 0.8, ease: "easeInOut" },
                                opacity: { duration: 0.8, ease: "easeInOut" },
                            }}
                        />
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
};

const MbahSurgiSection: React.FC = () => {
    const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

    useEffect(() => {
        const getUniqueIndexes = () => {
            const allIndexes = Array.from({ length: GambarMbahSurgi.length }, (_, i) => i);
            for (let i = allIndexes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allIndexes[i], allIndexes[j]] = [allIndexes[j], allIndexes[i]];
            }
            return allIndexes.slice(0, 4);
        };

        setVisibleIndexes(getUniqueIndexes());
        const interval = setInterval(() => {
            setVisibleIndexes(getUniqueIndexes());
        }, 4800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto mt-6 h-[500px]">
            {/* Dua gambar kecil di atas */}
            <div className="col-span-1 flex flex-col gap-6">
                {[visibleIndexes[0], visibleIndexes[1]].map((index, i) => (
                    <div key={i} className="relative h-[240px] rounded-2xl overflow-hidden shadow-xl">
                        <AnimatePresence mode="sync">
                            <motion.img
                                key={index}
                                src={GambarMbahSurgi[index]}
                                alt={`Gambar Kecil Atas ${i + 1}`}
                                className="absolute inset-0 object-cover w-full h-full rounded-2xl"
                                initial={{ scale: 1, y: "-100%", opacity: 0 }}
                                animate={{ scale: 1.1, y: 0, opacity: 1 }}
                                exit={{ scale: 1, y: "100%", opacity: 0 }}
                                transition={{
                                    scale: { duration: 4, ease: "easeInOut" },
                                    y: { duration: 0.8, ease: "easeInOut" },
                                    opacity: { duration: 0.8, ease: "easeInOut" },
                                }}
                            />
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Gambar besar di bawah (span 2 kolom) */}
            <div className="col-span-2 row-span-1 relative rounded-2xl overflow-hidden shadow-xl">
                <AnimatePresence mode="sync">
                    <motion.img
                        key={visibleIndexes[2]}
                        src={GambarMbahSurgi[visibleIndexes[2]]}
                        alt="Gambar Besar"
                        className="absolute inset-0 object-cover w-full h-full rounded-2xl"
                        initial={{ scale: 1, x: "100%", opacity: 0 }}
                        animate={{ scale: 1.1, x: 0, opacity: 1 }}
                        exit={{ scale: 1, x: "-100%", opacity: 0 }}
                        transition={{
                            scale: { duration: 4, ease: "easeInOut" },
                            x: { duration: 0.8, ease: "easeInOut" },
                            opacity: { duration: 0.8, ease: "easeInOut" },
                        }}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
};

const TegalSection: React.FC = () => {
    const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

    useEffect(() => {
        // fungsi untuk ambil 3 index unik
        const getUniqueIndexes = () => {
            const allIndexes = Array.from({ length: GambarMbahTegal.length }, (_, i) => i);
            for (let i = allIndexes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allIndexes[i], allIndexes[j]] = [allIndexes[j], allIndexes[i]];
            }
            return allIndexes.slice(0, 3);
        };

        setVisibleIndexes(getUniqueIndexes());

        const interval = setInterval(() => {
            setVisibleIndexes(getUniqueIndexes());
        }, 4800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-2 grid-rows-2 gap-6 max-w-7xl mx-auto mt-6 relative">
            {/* 2 foto kecil di atas */}
            {visibleIndexes.slice(0, 2).map((index, i) => (
                <div key={i} className="relative h-60 rounded-2xl overflow-hidden shadow-xl">
                    <AnimatePresence mode="sync">
                        <motion.img
                            key={index}
                            src={GambarMbahTegal[index]}
                            alt={`Tegal ${i + 1}`}
                            className="absolute inset-0 object-cover w-full h-full rounded-2xl"
                            initial={{ scale: 1, y: "-100%", opacity: 0 }}
                            animate={{ scale: 1.1, y: 0, opacity: 1 }}
                            exit={{ scale: 1, y: "100%", opacity: 0 }}
                            transition={{
                                scale: { duration: 4, ease: "easeInOut" },
                                y: { duration: 0.8, ease: "easeInOut" },
                                opacity: { duration: 0.8, ease: "easeInOut" },
                            }}
                        />
                    </AnimatePresence>
                </div>
            ))}

            {/* Foto lebar penuh di bawah */}
            <div className="relative col-span-2 h-full rounded-2xl overflow-hidden shadow-xl">
                <AnimatePresence mode="sync">
                    <motion.img
                        key={visibleIndexes[2]}
                        src={GambarMbahTegal[visibleIndexes[2]]}
                        alt="Tegal Bawah"
                        className="absolute inset-0 object-cover w-full h-full rounded-2xl"
                        initial={{ scale: 1, y: "100%", opacity: 0 }}
                        animate={{ scale: 1.1, y: 0, opacity: 1 }}
                        exit={{ scale: 1, y: "-100%", opacity: 0 }}
                        transition={{
                            scale: { duration: 4, ease: "easeInOut" },
                            y: { duration: 0.8, ease: "easeInOut" },
                            opacity: { duration: 0.8, ease: "easeInOut" },
                        }}
                    />
                </AnimatePresence>
            </div>
        </div>
    );
};

const BabatSection: React.FC = () => {
    const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

    useEffect(() => {
        const getUniqueIndexes = () => {
            const allIndexes = Array.from({ length: GambarMbahBabat.length }, (_, i) => i);
            for (let i = allIndexes.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [allIndexes[i], allIndexes[j]] = [allIndexes[j], allIndexes[i]];
            }
            return allIndexes.slice(0, 3); // ambil 3 gambar
        };

        setVisibleIndexes(getUniqueIndexes());
        const interval = setInterval(() => {
            setVisibleIndexes(getUniqueIndexes());
        }, 4800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="grid grid-cols-3 gap-6 max-w-7xl mx-auto mt-6 h-[500px]">
            {/* Gambar lebar penuh di kiri (span 2 kolom) */}
            <div className="col-span-2 relative rounded-2xl overflow-hidden shadow-xl">
                <AnimatePresence mode="sync">
                    <motion.img
                        key={visibleIndexes[0]}
                        src={GambarMbahBabat[visibleIndexes[0]]}
                        alt="Gambar Besar Kiri"
                        className="absolute inset-0 object-cover w-full h-full rounded-2xl"
                        initial={{ scale: 1, x: "-100%", opacity: 0 }}
                        animate={{ scale: 1.1, x: 0, opacity: 1 }}
                        exit={{ scale: 1, x: "100%", opacity: 0 }}
                        transition={{
                            scale: { duration: 4, ease: "easeInOut" },
                            x: { duration: 0.8, ease: "easeInOut" },
                            opacity: { duration: 0.8, ease: "easeInOut" },
                        }}
                    />
                </AnimatePresence>
            </div>

            {/* Dua gambar kecil di kanan */}
            <div className="col-span-1 flex flex-col gap-6">
                {[visibleIndexes[1], visibleIndexes[2]].map((index, i) => (
                    <div key={i} className="relative h-[240px] rounded-2xl overflow-hidden shadow-xl">
                        <AnimatePresence mode="sync">
                            <motion.img
                                key={index}
                                src={GambarMbahBabat[index]}
                                alt={`Gambar Kecil Kanan ${i + 1}`}
                                className="absolute inset-0 object-cover w-full h-full rounded-2xl"
                                initial={{ scale: 1, y: "-100%", opacity: 0 }}
                                animate={{ scale: 1.1, y: 0, opacity: 1 }}
                                exit={{ scale: 1, y: "100%", opacity: 0 }}
                                transition={{
                                    scale: { duration: 4, ease: "easeInOut" },
                                    y: { duration: 0.8, ease: "easeInOut" },
                                    opacity: { duration: 0.8, ease: "easeInOut" },
                                }}
                            />
                        </AnimatePresence>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Masterplan: React.FC = () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 800);
        return () => clearTimeout(timer);
    }, []);
    if (loading) return <LoadingAnimation />;

    return (
        <div className="min-h-screen px-4 py-12 pt-20 bg-gradient-to-r from-emerald-700 to-cyan-500">
            {/* Breadcrumb dan Judul */}
            <motion.div className="py-6 text-center" initial={bounceVariant("top").initial} animate={bounceVariant("top").animate} transition={animationConfig}>
                <nav className="mb-2">
                    <ol className="flex items-center justify-center space-x-2 text-sm font-semibold text-white">
                        <li>
                            <Link to="/" className="flex items-center transition duration-300 hover:text-orange-500">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
                                </svg>
                                Landing Page
                            </Link>
                        </li>
                        <li className="font-semibold text-gray-400">/</li>
                        <li className="font-bold text-orange-300">Masterplan Desa Wisata</li>
                    </ol>
                </nav>

                <h1 className="mb-3 text-4xl font-extrabold text-white">Masterplan Desa Wisata Tegalsambi</h1>
                <span className="block w-24 h-1 mx-auto mt-2 bg-orange-500 rounded-full"></span>

                <motion.p className="px-2 mx-auto mt-2 text-base font-medium leading-relaxed text-white max-w-7xl" initial={bounceVariant("left").initial} animate={bounceVariant("left").animate} transition={animationConfig}>
                    Desa Tegalsambi dikembangkan sebagai desa wisata yang mencakup tiga kategori utama: wisata budaya, wisata religi, dan wisata pesisir. Masterplan ini menjadi panduan pembangunan kawasan wisata yang berkelanjutan dengan
                    mempertimbangkan potensi lokal, kenyamanan pengunjung, serta pelestarian lingkungan dan budaya.
                </motion.p>
            </motion.div>

            {/* Gambaran Masterplan */}
            <motion.div className="mx-auto max-w-7xl mt-4" initial={bounceVariant("bottom").initial} whileInView={bounceVariant("bottom").animate} viewport={{ once: true, amount: 0.2 }} transition={animationConfig}>
                {/* Judul Tengah */}
                <motion.h3 className="mb-6 text-2xl font-semibold text-center text-white" initial={bounceVariant("top").initial} whileInView={bounceVariant("top").animate} viewport={{ once: true, amount: 0.2 }} transition={animationConfig}>
                    Gambaran Masterplan Desa Wisata Tegalsambi
                </motion.h3>

                {/* Grid 2 Kolom */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Kolom Kiri - Teks */}
                    <div className="text-white text-justify leading-relaxed">
                        <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Poster Masterplan</h3>
                        <p>
                            Masterplan Desa Wisata Pesisir Tangguh Tegalsambi yang dirancang untuk mengembangkan potensi alam, budaya, dan ekonomi masyarakat melalui konsep
                            <span className="italic"> Sustainable Coastal Tourism</span>. Kawasan wisata ini dibagi menjadi tiga zona utama, yaitu
                            <strong> Zona Religi</strong>, <strong>Zona Pantai</strong>, dan <strong>Zona Seni Budaya</strong>, yang terintegrasi dengan infrastruktur ramah lingkungan, konservasi pesisir, dan digitalisasi.
                        </p>
                        <p className="mt-4">
                            Dalam poster ditampilkan berbagai fasilitas dan rencana pengembangan, mulai dari kawasan budaya, galeri seni, pujasera, cottage, pusat kuliner, landmark sepeda santai, hingga kawasan sejarah dan religi, lengkap
                            dengan makam-makam tokoh desa.
                        </p>
                        <p className="mt-4">Tujuan utama pengembangan ini adalah menciptakan desa wisata tangguh yang berdaya saing, berkelanjutan, serta tetap menjaga kelestarian lingkungan dan budaya lokal.</p>
                    </div>

                    {/* Kolom Kanan - Poster */}
                    <div className="rounded-xl overflow-hidden border border-gray-300 shadow-lg">
                        <img src={poster} alt="Poster Masterplan Tegalsambi" className="w-full h-full object-contain" />
                    </div>
                </div>
            </motion.div>

            <motion.div
                className="mx-auto max-w-7xl mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
                initial={bounceVariant("left").initial}
                whileInView={bounceVariant("left").animate}
                viewport={{ once: true, amount: 0.2 }}
                transition={animationConfig}
            >
                {/* Kolom Video */}
                <div>
                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-gray-300 shadow-lg">
                        <iframe title="Video Masterplan Tegalsambi" src="https://www.youtube.com/embed/oGE3Ydgwr1Y" className="w-full h-full" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                    </div>
                </div>

                {/* Kolom Teks */}
                <motion.div
                    className="flex flex-col justify-center text-white space-y-4"
                    initial={bounceVariant("right").initial}
                    whileInView={bounceVariant("right").animate}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={animationConfig}
                >
                    <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">Video Masterplan</h3>
                    <p className="text-lg leading-relaxed">
                        Visualisasi rencana pengembangan Desa Wisata Tegalsambi. Memadukan potensi alam, sejarah, budaya dan seni, Desa Wisata Tegalsambi diharapkan mampu menjadi desa wisata yang semakin maju dan terus berkembang.
                    </p>
                    <p className="text-lg leading-relaxed">Dengan Masterplan Desa Wisata, semoga dapat memacu pengembangan Desa Tegalsambi sehingga turut meningkatkan kesejahteraan masyarakat.</p>
                </motion.div>
            </motion.div>

            {/* Galeri Masterplan Wisata Pesisir*/}
            <motion.div className="mx-auto max-w-7xl mt-10" initial={bounceVariant("top").initial} whileInView={bounceVariant("top").animate} viewport={{ once: true, amount: 0.2 }} transition={animationConfig}>
                <h3 className="text-xl font-semibold text-center text-white">Masterplan Wisata Seni dan Budaya</h3>
                <SNBSection />
            </motion.div>

            <motion.div className="mx-auto max-w-7xl mt-10" initial={bounceVariant("top").initial} whileInView={bounceVariant("top").animate} viewport={{ once: true, amount: 0.2 }} transition={animationConfig}>
                <h3 className="text-xl font-semibold text-center text-white">Masterplan Wisata Pesisir</h3>
                <PantaiSection />
            </motion.div>

            {/* Galeri Masterplan Wisata Religi*/}
            <motion.div className="mx-auto max-w-7xl" initial={bounceVariant("top").initial} whileInView={bounceVariant("top").animate} viewport={{ once: true, amount: 0.2 }} transition={animationConfig}>
                <h3 className="text-xl font-semibold mt-12 text-center text-white">Masterplan Wisata Religi - Makam Mbah Surgimanis</h3>
                <MbahSurgiSection />
            </motion.div>

            <motion.div className="mx-auto max-w-7xl" initial={bounceVariant("top").initial} whileInView={bounceVariant("top").animate} viewport={{ once: true, amount: 0.2 }} transition={animationConfig}>
                <h3 className="text-xl font-semibold mt-12 text-center text-white">Masterplan Wisata Religi - Makam Mbah Tegal</h3>
                <TegalSection />
            </motion.div>

            <motion.div className="mx-auto max-w-7xl" initial={bounceVariant("top").initial} whileInView={bounceVariant("top").animate} viewport={{ once: true, amount: 0.2 }} transition={animationConfig}>
                <h3 className="text-xl font-semibold mt-12 text-center text-white">Masterplan Wisata Religi - Makam Mbah Babatan</h3>
                <BabatSection />
            </motion.div>

            {/* Download Dokumen */}
            <motion.div initial={bounceVariant("bottom").initial} whileInView={bounceVariant("bottom").animate} viewport={{ once: true, amount: 0.2 }} transition={animationConfig}>
                <motion.h3
                    className="mb-4 mt-16 text-xl font-semibold text-center text-white"
                    initial={bounceVariant("right").initial}
                    whileInView={bounceVariant("right").animate}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={animationConfig}
                >
                    Unduh Dokumen Masterplan & Kajian Desa Wisata Tegalsambi
                </motion.h3>

                <div className="max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-6 px-4 mx-auto mt-8">
                    <a
                        href="https://drive.google.com/uc?export=download&id=1XquM8FOhdLktGdaqiQVCWW-HX7hKVPcY"
                        download
                        className="px-4 py-2 text-sm font-medium text-center text-white transition duration-300 bg-white rounded-lg shadow bg-opacity-5 hover:bg-white hover:bg-opacity-30"
                    >
                        📘 Buku Masterplan
                    </a>
                    <a
                        href="https://drive.google.com/uc?export=download&id=15UxvF4syxbB_XllbGEdf00VuR3ENqnqH"
                        download
                        className="px-4 py-2 text-sm font-medium text-center text-white transition duration-300 bg-white rounded-lg shadow bg-opacity-5 hover:bg-white hover:bg-opacity-30"
                    >
                        📒 Buku Kajian Kesiapan Masyarakat
                    </a>
                    <a
                        href="https://drive.google.com/uc?export=download&id=1KMHRvZ7RLaE_IY5VXCLY691BrST9q2dx"
                        download
                        className="px-4 py-2 text-sm font-medium text-center text-white transition duration-300 bg-white rounded-lg shadow bg-opacity-5 hover:bg-white hover:bg-opacity-30"
                    >
                        📗 Buku Manajemen Pembangunan
                    </a>
                    <a
                        href="https://drive.google.com/uc?export=download&id=1_hBAuCU-ciVYYuB_PqBJ0OtyXRYNmYGM"
                        download
                        className="px-4 py-2 text-sm font-medium text-center text-white transition duration-300 bg-white rounded-lg shadow bg-opacity-5 hover:bg-white hover:bg-opacity-30"
                    >
                        📙 Buku Pengembangan Bisnis BUMDes
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default Masterplan;
