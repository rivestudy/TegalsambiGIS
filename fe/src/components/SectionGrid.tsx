// components/SectionGrid.tsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface GridItem {
    id: number;
    name: string;
    description: string;
    images: string[];
    price?: number;
}

interface SectionGridProps {
    title: string;
    description: string;
    data: GridItem[];
    itemUrlPrefix: string;
    cardColor: string;
    priceColor?: string;
    formatPrice?: (price?: number) => string;
}

const fallbackImage = "https://placehold.co/800x600/e2e8f0/4a5568?text=Gambar+Tidak+Tersedia";

const SectionGrid = ({ title, description, data, itemUrlPrefix, cardColor, priceColor = "", formatPrice }: SectionGridProps) => {
    return (
        <motion.div className="max-w-screen-xl px-4 pt-10 pb-10 mx-auto" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }}>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 inline-block pb-2 border-b-4 border-transparent bg-gradient-to-r from-orange-300 to-orange-600 bg-[length:40%_3px] bg-no-repeat bg-left-bottom">{title}</h2>
            <p className="max-w-3xl mb-6 text-gray-600">{description}</p>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data.map((item) => (
                    <Link to={`/${itemUrlPrefix}/${item.id}`} key={item.id}>
                        <div className={`${cardColor} shadow-md rounded-2xl overflow-hidden flex flex-col h-[380px] transition transform duration-300 hover:shadow-lg hover:-translate-y-2 cursor-pointer`}>
                            <img src={item.images?.[0] || fallbackImage} className="object-cover w-full h-48" alt={item.name} />
                            <div className="flex flex-col justify-between flex-grow p-5">
                                <div>
                                    <h3 className="mb-1 text-lg font-bold">{item.name}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-3">{item.description}</p>
                                </div>
                                {formatPrice && (
                                    <div className="mt-2">
                                        <p className={`text-sm font-medium ${priceColor}`}>{formatPrice(item.price)}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </motion.div>
    );
};

export default SectionGrid;
