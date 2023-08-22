import styles, {layout} from "../style.js";
import {features} from "../constants/index.js";


// eslint-disable-next-line react/prop-types
const FeatureCard = ({icon, title, content, index}) => (
    <div className={`flex flex-row p-6 rounded-[20px] ${index !== features.length - 1 ? "mb-6" : "mb-0"} feature-card`}>
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
const Business = () => (
    <section id="journey" className={layout.section}>
        <div className={layout.sectionInfo}>
            <h2 className={styles.heading2}>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                Unwind , <br className="sm:block hidden"/> and
                Leave It to Us.
            </h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
            Sit back and enjoy peace of mind while our capable team takes the reins. 
            From proficient packing to secure transportation and punctual delivery, 
            we`ve got it all covered. Entrust every aspect of your relocation journey to us with confidence.
            </p>
            {/*<Button styles={`mt-10`} id="home"/>*/}
        </div>
        <div className={`${layout.sectionImg} flex-col`}>
            {features.map((feature, index) => (
                <FeatureCard key={feature.id} {...feature} index={index}/>
            ))}
        </div>

    </section>
);


export default Business;