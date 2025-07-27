// components/HeroSection.tsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiX } from "react-icons/fi";

interface HeroSectionProps {
  title: string;
  breadcrumb: string;
  bgImage: string;
  placeholder: string;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch?: () => void;
}

const HeroSection = ({
  title,
  breadcrumb,
  bgImage,
  placeholder,
  searchValue = "",
  onSearchChange,
  onClearSearch,
}: HeroSectionProps) => (
  <div className="relative h-[480px] bg-cover bg-center" style={{ backgroundImage: `url('${bgImage}')` }}>
    <div className="absolute inset-0 bg-black bg-opacity-30" />
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center text-white"
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1 }}
    >
      <nav className="py-2">
        <ol className="flex items-center justify-center space-x-2 text-sm text-lg font-semibold text-white">
          <li>
            <Link to="/" className="flex items-center transition duration-300 hover:text-orange-400">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
              </svg> Landing Page
            </Link>
          </li>
          <li className="font-semibold text-gray-400">/</li>
          <li className="font-bold text-orange-300">{breadcrumb}</li>
        </ol>
      </nav>
      <h1 className="mb-6 text-4xl font-bold md:text-6xl drop-shadow-lg">{title}</h1>
      <motion.div 
        className="w-full max-w-md" 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <div className="relative">
          <input 
            type="text" 
            placeholder={placeholder} 
            value={searchValue}
            onChange={onSearchChange}
            className="w-full py-3 pl-10 pr-10 text-gray-800 border border-gray-300 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute left-3 top-3.5 text-gray-400">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-3.5-3.5M17 10a7 7 0 11-14 0 7 7 0 0114 0Z" />
            </svg>
          </span>
          {searchValue && onClearSearch && (
            <button
              onClick={onClearSearch}
              className="absolute text-gray-500 transition-colors right-3 top-3 hover:text-gray-700"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  </div>
);

export default HeroSection;