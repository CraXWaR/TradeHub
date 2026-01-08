import {FaGift, FaCalendarAlt, FaArrowRight} from 'react-icons/fa';

import styles from './OrderCard.module.css';

const OrderCard = ({order, onOpen}) => {
    const formattedDate = new Date(order.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit", month: "short", year: "numeric"
    });

    return (<div className={styles.orderCard}>
            {order.apply_gift_wrap && (<div className={styles.giftRibbon}>
                    <FaGift size={10}/> GIFT WRAP
                </div>)}

            <div className={styles.orderHeader}>
                <span className={styles.orderId}>#ORD-{order.id}</span>
                <span className={styles.price}>{Number(order.total).toFixed(2)} BGN</span>
            </div>

            <div className={styles.customerInfo}>
                <h3 className={styles.customerName}>
                    {order.first_name} {order.last_name}
                </h3>
                <p className={styles.dateRow}>
                    <FaCalendarAlt size={12}/> {formattedDate}
                </p>
            </div>

            <div className={styles.footerActions}>
                <span className={`${styles.statusBadge} ${styles['status_' + order.status.toLowerCase()]}`}>
                    {order.status.toUpperCase()}
                </span>

                <button className={styles.detailsBtn} onClick={() => onOpen(order)}>
                    Details <FaArrowRight size={12}/>
                </button>
            </div>
        </div>);
};

export default OrderCard;