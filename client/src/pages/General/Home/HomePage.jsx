import styles from "./HomePage.module.css";

import Hero from "../../../components/General/Home/Hero.jsx";
import InfoStrip from "../../../components/General/Home/InfoStrip.jsx";
import About from "../../../components/General/Home/About.jsx";
import FeaturedProducts from "../../../components/General/Home/FeaturedProducts.jsx";

export default function HomePage() {
    return (<main className={styles.page}>
        <Hero/>
        <InfoStrip/>
        <FeaturedProducts/>
        <About/>
    </main>);
}
