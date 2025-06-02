import styles from "../style.js";
import { discount, relocation } from "../assets/index.js";
import GetStarted from "./GetStarted.jsx";

const Hero = () => (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY} relative overflow-hidden scroll-mt-32`}>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-1/2 -right-40 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
            <div className="absolute -bottom-40 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
        </div>

        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 relative z-10`}>
            {/* Enhanced discount banner */}
            <div className="group flex flex-row items-center py-3 px-6 bg-gradient-to-r from-discount-gradient to-blue-600/20 
                rounded-2xl mb-6 border border-blue-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 cursor-pointer">
                <div className="relative">
                    <img
                        src={discount}
                        alt="discount"
                        className="w-8 h-8 group-hover:rotate-12 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-blue-400/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <p className={`${styles.paragraph} ml-4 font-medium`}>
                    <span className="text-gradient font-semibold">Professional</span> Movers and{" "}
                    <span className="text-gradient font-semibold">Cleaning</span> Services
                </p>
            </div>

            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-bold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
                    <span className="text-white">Arnoderry</span> <br className="sm:block hidden "/> 
                    <span className='text-gradient animate-pulse'>Movers</span>
                </h1>
                <div className="ss:flex hidden md:mr-4 mr-0">
                    <GetStarted/>
                </div>
            </div>

            {/* Enhanced tagline */}
            <h1 className="font-poppins font-bold ss:text-[68px] text-[52px] ss:leading-[100px] leading-[75px] w-full mb-6">
                <span className="text-gradient bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Moving Your World
                </span>
                <span className="text-white">...</span>
            </h1>

            {/* Enhanced description */}
            <div className="relative">
                <p className={`${styles.paragraph} max-w-[500px] leading-relaxed text-gray-300 mb-8`}>
                    We provide seamless and stress-free relocation services at an affordable rate.
                    We specialize in helping individuals and businesses move their offices and homes,
                    with a dedicated team of professionals.
                </p>
                
                {/* Feature highlights */}
                <div className="grid grid-cols-2 gap-4 max-w-[500px] mt-6">
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-transparent border border-blue-500/20">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-300 font-medium">24/7 Support</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-transparent border border-green-500/20">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-300 font-medium">Insured Moves</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-transparent border border-purple-500/20">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-300 font-medium">Free Quotes</span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 rounded-xl bg-gradient-to-r from-pink-500/10 to-transparent border border-pink-500/20">
                        <div className="w-2 h-2 bg-pink-400 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-300 font-medium">Expert Team</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Enhanced image section */}
        <div className={`flex-1 flex ${styles.flexCenter} md:my-0 my-10 relative group`}>
            <div className="relative">
                <img src={relocation}
                     alt="people relocating"
                     className="w-full h-full relative z-[5] group-hover:scale-105 transition-transform duration-700 rounded-3xl shadow-2xl"
                />
                
                {/* Enhanced gradient overlays with animations */}
                <div className="absolute z-[0] w-[40%] h-[35%] top-0 bg-gradient-to-br from-pink-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"/>
                <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 bg-gradient-to-tr from-white/10 to-blue-500/20 blur-3xl animate-pulse" style={{animationDelay: '1s'}}/>
                <div className="absolute z-[0] w-[50%] h-[50%] right-20 bottom-20 bg-gradient-to-tl from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}/>
                
                {/* Floating elements */}
                <div className="absolute z-[6] top-8 right-8 w-16 h-16 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-2xl backdrop-blur-sm border border-blue-400/50 rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-bounce" />
                <div className="absolute z-[6] bottom-12 left-8 w-12 h-12 bg-gradient-to-br from-green-400/30 to-blue-400/30 rounded-xl backdrop-blur-sm border border-green-400/50 -rotate-12 opacity-0 group-hover:opacity-100 transition-all duration-700" />
            </div>
        </div>

        <div className={`ss:hidden ${styles.flexCenter} relative z-10`}>
            <GetStarted/>
        </div>
    </section>
);

export default Hero;