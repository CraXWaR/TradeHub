import Button from "../../components/User/UI/Button/Button.jsx";

import styles from "./Unauthorized.module.css";

const Unauthorized = () => {
    return (<div className={styles.wrapper}>
            <section className={styles.card}>
                <div className={styles.iconRow}>
                    <div className={styles.iconCircle}>
                        <span className={styles.lockShackle}/>
                        <span className={styles.lockBody}/>
                    </div>
                </div>

                <p className={styles.eyebrow}>Access denied</p>

                <h1 className={styles.title}>You’re not allowed here.</h1>

                <p className={styles.subtitle}>
                    You don’t have permission to view this page. Try signing in with
                    the correct account or go back to the homepage.
                </p>

                <div className={styles.actions}>
                    <Button to="/" size={"md"} variant={"full"}>
                        Back to home
                    </Button>
                </div>

                <p className={styles.hint}>Error code: 403 · Unauthorized</p>
            </section>
        </div>);
};

export default Unauthorized;
