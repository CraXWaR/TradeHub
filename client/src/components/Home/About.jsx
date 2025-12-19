import styles from "./About.module.css";
import {FiPackage} from "react-icons/fi";

export default function About() {
    return (<section className={styles.about}>
        <div className={styles.container}>
            <div className={styles.row}>
                <div className={styles.text}>
                    <div className={styles.label}>
                        <FiPackage/>
                        <span>About the Brand</span>
                    </div>

                    <h2 className={styles.heading}>
                        We build products we’d use ourselves.
                    </h2>

                    <div className={styles.content}>
                        <p>
                            Our focus is on making a small number of products really well.
                            Every decision — from materials to manufacturing — is made with
                            durability and everyday use in mind.
                        </p>

                        <p>
                            No trends, no unnecessary features, and no shortcuts. Just
                            dependable products designed to fit naturally into your routine.
                        </p>
                    </div>
                </div>

                {/* Right: Placeholder */}
                <div className={styles.placeholder}>
                    <span className={styles.placeholderText}>PRODUCT / IMAGE</span>
                </div>

            </div>
        </div>
    </section>);
}
