import styles, {layout} from "../style.js";
import {contact} from "../constants/index.js";

// eslint-disable-next-line react/prop-types
const ContactCard = ({ icon, title, content, type, index }) => {
    const handleClick = () => {
        if (type === "phone") {
            window.location.href = `tel:${content}`;
        } else if (type === "email") {
            window.location.href = `mailto:${content}`;
        } else if (type === "whatsapp") {
            window.open(`https://wa.me/${content}`, "_blank");
        }
    };

    return (
        <div
            className={`flex flex-row p-6 rounded-[20px] ${
                index !== contact.length - 1 ? "mb-6" : "mb-0"
            } feature-card`}
        >
            <div
                className={`w-[64px] h-[64px] rounded-full ${styles.flexCenter} bg-dimBlue`}
            >
                <img src={icon} alt="icon" className="w-[50%] h-[50%] object-contain" />
            </div>
            <div className="flex-1 flex flex-col ml-3">
                <h4 className="font-poppins font-semibold text-white text-[18px] leading-[23px] mb-1">
                    {title}
                </h4>
                <a
                    className="font-poppins font-normal text-dimWhite text-[16px] leading-[24px] mb-1 underline cursor-pointer"
                    onClick={handleClick}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {content}
                </a>
            </div>
        </div>
    );
};

const CTA = () => (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
        <div className="flex-1 flex-col">
            <h2 className={styles.heading2}>Contact Us!</h2>
            <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
                Let us know your specific requirements. Contact us for cleaning services or moving services.
            </p>
        </div>
        <div className={layout.sectionInfo}>
            <div className={`${layout.sectionImg} flex-col`}>
                {contact.map((contact, index) => (
                    <ContactCard key={contact.id} {...contact} index={index} />
                ))}
            </div>
        </div>
    </section>
);

// eslint-disable-next-line react-refresh/only-export-components
export default CTA;