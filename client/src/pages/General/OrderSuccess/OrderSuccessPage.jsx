import {useParams, Link, useLocation, useNavigate} from "react-router-dom";
import {FiCheckCircle, FiShoppingBag} from "react-icons/fi";
import Button from "../../../components/User/UI/Button/Button.jsx";
import styles from "./OrderSuccessPage.module.css";
import {useEffect} from "react";

export default function OrderSuccessPage() {
    const {orderId} = useParams();

    const location = useLocation();
    const isValidAccess = location.state?.fromCheckout;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isValidAccess) {
            navigate("/", {replace: true});
        }
    }, [isValidAccess, navigate]);

    return (<main className={styles.wrapper}>
        <div className={styles.mainBox}>
            <div className={styles.content}>
                <section className={styles.statusSection}>
                    <div className={styles.checkWrapper}>
                        <FiCheckCircle/>
                    </div>
                    <h1 className={styles.mainTitle}>Order Placed</h1>
                    <p className={styles.orderIdText}>
                        Order Reference: <span className={styles.idNumber}>#{orderId}</span>
                    </p>
                </section>

                <div className={styles.messageCard}>
                    <h2 className={styles.thanksText}>Thank you for your purchase!</h2>
                    <p className={styles.description}>
                        We’ve received your order and our team is already working on it.
                        We’ll make sure your items reach you as soon as possible.
                    </p>
                </div>

                <footer className={styles.sideActions}>
                    <Button to={"/products"} variant={"full"} size={"md"}>
                                <span className={styles.btnContent}>
                                    Explore More Products
                                    <FiShoppingBag className={styles.btnIcon}/>
                                </span>
                    </Button>

                    <div className={styles.divider}>
                        <span className={styles.dividerText}>DONE</span>
                    </div>

                    <p className={styles.footerNote}>
                        Need help? <Link
                        to={"" /* TODO: Add real support link or path like "/contact" */}
                        className={styles.supportHighlight}>
                        Contact support
                    </Link>
                    </p>
                </footer>
            </div>
        </div>
    </main>);
}