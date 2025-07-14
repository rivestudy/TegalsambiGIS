import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutPage = () => {
    return (
        <div
            className="relative min-h-screen bg-cover bg-center px-4 py-20 flex items-center justify-center"
            style={{
                backgroundImage: "url('/pantaitegalsambi2.webp')",
            }}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <motion.div
                className="relative z-10 max-w-4xl bg-white/10 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-10 text-white text-center"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <ol className="flex justify-center items-center space-x-2 text-sm text-white/80">
                        <li>
                            <Link to="/" className="flex items-center hover:text-orange-400 transition duration-300">
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
                                </svg>
                                Landing Page
                            </Link>
                        </li>
                        <li className="text-orange-400 font-semibold">/</li>
                        <li className="text-orange-300 font-bold">Tentang Tegalsambi</li>
                    </ol>
                </nav>

                <h1 className="text-4xl font-extrabold mb-4">
                    Tentang <span className="text-yellow-300">Desa Tegalsambi</span>
                    <span className="block w-24 h-1 bg-orange-400 mx-auto mt-2 rounded-full" />
                </h1>

                <p className="text-white/90 text-lg leading-relaxed text-justify mt-6">
                    Selamat datang di <span className="font-semibold text-yellow-300">Desa Wisata Tegalsambi</span>, sebuah desa yang terletak di pesisir utara Jawa, Kabupaten Jepara. Ditetapkan sebagai desa wisata melalui SK Bupati No.
                    556/329 Tahun 2020, Tegalsambi menawarkan beragam keindahan dan pengalaman tak terlupakan.
                </p>

                <p className="text-white/80 text-md leading-relaxed text-justify mt-4">
                    Nikmati pesona <span className="text-orange-200 font-medium">Pantai Pasir Putih</span> dengan air laut yang jernih, hamparan sawah hijau yang menenangkan, serta beragam atraksi budaya seperti{" "}
                    <span className="text-orange-200 font-medium">Upacara Tradisional Perang Obor</span> yang kaya makna.
                </p>

                <p className="text-white/80 text-md leading-relaxed text-justify mt-4">
                    Masyarakat desa juga dikenal kreatif dalam seni ukir kayu, produksi meubel, hingga kerajinan dari limbah kayu. Anda dapat melihat prosesnya langsung dan membawa pulang{" "}
                    <span className="text-orange-200 font-medium">souvenir khas Tegalsambi</span>.
                </p>

                <p className="text-white/80 text-md leading-relaxed text-justify mt-4">
                    Tersedia pula beragam <span className="text-orange-200 font-medium">paket wisata</span> yang dirancang untuk memaksimalkan pengalaman Anda—mulai dari wisata alam, budaya, hingga edukatif.
                </p>

                <p className="text-white/70 text-sm italic mt-8">Jelajahi keindahan dan kekayaan budaya Tegalsambi. Kami tunggu kehadiran Anda!</p>
            </motion.div>
        </div>
    );
};

export default AboutPage;
