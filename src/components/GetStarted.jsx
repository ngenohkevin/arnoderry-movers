import { useState } from 'react';
import { Link } from 'react-scroll';
import styles from "../style.js";
import { arrowUp } from "../assets/index.js";

const GetStarted = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <Link to="free-quote" smooth={true} duration={500} offset={-100}>
            <div 
                className={`group relative ${styles.flexCenter} w-[140px] h-[140px] rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-[3px] cursor-pointer hover:scale-110 transition-all duration-500 shadow-2xl hover:shadow-blue-500/25`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Animated ring */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-pulse group-hover:border-blue-300 transition-colors duration-300" />
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className={`${styles.flexCenter} flex-col bg-primary w-[100%] h-[100%] rounded-full relative overflow-hidden group-hover:bg-gray-900/90 transition-all duration-300`}>
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                    
                    <div className={`${styles.flexStart} flex-row relative z-10`}>
                        <p className="font-poppins font-semibold text-[14px] leading-[18px] mr-2">
                            <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Get a</span>
                        </p>
                        <img 
                            src={arrowUp} 
                            alt="arrow" 
                            className={`w-[18px] h-[18px] object-contain transition-transform duration-300 ${isHovered ? 'rotate-45 scale-110' : ''}`} 
                        />
                    </div>
                    <p className="font-poppins font-semibold text-[14px] leading-[18px] relative z-10">
                        <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Free Quote</span>
                    </p>
                    
                    {/* Floating particles effect */}
                    <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping" />
                    <div className="absolute bottom-1/4 right-1/4 w-1 h-1 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 animate-ping" style={{animationDelay: '0.5s'}} />
                    
                    {/* Pulsing effect for better visibility */}
                    <div className="absolute inset-2 rounded-full border border-blue-400/30 animate-pulse opacity-50" />
                </div>
            </div>
        </Link>
    );
};

export default GetStarted;