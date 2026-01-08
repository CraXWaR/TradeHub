import {FaBoxOpen, FaCalendarAlt, FaChevronRight} from "react-icons/fa";

import styles from "./OrderItem.module.css";

const OrderItem = ({order, onOpen}) => {
    return (<div className={styles.orderItem} onClick={() => onOpen(order)}>
        <div className={styles.orderMain}>
            <div className={styles.iconCircle}>
                <FaBoxOpen/>
            </div>
            <div className={styles.orderInfo}>
                <span className={styles.orderId}>Order #{order.id}</span>
                <span className={styles.orderDate}>
                        <FaCalendarAlt size={12}/>
                    {new Date(order.createdAt).toLocaleDateString("en-GB")}
                    </span>
            </div>
        </div>
        <div className={styles.orderStatus}>
                <span className={`${styles.badge} ${styles[order.status.toLowerCase()]}`}>
                    {order.status}
                </span>
            <div className={styles.priceGroup}>
                <span className={styles.currency}>€</span>
                <span className={styles.total}>{order.total}</span>
                <FaChevronRight className={styles.arrow}/>
            </div>
        </div>
    </div>);
};

export default OrderItem;