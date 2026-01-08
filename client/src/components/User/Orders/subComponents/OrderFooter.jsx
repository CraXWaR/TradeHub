import {FaCreditCard} from "react-icons/fa";
import styles from "./OrderFooter.module.css";

const OrderFooter = ({total}) => {
    return (<footer className={styles.footer}>
            <div className={styles.totalContainer}>
                <div className={styles.totalLabel}>
                    <FaCreditCard/>
                    <span>Total Amount</span>
                </div>
                <div className={styles.totalAmount}>
                    <span className={styles.currency}>€</span>{total}
                </div>
            </div>
        </footer>);
};

export default OrderFooter;