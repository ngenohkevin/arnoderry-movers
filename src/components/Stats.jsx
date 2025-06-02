import styles from "../style.js";
import { stats } from "../constants/index.js";
import { useState, useEffect } from "react";

const StatCard = ({ stat, index }) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Extract number from stat.value (e.g., "200+" -> 200)
    const targetNumber = parseInt(stat.value.replace(/\D/g, ''));
    const hasPlus = stat.value.includes('+');

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById(`stat-${stat.id}`);
        if (element) observer.observe(element);

        return () => {
            if (element) observer.unobserve(element);
        };
    }, [stat.id]);

    useEffect(() => {
        if (isVisible) {
            let start = 0;
            const duration = 2000; // 2 seconds
            const increment = targetNumber / (duration / 50);

            const timer = setInterval(() => {
                start += increment;
                if (start >= targetNumber) {
                    setCount(targetNumber);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 50);

            return () => clearInterval(timer);
        }
    }, [isVisible, targetNumber]);

    const getGradientColors = (index) => {
        const gradients = [
            'from-blue-400 to-purple-500',
            'from-green-400 to-blue-500',
            'from-purple-400 to-pink-500'
        ];
        return gradients[index % gradients.length];
    };

    const getBorderColor = (index) => {
        const colors = [
            'border-blue-500/30',
            'border-green-500/30',
            'border-purple-500/30'
        ];
        return colors[index % colors.length];
    };

    return (
        <div
            id={`stat-${stat.id}`}
            className={`group flex-1 flex flex-col items-center justify-center m-4 p-8 rounded-3xl 
                bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border ${getBorderColor(index)}
                hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 min-w-[200px]`}
        >
            {/* Animated background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors(index)} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`} />
            
            {/* Number display */}
            <div className="relative z-10 mb-4">
                <h4 className={`font-poppins font-bold text-5xl leading-tight text-transparent bg-gradient-to-r ${getGradientColors(index)} bg-clip-text`}>
                    {count}{hasPlus ? '+' : ''}
                </h4>
                
                {/* Decorative elements */}
                <div className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r ${getGradientColors(index)} rounded-full opacity-60 animate-pulse`} />
                <div className={`absolute -bottom-1 -left-1 w-2 h-2 bg-gradient-to-r ${getGradientColors(index)} rounded-full opacity-40 animate-pulse`} style={{animationDelay: '1s'}} />
            </div>
            
            {/* Title */}
            <p className="font-poppins font-semibold text-lg text-center text-gray-300 uppercase tracking-wide group-hover:text-white transition-colors duration-500 relative z-10">
                {stat.title}
            </p>
            
            {/* Bottom accent line */}
            <div className={`mt-4 w-16 h-1 bg-gradient-to-r ${getGradientColors(index)} rounded-full opacity-60 group-hover:w-24 group-hover:opacity-100 transition-all duration-500`} />
        </div>
    );
};

const Stats = () => (
    <section className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6 relative overflow-hidden`}>
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl" />
        
        {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
        ))}
    </section>
);

export default Stats;