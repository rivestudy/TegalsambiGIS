import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const wisataReligi = [
    {
        id: 1,
        title: "Makam A",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 100.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 2,
        title: "Makam B",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 120.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 3,
        title: "Petilasan A",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 120.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 4,
        title: "Petilasan B",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 220.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
];

const wisataBudaya = [
    {
        id: 1,
        title: "Budaya A",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 100.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 2,
        title: "Budaya B",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 120.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 3,
        title: "Budaya C",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 120.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 4,
        title: "Budaya D",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 220.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
];

const wisataPesisir = [
    {
        id: 1,
        title: "Pantai A",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 100.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 2,
        title: "Pantai B",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 120.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 3,
        title: "Pantai C",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 120.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
    {
        id: 4,
        title: "Pantai D",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut.",
        price: "Rp 220.000,00 /pax",
        image: "/pantaitegalsambi.jpeg",
    },
];

const AttractionPage = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative h-[480px] bg-cover bg-center" style={{ backgroundImage: "url('/gambar_pantai.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>

                <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-lg">Wisata Tegalsambi</h1>

                    <motion.div className="w-full max-w-md" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
                        <div className="relative">
                            <input type="text" placeholder="Cari sesuatu" className="w-full py-2 pl-10 pr-4 shadow-lg rounded-full border border-gray-300 text-gray-500" />
                            <span className="absolute left-3 top-2.5 text-gray-400">
                                <svg className="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0Z" />
                                </svg>
                            </span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>

            {/* Main Konten */}
            {/* ------- WISATA RELIGI -------*/}
            <motion.div className="max-w-screen-xl mx-auto px-4 pt-16 pb-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                    Wisata Religi & Sejarah
                </h2>
                <p className="text-gray-600 mb-6 max-width">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
                {/* Swiper Grid Card */}
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {wisataReligi.map((religi) => (
                        <SwiperSlide key={religi.id}>
                            <Link to={`/wisata/${religi.id}`}>
                                <div className="bg-blue-100 mt-4 mb-4 shadow-md rounded-2xl overflow-hidden flex flex-col h-[350px] transition transform duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer">
                                    <img src={religi.image} className="w-full h-48 object-cover" alt={religi.title} />
                                    <div className="p-5 flex flex-col flex-grow justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">{religi.title}</h3>
                                            <p className="text-sm text-gray-600 line-clamp-3">{religi.description}</p>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm font-medium text-blue-600">{religi.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>

            {/* ------- WISATA BUDAYA -------*/}
            <motion.div className="max-w-screen-xl mx-auto px-4 pt-8 pb-8" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">
                    Wisata Budaya & Workshop
                </h2>
                <p className="text-gray-600 mb-6 max-width">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
                {/* Swiper Grid Card */}
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {wisataBudaya.map((budaya) => (
                        <SwiperSlide key={budaya.id}>
                            <Link to={`/wisata/${budaya.id}`}>
                                <div className="bg-blue-100 mt-4 mb-4 shadow-md rounded-2xl overflow-hidden flex flex-col h-[350px] transition transform duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer">
                                    <img src={budaya.image} className="w-full h-48 object-cover" alt={budaya.title} />
                                    <div className="p-5 flex flex-col flex-grow justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">{budaya.title}</h3>
                                            <p className="text-sm text-gray-600 line-clamp-3">{budaya.description}</p>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm font-medium text-blue-600">{budaya.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Load More Button */}
                {/* <div className="flex justify-center">
                    <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        Load More
                    </button>
                </div> */}
            </motion.div>

            {/* ------- WISATA PESISIR -------*/}
            <motion.div className="max-w-screen-xl mx-auto px-4 pt-8 pb-16" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }}>
                <h2 className="text-2xl font-bold text-gray-800 mb-2 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">Wisata Pesisir</h2>
                <p className="text-gray-600 mb-6 max-width">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat.
                </p>
                {/* Swiper Grid Card */}
                <Swiper
                    spaceBetween={20}
                    slidesPerView={1}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                >
                    {wisataPesisir.map((pesisir) => (
                        <SwiperSlide key={pesisir.id}>
                            <Link to={`/wisata/${pesisir.id}`}>
                                <div className="bg-blue-100 mt-4 mb-4 shadow-md rounded-2xl overflow-hidden flex flex-col h-[350px] transition transform duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer">
                                    <img src={pesisir.image} className="w-full h-48 object-cover" alt={pesisir.title} />
                                    <div className="p-5 flex flex-col flex-grow justify-between">
                                        <div>
                                            <h3 className="text-lg font-bold mb-1">{pesisir.title}</h3>
                                            <p className="text-sm text-gray-600 line-clamp-3">{pesisir.description}</p>
                                        </div>
                                        <div className="mt-2">
                                            <p className="text-sm font-medium text-blue-600">{pesisir.price}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
                {/* Load More Button */}
                {/* <div className="flex justify-center">
                    <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                        Load More
                    </button>
                </div> */}
            </motion.div>
        </div>
    );
};

export default AttractionPage;
