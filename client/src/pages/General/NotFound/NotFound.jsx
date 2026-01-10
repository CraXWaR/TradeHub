import Button from "../../../components/User/UI/Button/Button.jsx";

import styles from "./NotFound.module.css";

const NotFound = () => {
    return (<div className={styles.wrapper}>
        <section className={styles.card}>
            <p className={styles.eyebrow}>Oops, page not found</p>

            <div className={styles.codeRow}>
                <span className={styles.digit}>4</span>

                <span className={styles.zeroWrapper}>
            <span className={styles.zero}>0</span>
          </span>

                <span className={styles.digit}>4</span>
            </div>

            <h1 className={styles.title}>This page took a wrong turn.</h1>

            <p className={styles.subtitle}>
                The link you followed might be broken, or the page may have been
                removed. You can go back home or continue shopping.
            </p>

            <div className={styles.actions}>
                <Button to="/" size={"md"} variant={"full"}>
                    Back to home
                </Button>
                <Button to="/products" size={"md"} variant={"empty"}>
                    Browse products
                </Button>
            </div>

            <p className={styles.hint}>Error code: 404 · Page not found</p>
        </section>
    </div>);
};

export default NotFound;
