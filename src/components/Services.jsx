import styles, {layout} from "../style.js";
import {services} from "../assets/index.js";
import {service} from "../constants/index.js";

// eslint-disable-next-line react/prop-types
const ServiceCard = ({icon, title, content, index}) => (
    <div className={`flex flex-row p-6 rounded-[20px] ${index !== service.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
        <div className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}>
            <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain"/>
        </div>
        <div className="flex-1 flex flex-col ml-3">
            <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
                {title}
            </h4>
            <p className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1">
                {content}
            </p>
        </div>
    </div>
)
const Services = () => (
    <section id="services" className={layout.sectionReverse}>
        <div className={layout.sectionImgReverse}>
            <img alt="services"
                 src={services}
                 className="w-[100%] h-[100%] relative z-[5]"
            />
            <div className="absolute z-[3] -left-1/2 top-0 w-[50%] h-[50%] rounded-full white__gradient"/>
            <div className="absolute z-[0] w-[50%] h-[50%] -left-1/2 bottom-0 rounded-full pink__gradient"/>
        </div>
        <div className={layout.sectionInfo}>
            <h2 className={`${styles.heading2} ml-3`}>The Services We Offer.</h2>
            <div className={`${layout.sectionImg} flex-col`}>
                {service.map((service, index) => (
                    <ServiceCard key={service.id} {...service} index={index}/>
                ))}
            </div>
        </div>
    </section>
);


export default Services;