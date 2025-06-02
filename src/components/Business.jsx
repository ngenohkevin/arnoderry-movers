import styles, { layout } from "../style.js";
import { features } from "../constants/index.js";

const FeatureCard = ({ icon, title, content, index }) => (
    <div className={`group relative overflow-hidden flex flex-row p-8 rounded-3xl ${index !== features.length - 1 ? "mb-8" : "mb-0"} 
        bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 
        hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10`}>
        
        {/* Animated Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon Container */}
        <div className={`relative z-10 w-20 h-20 rounded-2xl ${styles.flexCenter} 
            bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm
            group-hover:scale-110 transition-transform duration-500 border border-blue-500/30`}>
            <img src={icon} alt="icon" className="w-10 h-10 object-contain filter brightness-110"/>
            {/* Pulsing ring effect */}
            <div className="absolute inset-0 rounded-2xl border-2 border-blue-400/50 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>
        
        {/* Content */}
        <div className="flex-1 flex flex-col ml-6 relative z-10">
            <h4 className="font-poppins font-bold text-white text-xl leading-7 mb-3 
                group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r 
                group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-500">
                {title}
            </h4>
            <p className="font-poppins font-normal text-dimWhite text-base leading-7 
                group-hover:text-gray-200 transition-colors duration-500">
                {content}
            </p>
        </div>
        
        {/* Decorative corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
);

const Business = () => (
    <section id="journey" className={`${layout.section} relative overflow-hidden scroll-mt-32`}>
        {/* Background decorative elements */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
        
        <div className={`${layout.sectionInfo} relative z-10`}>
            <div className="mb-8">
                <h2 className={`${styles.heading2} mb-6`}>
                    <span className="text-white">Unwind, </span>
                    <br className="sm:block hidden"/> 
                    <span className="text-gradient">and Leave It to Us.</span>
                </h2>
                <p className={`${styles.paragraph} max-w-[500px] leading-relaxed text-gray-300`}>
                    Sit back and enjoy peace of mind while our capable team takes the reins. 
                    From proficient packing to secure transportation and punctual delivery, 
                    we've got it all covered. Entrust every aspect of your relocation journey to us with confidence.
                </p>
            </div>
            
            {/* Enhanced stats or highlights */}
            <div className="grid grid-cols-3 gap-6 mt-10 mb-8">
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/20">
                    <div className="text-2xl font-bold text-gradient mb-1">800+</div>
                    <div className="text-sm text-gray-400">Moves Completed</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20">
                    <div className="text-2xl font-bold text-gradient mb-1">24/7</div>
                    <div className="text-sm text-gray-400">Support</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/20">
                    <div className="text-2xl font-bold text-gradient mb-1">100%</div>
                    <div className="text-sm text-gray-400">Satisfaction</div>
                </div>
            </div>
        </div>
        
        <div className={`${layout.sectionImg} flex-col relative z-10`}>
            {features.map((feature, index) => (
                <FeatureCard key={feature.id} {...feature} index={index}/>
            ))}
        </div>
    </section>
);

export default Business;