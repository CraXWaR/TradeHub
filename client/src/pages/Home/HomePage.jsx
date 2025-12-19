import styles from "./HomePage.module.css";

import Hero from "../../components/Home/Hero.jsx";
import InfoStrip from "../../components/Home/InfoStrip.jsx";
import About from "../../components/Home/About.jsx";
import FeaturedProducts from "../../components/Home/FeaturedProducts.jsx";

export default function HomePage() {
    return (<main className={styles.page}>
        <Hero/>
        <InfoStrip/>
        <FeaturedProducts/>
        <About/>
    </main>);
}
