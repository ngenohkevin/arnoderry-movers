import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import styles, { layout } from "../style.js";
import { useState, useEffect } from "react";
import { move1, move2, move3, move4, move5, move6, move7, move8 } from "../assets/index.js";

const CarouselSection = () => {
    const images = [
        { src: move1, title: "Professional Packing", desc: "Expert packing services" },
        { src: move2, title: "Safe Transportation", desc: "Secure moving solutions" },
        { src: move3, title: "Office Relocation", desc: "Business moving expertise" },
        { src: move4, title: "Furniture Assembly", desc: "Complete setup service" },
        { src: move5, title: "Home Moving", desc: "Residential specialists" },
        { src: move6, title: "Storage Solutions", desc: "Temporary storage options" },
        { src: move7, title: "Cleaning Services", desc: "Post-move cleaning" },
        { src: move8, title: "Installation Services", desc: "TV mounting & setup" }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    useEffect(() => {
        if (isAutoPlay) {
            const interval = setInterval(() => {
                setCurrentIndex((prevIndex) => 
                    prevIndex === images.length - 1 ? 0 : prevIndex + 1
                );
            }, 4000);
            return () => clearInterval(interval);
        }
    }, [isAutoPlay, images.length]);

    const prevSlide = () => {
        setIsAutoPlay(false);
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        setIsAutoPlay(false);
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setIsAutoPlay(false);
        setCurrentIndex(slideIndex);
    };

    return (
        <section className={`${layout.sectionReverse} relative overflow-hidden`}>
            <div className={layout.sectionInfo}>
                <div className="mb-8">
                    <h2 className={`${styles.heading2} text-gradient mb-6`}>
                        Rely on Our Expertise!
                    </h2>
                    <p className={`${styles.paragraph} max-w-[470px] leading-relaxed`}>
                        With our seasoned team at the helm, you can count on us for efficient packing, 
                        secure transportation, and punctual delivery of your cherished belongings. 
                        Entrust us with every facet of your relocation process and experience a journey 
                        defined by professionalism and care.
                    </p>
                </div>
                
                {/* Image Thumbnails */}
                <div className="grid grid-cols-4 gap-3 mt-8">
                    {images.slice(0, 4).map((image, index) => (
                        <div
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`relative cursor-pointer rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                                currentIndex === index ? 'ring-2 ring-blue-400 shadow-lg' : 'opacity-70 hover:opacity-100'
                            }`}
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="w-full h-20 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-1 left-2 text-white text-xs font-medium">
                                {image.title}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Modern Image Gallery */}
            <div className='relative max-w-[600px] w-full mx-auto'>
                {/* Main Image Container */}
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl group">
                    <img
                        src={images[currentIndex].src}
                        alt={images[currentIndex].title}
                        className='w-full h-full object-cover transition-all duration-700 group-hover:scale-105'
                    />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                    
                    {/* Image Info */}
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                        <h3 className="font-poppins font-semibold text-xl mb-2">
                            {images[currentIndex].title}
                        </h3>
                        <p className="font-poppins text-sm opacity-90">
                            {images[currentIndex].desc}
                        </p>
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={prevSlide}
                        className='absolute top-1/2 left-4 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100'
                    >
                        <BsChevronCompactLeft size={24} />
                    </button>
                    <button
                        onClick={nextSlide}
                        className='absolute top-1/2 right-4 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100'
                    >
                        <BsChevronCompactRight size={24} />
                    </button>

                    {/* Auto-play indicator */}
                    {isAutoPlay && (
                        <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                        </div>
                    )}
                </div>

                {/* Modern Dot Indicators */}
                <div className='flex justify-center mt-6 space-x-2'>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`transition-all duration-300 rounded-full ${
                                currentIndex === index 
                                    ? 'w-8 h-3 bg-gradient-to-r from-blue-400 to-purple-500' 
                                    : 'w-3 h-3 bg-white/40 hover:bg-white/60'
                            }`}
                        />
                    ))}
                </div>

                {/* Gallery Grid Preview */}
                <div className="grid grid-cols-4 gap-2 mt-6">
                    {images.slice(4).map((image, index) => (
                        <div
                            key={index + 4}
                            onClick={() => goToSlide(index + 4)}
                            className={`relative cursor-pointer rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 ${
                                currentIndex === index + 4 ? 'ring-2 ring-blue-400' : 'opacity-60 hover:opacity-100'
                            }`}
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="w-full h-16 object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="absolute -z-10 top-1/4 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute -z-10 bottom-1/4 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
        </section>
    );
};

export default CarouselSection;