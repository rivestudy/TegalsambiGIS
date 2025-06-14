import React from "react";

const attractions = [
    {
        id: 1,
        title: "Pantai Tegalsambi",
        description: "Nikmati keindahan pantai dengan pasir putih dan air laut yang jernih.",
        image: "/images/pantai.jpg",
    },
    {
        id: 2,
        title: "Festival Budaya",
        description: "Saksikan kekayaan budaya lokal dalam festival tahunan desa.",
        image: "/images/festival.jpg",
    },
    {
        id: 3,
        title: "Hutan Mangrove",
        description: "Eksplorasi hutan mangrove yang indah dan alami.",
        image: "/images/mangrove.jpg",
    },
];

const AttractionPage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 py-10 px-4 pt-24">
            <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">Wisata Desa Tegalsambi</h1>

            <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {attractions.map((attraction) => (
                    <div key={attraction.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300">
                        <img src={attraction.image} alt={attraction.title} className="w-full h-48 object-cover" />
                        <div className="p-6">
                            <h2 className="text-xl font-semibold mb-2">{attraction.title}</h2>
                            <p className="text-gray-600">{attraction.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AttractionPage;
