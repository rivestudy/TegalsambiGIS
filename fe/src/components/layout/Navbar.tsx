// Import statements remain the same...
import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
    const location = useLocation();
    const currentPath = location.pathname;

    const [showNavbar, setShowNavbar] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState({
        wisata: false,
        fasilitas: false,
    });

    const navbarRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleScroll = () => {
        const currentScrollY = window.scrollY;
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setShowNavbar(false);
        } else {
            setShowNavbar(true);
        }
        setLastScrollY(currentScrollY);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (
            menuRef.current &&
            !menuRef.current.contains(event.target as Node) &&
            navbarRef.current &&
            !navbarRef.current.contains(event.target as Node)
        ) {
            setIsMenuOpen(false);
            setIsDropdownOpen({ wisata: false, fasilitas: false });
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
    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsDropdownOpen({ wisata: false, fasilitas: false });
    };

    const toggleDropdown = (key: "wisata" | "fasilitas") => {
        setIsDropdownOpen(prev => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

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
                            <img src="/logoWeb.png" alt="Logo Tegalsambi" className="w-auto h-14" />
                            <span className="hidden sm:inline">Tegalsambi</span>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="items-center hidden space-x-6 text-sm font-medium md:flex sm:text-base">
                            <Link to="/about" className={navItemClass("/about")}>
                                Tentang
                                <span className={underlineClass("/about")}></span>
                            </Link>

                            {/* Wisata Dropdown */}
                            <div className="relative group">
                                <Link to="/attractions"
                                    onClick={() => toggleDropdown("wisata")}
                                    className={`${navItemClass("/attractions")} flex items-center gap-1`}
                                >
                                    Wisata 
                                    <span className={underlineClass("/attractions")}></span>
                                </Link>
                                <div className="absolute left-0 z-10 hidden pt-2 group-hover:block">
                                    <div className="w-48 px-4 py-2 bg-black rounded-md shadow-lg">
                                        {[
                                            { label: "Paket Wisata", href: "/attractions#paket" },
                                            { label: "Religi & Sejarah", href: "/attractions#religi" },
                                            { label: "Budaya & Workshop", href: "/attractions#budaya" },
                                            { label: "Pesisir", href: "/attractions#pesisir" },
                                            { label: "UMKM", href: "/attractions#umkm" }
                                        ].map((item) => (
                                            <Link
                                                key={item.href}
                                                to={item.href}
                                                className="block px-2 py-1 text-sm text-white transition hover:text-blue-400"
                                                onClick={closeMenu}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Fasilitas Dropdown */}
                            <div className="relative group">
                                <Link to="/facilities"
                                    onClick={() => toggleDropdown("fasilitas")}
                                    className={`${navItemClass("/facilities")} flex items-center gap-1`}
                                >
                                    Fasilitas 
                                    <span className={underlineClass("/facilities")}></span>
                                </Link>
                                <div className="absolute left-0 z-10 hidden pt-2 group-hover:block">
                                    <div className="w-48 px-4 py-2 bg-black rounded-md shadow-lg">
                                        {[
                                            { label: "Fasilitas Umum", href: "/facilities#fasilitas" },
                                            { label: "Penginapan", href: "/facilities#penginapan" }
                                        ].map((item) => (
                                            <Link
                                                key={item.href}
                                                to={item.href}
                                                className="block px-2 py-1 text-sm text-white transition hover:text-blue-400"
                                                onClick={closeMenu}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <Link to="/peta-desa" className={navItemClass("/peta-desa")}>
                                WebGIS
                                <span className={underlineClass("/peta-desa")}></span>
                            </Link>

                            <Link to="/masterplan-tegalsambi" className={navItemClass("/masterplan-tegalsambi")}>
                                Masterplan
                                <span className={underlineClass("/masterplan-tegalsambi")}></span>
                            </Link>

                            <a
                                href="https://tegalsambi.jepara.go.id/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className={navItemClass("/infoDesa")}
                            >
                                Info Desa
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
                                {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Dropdown */}
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
                                        opacity: { duration: 0.2, delay: 0.1 },
                                    },
                                }}
                                exit={{
                                    height: 0,
                                    opacity: 0,
                                    transition: {
                                        height: { duration: 0.3, ease: "easeInOut" },
                                        opacity: { duration: 0.2 },
                                    },
                                }}
                                className="overflow-hidden md:hidden bg-black/80 backdrop-blur-md"
                            >
                                <div className="px-4 pt-2 pb-4 space-y-3">
                                    <Link to="/about" className="block py-2" onClick={closeMenu}>
                                        Tentang
                                    </Link>

                                    <details className="text-white group" open={isDropdownOpen.wisata}>
                                        <summary
                                            className="flex items-center justify-between py-2 cursor-pointer"
                                            onClick={() => toggleDropdown("wisata")}
                                        >
                                            <span>Wisata</span>
                                            <FaChevronDown size={12} className="transition-transform group-open:rotate-180" />
                                        </summary>
                                        <div className="grid grid-cols-1 pl-4 space-y-1">
                                            <Link to="/attractions#paket" onClick={closeMenu}>Paket Wisata</Link> 
                                            <Link to="/attractions#religi" onClick={closeMenu}>Religi & Sejarah</Link>
                                            <Link to="/attractions#budaya" onClick={closeMenu}>Budaya & Workshop</Link>
                                            <Link to="/attractions#pesisir" onClick={closeMenu}>Pesisir</Link>
                                            <Link to="/attractions#umkm" onClick={closeMenu}>UMKM</Link>
                                        </div>
                                    </details>

                                    <details className="text-white group" open={isDropdownOpen.fasilitas}>
                                        <summary
                                            className="flex items-center justify-between py-2 cursor-pointer"
                                            onClick={() => toggleDropdown("fasilitas")}
                                        >
                                            <span>Fasilitas</span>
                                            <FaChevronDown size={12} className="transition-transform group-open:rotate-180" />
                                        </summary>
                                        <div className="grid grid-cols-1 pl-4 space-y-1">
                                            <Link to="/facilities#fasilitas" onClick={closeMenu}>Fasilitas Umum</Link>
                                            <Link to="/facilities#penginapan" onClick={closeMenu}>Penginapan</Link>
                                        </div>
                                    </details>

                                    <Link to="/peta-desa" className="block py-2" onClick={closeMenu}>
                                        WebGIS
                                    </Link>
                                    <Link to="/masterplan-tegalsambi" className="block py-2" onClick={closeMenu}>
                                        Masterplan
                                    </Link>
                                    <a
                                        href="https://tegalsambi.jepara.go.id/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block py-2"
                                        onClick={closeMenu}
                                    >
                                        Info Desa
                                    </a>
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
