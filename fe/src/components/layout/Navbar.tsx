import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navbarRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    // Handle scroll behavior
    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
        setLastScrollY(currentScrollY);
    };

    // Handle click outside to close menu
    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current && 
            !menuRef.current.contains(event.target as Node) &&
            navbarRef.current &&
            !navbarRef.current.contains(event.target as Node)
        ) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        document.addEventListener("mousedown", handleClickOutside);
        
        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [lastScrollY]);

    const navItemClass = (path: string) => {
        const isFacilityGroup = path === "/facilities" &&
            (currentPath.startsWith("/facilities") || currentPath.startsWith("/facility/") || currentPath.startsWith("/accommodation/"));

        const isActive = path === "/facilities" ? isFacilityGroup : currentPath.startsWith(path);

        return `relative font-semibold group ${isActive ? "text-blue-200" : "text-white"}`;
    };

    const underlineClass = (path: string) => {
        const isFacilityGroup = path === "/facilities" &&
            (currentPath.startsWith("/facilities") || currentPath.startsWith("/facility/") || currentPath.startsWith("/accommodation/"));

        const isActive = path === "/facilities" ? isFacilityGroup : currentPath.startsWith(path);

        return `absolute left-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400 transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`;
    };

    const toggleMenu = () => setIsMenuOpen(prev => !prev);
    const closeMenu = () => setIsMenuOpen(false);

    return (
        <AnimatePresence>
            {showNavbar && (
                <motion.nav
                    ref={navbarRef}
                    className="fixed top-0 left-0 right-0 z-50 pt-10 -mt-10 text-white shadow-lg bg-black/30 backdrop-blur-md"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ 
                        type: "spring",
                        damping: 20,
                        stiffness: 300
                    }}
                >
                    <div className="flex items-center justify-between max-w-screen-xl px-4 py-3 mx-auto">
                        {/* Logo */}
                        <Link 
                            to="/" 
                            className="flex items-center space-x-2 text-xl font-bold transition hover:opacity-80" 
                            onClick={closeMenu}
                        >
                            <img 
                                src="/logoWeb.png" 
                                alt="Logo Tegalsambi" 
                                className="w-auto h-14" 
                            />
                            <span className="hidden sm:inline">Tegalsambi</span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="items-center hidden space-x-6 text-sm font-medium md:flex sm:text-base">
                            {[
                                { path: "/about", label: "Tentang" },
                                { path: "/attraction", label: "Wisata" },
                                { path: "/facilities", label: "Fasilitas" },
                                { path: "/peta-desa", label: "WebGIS" },
                                { path: "/masterplan-tegalsambi", label: "Masterplan" }
                            ].map((item) => (
                                <Link 
                                    key={item.path}
                                    to={item.path === "/attraction" ? "/attractions" : item.path}
                                    className={navItemClass(item.path)}
                                >
                                    <span>{item.label}</span>
                                    <span className={underlineClass(item.path)}></span>
                                </Link>
                            ))}
                            <a 
                                href="https://tegalsambi.jepara.go.id/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={navItemClass("/infoDesa")}
                            >
                                <span>Info Desa</span>
                                <span className={underlineClass("/infoDesa")}></span>
                            </a>
                        </div>

                        {/* Mobile Hamburger */}
                        <div className="md:hidden">
                            <button 
                                onClick={toggleMenu} 
                                className="p-1 text-white transition-transform duration-200 rounded-md focus:outline-none hover:bg-white/10 active:scale-95"
                                aria-label="Toggle menu"
                            >
                                {isMenuOpen ? (
                                    <FiX size={24} className="transition-opacity duration-200" />
                                ) : (
                                    <FiMenu size={24} className="transition-opacity duration-200" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Dropdown Menu */}
                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                ref={menuRef}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ 
                                    height: "auto", 
                                    opacity: 1,
                                    transition: {
                                        height: { duration: 0.3, ease: "easeInOut" },
                                        opacity: { duration: 0.2, delay: 0.1 }
                                    }
                                }}
                                exit={{ 
                                    height: 0, 
                                    opacity: 0,
                                    transition: {
                                        height: { duration: 0.3, ease: "easeInOut" },
                                        opacity: { duration: 0.2 }
                                    }
                                }}
                                className="overflow-hidden md:hidden bg-black/80 backdrop-blur-md"
                            >
                                <div className="px-4 pt-2 pb-4 space-y-3">
                                    {[
                                        { path: "/about", label: "Tentang" },
                                        { path: "/attraction", label: "Wisata" },
                                        { path: "/facilities", label: "Fasilitas" },
                                        { path: "/peta-desa", label: "WebGIS" },
                                        { path: "/masterplan-tegalsambi", label: "Masterplan" },
                                        { path: "/infoDesa", label: "Info Desa", external: true }
                                    ].map((item) => (
                                        item.external ? (
                                            <a
                                                key={item.path}
                                                href="https://tegalsambi.jepara.go.id/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`block py-2 ${navItemClass(item.path)}`}
                                                onClick={closeMenu}
                                            >
                                                {item.label}
                                            </a>
                                        ) : (
                                            <Link
                                                key={item.path}
                                                to={item.path === "/attraction" ? "/attractions" : item.path}
                                                className={`block py-2 ${navItemClass(item.path)}`}
                                                onClick={closeMenu}
                                            >
                                                {item.label}
                                            </Link>
                                        )
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
            )}
        </AnimatePresence>
    );
};

export default Navbar;