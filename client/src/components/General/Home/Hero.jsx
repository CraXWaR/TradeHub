import styles from "./Hero.module.css";
import Button from "../../User/UI/Button/Button.jsx";

export default function Hero() {
    return (<section className={`${styles.hero} px-8 py-20`}>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
                <h1 className="text-4xl font-bold mb-4">
                    Quality products, made for everyday use
                </h1>

                <p className="text-[var(--text-500)] mb-8 max-w-md">
                    Shop our curated collection of well-designed, reliable products
                    built to last.
                </p>

                <Button to={"/products"} size={"lg"} variant={"full"}>
                    Shop Now
                </Button>
            </div>

            {/* PLACEHOLDER FOR LOGO / BANNER */}
            <div className={styles.placeholder}>
                <span className={styles.placeholderText}>
                    LOGO / BANNER
                </span>
            </div>
        </div>
    </section>);
}