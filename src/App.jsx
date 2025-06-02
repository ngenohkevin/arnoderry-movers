import {
    Business,
    CTA,
    Footer,
    Hero,
    Navbar,
    Stats,
    Services,
} from "./components";
import styles from "./style.js";
import FreeQuote from "./components/FreeQuote.jsx";
import CarouselSection from "./components/CarouselSection.jsx";


const App = () => (
    <div className="bg-primary w-full overflow-hidden">
        {/* Fixed Navbar */}
        <Navbar/>
        
        {/* Main Content with proper spacing for fixed navbar */}
        <div className="pt-32">
            <div className={`bg-primary ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Hero/>
                </div>
            </div>

            <div className={`bg-primary ${styles.paddingX} ${styles.flexStart}`}>
                <div className={`${styles.boxWidth}`}>
                    <Stats/>
                    <Business/>
                    <FreeQuote/>
                    <Services/>
                    <CarouselSection/>
                    <CTA/>
                    <Footer/>
                </div>
            </div>
        </div>
    </div>
);

export default App;