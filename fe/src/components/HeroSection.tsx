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
  <div className="relative h-[480px] bg-cover bg-center bg-fixed" style={{ backgroundImage: `url('${bgImage}')` }}>
    {/* Modern Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/10" />
    
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center px-4 mt-10 text-center text-white"
      initial={{ opacity: 0, y: 30 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="py-2 mb-2">
        <ol className="flex items-center justify-center space-x-2 text-sm md:text-base font-semibold text-white tracking-wide">
          <li>
            <Link to="/" className="flex items-center transition duration-300 hover:text-orange-400 opacity-80 hover:opacity-100">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 9.75L12 4l9 5.75V20a1 1 0 01-1 1h-5a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a1 1 0 01-1-1V9.75z" />
              </svg> Landing Page
            </Link>
          </li>
          <li className="font-semibold text-white/50">/</li>
          <li className="font-bold text-orange-400 drop-shadow-md">{breadcrumb}</li>
        </ol>
      </nav>
      <h1 className="mb-8 text-5xl font-extrabold md:text-7xl drop-shadow-2xl tracking-tight">{title}</h1>
      <motion.div 
        className="w-full max-w-lg" 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="relative group">
          <input 
            type="text" 
            placeholder={placeholder} 
            value={searchValue}
            onChange={onSearchChange}
            className="w-full py-4 pl-12 pr-12 text-gray-800 bg-white/90 backdrop-blur-md border border-white/40 rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-orange-400/50 transition-all duration-300 placeholder-gray-500 font-medium text-lg group-hover:bg-white"
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