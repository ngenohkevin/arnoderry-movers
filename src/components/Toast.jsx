import { useState, useEffect } from 'react';
import { HiCheckCircle, HiXCircle, HiInformationCircle } from 'react-icons/hi';

const Toast = ({ message, type, timeout = 5000, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onClose, 300); // Wait for animation to complete
        }, timeout);

        return () => clearTimeout(timer);
    }, [timeout, onClose]);

    const getToastStyles = () => {
        switch (type) {
            case 'success':
                return {
                    bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
                    border: 'border-green-400/50',
                    icon: HiCheckCircle,
                    iconColor: 'text-green-200'
                };
            case 'error':
                return {
                    bg: 'bg-gradient-to-r from-red-500 to-rose-600',
                    border: 'border-red-400/50',
                    icon: HiXCircle,
                    iconColor: 'text-red-200'
                };
            default:
                return {
                    bg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
                    border: 'border-blue-400/50',
                    icon: HiInformationCircle,
                    iconColor: 'text-blue-200'
                };
        }
    };

    const styles = getToastStyles();
    const IconComponent = styles.icon;

    return (
        <div className={`fixed top-24 right-4 z-[60] transform transition-all duration-300 ${
            isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}>
            <div className={`${styles.bg} backdrop-blur-sm border ${styles.border} rounded-2xl shadow-2xl p-4 max-w-sm`}>
                <div className="flex items-start space-x-3">
                    <IconComponent className={`w-6 h-6 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1">
                        <p className="text-white font-medium text-sm leading-relaxed">
                            {message}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            setIsVisible(false);
                            setTimeout(onClose, 300);
                        }}
                        className="text-white/70 hover:text-white transition-colors duration-200 ml-2"
                    >
                        <HiXCircle className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Toast;