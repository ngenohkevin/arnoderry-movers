import { arn_logo, close, menu } from '../assets';
import { navLinks } from '../constants';
import { useState, useEffect } from "react";

const Navbar = () => {
    const [toggle, setToggle] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };

        // Better section detection using Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: '-140px 0px -60% 0px', // Account for navbar height and better detection
            threshold: [0.1, 0.25, 0.5]
        };

        const observerCallback = (entries) => {
            // Find the section with the highest intersection ratio
            let mostVisibleSection = null;
            let highestRatio = 0;

            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
                    highestRatio = entry.intersectionRatio;
                    mostVisibleSection = entry.target.id;
                }
            });

            if (mostVisibleSection) {
                setActiveSection(mostVisibleSection);
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        // Observe all sections
        navLinks.forEach(link => {
            const element = document.getElementById(link.id);
            if (element) {
                observer.observe(element);
            }
        });

        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            observer.disconnect();
        };
    }, []);

    const handleNavClick = (navId) => {
        setToggle(false);
        setActiveSection(navId);
    };

    return (
        <nav className={`fixed top-0 w-full flex py-4 px-6 justify-between items-center z-50 transition-all duration-500 ${
            scrolled 
                ? 'bg-black/90 backdrop-blur-md border-b border-gray-800/50 shadow-2xl' 
                : 'bg-transparent'
        }`}>
            {/* Enhanced Logo - Larger and Subtle */}
            <div className="group cursor-pointer">
                <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-800/30 backdrop-blur-sm 
                    border border-gray-700/30 flex items-center justify-center group-hover:scale-105 group-hover:bg-gray-800/50 
                    transition-all duration-300">
                    <img 
                        src={arn_logo} 
                        alt="arnoderry"
                        className="w-24 h-24 object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    />
                </div>
            </div>

            {/* Desktop Navigation */}
            <ul className="list-none sm:flex hidden justify-end items-center flex-1 space-x-8">
                {navLinks.map((nav) => (
                    <li key={nav.id} className="relative group">
                        <a
                            href={`#${nav.id}`}
                            onClick={() => handleNavClick(nav.id)}
                            className={`font-poppins font-medium cursor-pointer text-[16px] transition-all duration-300 relative
                                ${activeSection === nav.id 
                                    ? 'text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text' 
                                    : 'text-white hover:text-blue-300'
                                }`}
                        >
                            {nav.title}
                            
                            {/* Active indicator */}
                            <div className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 
                                transform origin-left transition-all duration-300 ${
                                activeSection === nav.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                            }`} />
                        </a>
                    </li>
                ))}
            </ul>

            {/* Mobile Menu */}
            <div className="sm:hidden flex flex-1 justify-end items-center">
                <button
                    onClick={() => setToggle((prev) => !prev)}
                    className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 
                        backdrop-blur-sm border border-gray-700/50 flex items-center justify-center
                        hover:scale-110 hover:border-blue-500/50 transition-all duration-300"
                >
                    <img
                        src={toggle ? close : menu}
                        alt="menu"
                        className="w-[24px] h-[24px] object-contain"
                    />
                </button>

                {/* Mobile Menu Dropdown */}
                <div className={`absolute top-20 right-4 transform transition-all duration-500 origin-top-right ${
                    toggle 
                        ? 'scale-100 opacity-100 translate-y-0' 
                        : 'scale-95 opacity-0 -translate-y-4 pointer-events-none'
                }`}>
                    <div className="p-6 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-xl 
                        border border-gray-700/50 rounded-3xl shadow-2xl min-w-[200px]">
                        <ul className="list-none flex flex-col space-y-4">
                            {navLinks.map((nav, index) => (
                                <li key={nav.id} className="group">
                                    <a
                                        href={`#${nav.id}`}
                                        onClick={() => handleNavClick(nav.id)}
                                        className={`font-poppins font-medium cursor-pointer text-[16px] 
                                            transition-all duration-300 flex items-center justify-between p-3 rounded-2xl
                                            ${activeSection === nav.id 
                                                ? 'text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text bg-blue-500/10' 
                                                : 'text-white hover:text-blue-300 hover:bg-blue-500/10'
                                            }`}
                                    >
                                        <span>{nav.title}</span>
                                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 
                                            transition-all duration-300 ${
                                            activeSection === nav.id ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
                                        }`} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                        
                        {/* Mobile menu footer */}
                        <div className="mt-6 pt-4 border-t border-gray-700/50">
                            <p className="text-xs text-gray-400 text-center">
                                Professional Moving Services
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background overlay for mobile menu */}
            {toggle && (
                <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm sm:hidden z-[-1]"
                    onClick={() => setToggle(false)}
                />
            )}
        </nav>
    );
};

export default Navbar;