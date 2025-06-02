import styles, { layout } from "../style.js";
import { services } from "../assets/index.js";
import { service } from "../constants/index.js";

const ServiceCard = ({ icon, title, content, index }) => (
    <div className={`group relative overflow-hidden flex flex-row p-8 rounded-3xl ${index !== service.length - 1 ? "mb-8" : "mb-0"} 
        bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm border border-gray-700/50 
        hover:border-green-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10`}>
        
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 to-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Enhanced Icon Container */}
        <div className={`relative z-10 w-20 h-20 rounded-2xl ${styles.flexCenter} 
            bg-gradient-to-br from-green-500/20 to-blue-500/20 backdrop-blur-sm
            group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-green-500/30`}>
            <img src={icon} alt="icon" className="w-10 h-10 object-contain filter brightness-110"/>
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Enhanced Content */}
        <div className="flex-1 flex flex-col ml-6 relative z-10">
            <h4 className="font-poppins font-bold text-white text-xl leading-7 mb-3 
                group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r 
                group-hover:from-green-400 group-hover:to-blue-400 transition-all duration-500">
                {title}
            </h4>
            <p className="font-poppins font-normal text-dimWhite text-base leading-7 
                group-hover:text-gray-200 transition-colors duration-500">
                {content}
            </p>
        </div>
        
        {/* Service number indicator */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 
            flex items-center justify-center text-xs font-bold text-green-400 border border-green-500/30
            group-hover:scale-110 transition-transform duration-500">
            {index + 1}
        </div>
    </div>
);

const Services = () => (
    <section id="services" className={`${layout.sectionReverse} relative overflow-hidden scroll-mt-32`}>
        {/* Background decorative elements */}
        <div className="absolute -top-32 -right-32 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
        
        <div className={`${layout.sectionImgReverse} relative z-10`}>
            {/* Enhanced image container */}
            <div className="relative group">
                <img alt="services"
                     src={services}
                     className="w-full h-full relative z-[5] rounded-3xl shadow-2xl transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Modern gradient overlays */}
                <div className="absolute z-[3] -left-1/2 top-0 w-[60%] h-[60%] rounded-full bg-gradient-to-br from-white/20 to-transparent blur-3xl"/>
                <div className="absolute z-[0] w-[60%] h-[60%] -left-1/2 bottom-0 rounded-full bg-gradient-to-tr from-pink-500/20 to-purple-500/20 blur-3xl"/>
                
                {/* Floating elements */}
                <div className="absolute z-[4] top-1/4 -right-4 w-16 h-16 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-2xl backdrop-blur-sm border border-green-400/50 rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-500" />
                <div className="absolute z-[4] bottom-1/4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-xl backdrop-blur-sm border border-purple-400/50 -rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-700" />
            </div>
        </div>
        
        <div className={`${layout.sectionInfo} relative z-10`}>
            <div className="mb-8">
                <h2 className={`${styles.heading2} ml-3 mb-6`}>
                    <span className="text-gradient">The Services</span>
                    <br className="sm:block hidden"/>
                    <span className="text-white">We Offer.</span>
                </h2>
                
                {/* Service overview stats */}
                <div className="flex flex-wrap gap-4 ml-3 mb-8">
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30">
                        <span className="text-green-400 font-semibold text-sm">Professional Moving</span>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
                        <span className="text-blue-400 font-semibold text-sm">Cleaning Services</span>
                    </div>
                    <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30">
                        <span className="text-purple-400 font-semibold text-sm">Full Setup</span>
                    </div>
                </div>
            </div>
            
            <div className={`${layout.sectionImg} flex-col`}>
                {service.map((serviceItem, index) => (
                    <ServiceCard key={serviceItem.id} {...serviceItem} index={index}/>
                ))}
            </div>
        </div>
    </section>
);

export default Services;