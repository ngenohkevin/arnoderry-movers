import {
    Business,
    CTA,
    Footer,
    Hero,
    Navbar,
    Stats,
    Testimonials,
    Clients,
    Services,
} from "./components";
import styles from "./style.js";
import FreeQuote from "./components/FreeQuote.jsx";


const App = () => (

    <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
            <div className={`${styles.boxWidth}`}>
                <Navbar/>
            </div>
        </div>

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
                {/*<Cleaning/>*/}
                {/*<CarouselSection/>*/}
                {/*<Testimonials/>*/}
                {/*<Clients/>*/}
                <CTA/>
                <Footer/>
            </div>
        </div>

    </div>
);

export default App;