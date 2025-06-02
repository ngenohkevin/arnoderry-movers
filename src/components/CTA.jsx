import styles from "../style.js";
import { Link } from 'react-scroll';
import { HiPhone, HiMail } from 'react-icons/hi';
import { BsWhatsapp } from 'react-icons/bs';
import { FiArrowRight } from 'react-icons/fi';

const ContactCard = ({ icon: IconComponent, title, content, type, index, gradient, iconBg }) => {
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
            onClick={handleClick}
            className={`group relative overflow-hidden p-6 rounded-3xl cursor-pointer
                bg-gradient-to-br ${gradient} backdrop-blur-sm border border-white/10
                hover:scale-105 hover:border-white/20 transition-all duration-500 hover:shadow-2xl`}
        >
            {/* Background glow effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-3xl`} />
            
            <div className="flex items-center space-x-4 relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${iconBg} flex items-center justify-center
                    group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                    <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <div className="flex-1">
                    <h4 className="font-poppins font-bold text-white text-lg mb-1 
                        group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r 
                        group-hover:from-white group-hover:to-gray-200 transition-all duration-500">
                        {title}
                    </h4>
                    <p className="font-poppins text-gray-300 group-hover:text-white transition-colors duration-500 font-medium">
                        {content}
                    </p>
                </div>
                
                {/* Arrow indicator */}
                <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
            </div>
            
            {/* Click ripple effect */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-white/50 rounded-full 
                opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500" />
        </div>
    );
};

const CTA = () => {
    const contactData = [
        {
            id: "phone1",
            icon: HiPhone,
            title: "Call Us:",
            content: "254700570533",
            type: "phone",
            gradient: "from-blue-500/20 to-cyan-500/20",
            iconBg: "bg-gradient-to-br from-blue-500 to-cyan-500"
        },
        {
            id: "phone2",
            icon: HiPhone,
            title: "OR",
            content: "254741995348",
            type: "phone",
            gradient: "from-blue-500/20 to-indigo-500/20",
            iconBg: "bg-gradient-to-br from-blue-500 to-indigo-500"
        },
        // {
        //     id: "email1",
        //     icon: HiMail,
        //     title: "Email Us:",
        //     content: "peridyl@pm.me",
        //     type: "email",
        //     gradient: "from-purple-500/20 to-pink-500/20",
        //     iconBg: "bg-gradient-to-br from-purple-500 to-pink-500"
        // },
        {
            id: "whatsapp1",
            icon: BsWhatsapp,
            title: "WhatsApp Us:",
            content: "254741995348",
            type: "whatsapp",
            gradient: "from-green-500/20 to-emerald-500/20",
            iconBg: "bg-gradient-to-br from-green-500 to-emerald-500"
        }
    ];

    return (
        <section className={`${styles.flexCenter} ${styles.marginY} relative overflow-hidden`}>
            {/* Background decorative elements */}
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/3 rounded-full blur-3xl" />
            
            <div className="w-full max-w-7xl mx-auto px-6">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Side - Content */}
                    <div className="relative z-10 space-y-8">
                        <div>
                            <h2 className={`${styles.heading2} mb-6`}>
                                <span className="text-gradient bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                    Get in Touch
                                </span>
                                <span className="text-white"> with Us!</span>
                            </h2>
                            <p className={`${styles.paragraph} max-w-[500px] leading-relaxed text-gray-300 mb-8`}>
                                Share your unique requirements with us. Whether you're looking for top-notch cleaning services 
                                or seamless moving assistance, we're here to help. Reach out to us today and let's transform 
                                your space together!
                            </p>
                        </div>
                        
                        {/* Enhanced CTA Button */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="free-quote" smooth={true} duration={500} offset={-100}>
                                <button className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 
                                    rounded-2xl font-poppins font-semibold text-white text-lg cursor-pointer
                                    hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 w-full sm:w-auto">
                                    <span className="relative z-10 flex items-center justify-center space-x-2">
                                        <span>🚀</span>
                                        <span>Start Your Quote</span>
                                        <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                                </button>
                            </Link>
                            
                            {/*<button className="group px-6 py-4 border-2 border-gray-600 hover:border-blue-400 */}
                            {/*    rounded-2xl font-poppins font-semibold text-gray-300 hover:text-white */}
                            {/*    transition-all duration-300 flex items-center justify-center space-x-2">*/}
                            {/*    <span>💬</span>*/}
                            {/*    <span>Live Chat</span>*/}
                            {/*</button>*/}
                        </div>
                        
                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-700/50">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gradient mb-1">24/7</div>
                                <div className="text-sm text-gray-400">Support</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gradient mb-1">&lt;2h</div>
                                <div className="text-sm text-gray-400">Response</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gradient mb-1">500+</div>
                                <div className="text-sm text-gray-400">Happy Clients</div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Right Side - Contact Cards */}
                    <div className="relative z-10 space-y-4">
                        {contactData.map((contact, index) => (
                            <ContactCard key={contact.id} {...contact} index={index} />
                        ))}

                        {/* Emergency Contact */}
                        {/*<div className="mt-8 p-6 rounded-3xl bg-gradient-to-r from-red-500/10 to-orange-500/10*/}
                        {/*    border border-red-500/20 backdrop-blur-sm">*/}
                        {/*    <div className="flex items-center space-x-3">*/}
                        {/*        <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse" />*/}
                        {/*        <span className="text-red-400 font-semibold">Emergency Moving?</span>*/}
                        {/*    </div>*/}
                        {/*    <p className="text-gray-300 text-sm mt-2">*/}
                        {/*        Need urgent assistance? Call us anytime - we're available 24/7 for emergency moves.*/}
                        {/*    </p>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTA;