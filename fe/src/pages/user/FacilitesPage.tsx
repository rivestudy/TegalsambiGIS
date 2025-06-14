import React from "react";

const FacilitiesPage = () => {
    const kulinerList = [
        {
            id: 1,
            title: "Sate Ayam Khas Tegalsambi",
            description: "Sate ayam dengan bumbu kacang khas desa Tegalsambi, cita rasa otentik.",
            image: "/kuliner_sate.jpg",
        },
        {
            id: 2,
            title: "Es Dawet Tradisional",
            description: "Minuman segar dari campuran santan, gula merah, dan dawet kenyal.",
            image: "/kuliner_dawet.jpg",
        },
        {
            id: 3,
            title: "Ikan Bakar Pantai",
            description: "Ikan segar hasil tangkapan nelayan lokal, dibakar dengan bumbu rempah.",
            image: "/kuliner_ikanbakar.jpg",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-10 px-4 pt-24">
            <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Kuliner Desa Tegalsambi</h1>

            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {kulinerList.map((item) => (
                    <div key={item.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                        <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
                            <p className="text-gray-600">{item.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FacilitiesPage;
