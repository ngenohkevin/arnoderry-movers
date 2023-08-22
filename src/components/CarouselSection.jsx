import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import styles, {layout} from "../style.js";
import { RxDotFilled } from "react-icons/rx";
import { useState } from "react";
import {move1, move2, move3, move4, move5, move6, move7, move8} from "../assets/index.js";
// import {service} from "../constants/index.js";


const CarouselSection = () => {
    const images = [move1, move2, move3, move4, move5, move6, move7, move8];

    const [currentIndex, setCurrentIndex] = useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === images.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    return (
        <section className={layout.sectionReverse}>
            <div className={layout.sectionInfo}>
                {/*<h2 className={`${styles.heading2} text-gradient`}>*/}
                {/*    /!* eslint-disable-next-line react/no-unescaped-entities *!/*/}
                {/*    At Anorderry Movers, <br className="sm:block hidden"/> We do*/}
                {/*    packing, shower installation, tv mounting, cleaning...*/}
                {/*</h2>*/}
                <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                <h2 className={styles.heading2}> Rely on Our Expertise!</h2>
                With our seasoned team at the helm, you can count on us for efficient packing, 
                secure transportation, and punctual delivery of your cherished belongings. 
                Entrust us with every facet of your relocation process and experience a journey defined by professionalism and care.
                </p>
                {/*<Button styles={`mt-10`} id="home"/>*/}
            </div>
            <div className='max-w-[800px] h-[780px] w-full m-auto py-16 px-4 relative group'>
                <div
                    style={{ backgroundImage: `url(${images[currentIndex]})` }}
                    className='w-full h-full rounded-2xl bg-center bg-cover duration-500'
                ></div>
                {/* Left Arrow */}
                <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactLeft onClick={prevSlide} size={30} />
                </div>
                {/* Right Arrow */}
                <div className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
                    <BsChevronCompactRight onClick={nextSlide} size={30} />
                </div>
                <div className='flex top-4 justify-center py-2'>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            onClick={() => goToSlide(index)}
                            className='text-2xl cursor-pointer text-white'
                        >
                            <RxDotFilled/>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CarouselSection;
