import {FaMapMarkerAlt} from "react-icons/fa";
import styles from "./ShippingDetails.module.css";

const ShippingDetails = ({order}) => {
    return (<div className={styles.card}>
        <div className={styles.cardHeader}>
            <FaMapMarkerAlt/>
            <h3>Shipping Information</h3>
        </div>

        <div className={styles.addressDetails}>
            <div className={styles.addressGroup}>
                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Street:</span>
                    <p className={styles.primaryText}>{order.address}</p>
                </div>

                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Location:</span>
                    <p className={styles.secondaryText}>
                        {order.postal_code} {order.city}, {order.country}
                    </p>
                </div>

                <div className={styles.detailRow}>
                    <span className={styles.detailLabel}>Phone:</span>
                    <p className={styles.phoneText}>{order.phone_number}</p>
                </div>
            </div>

            <div className={styles.feeSection}>
                <div className={styles.feeRow}>
                    <span className={styles.detailLabel}>Subtotal:</span>
                    <span className={styles.feeValue}>€ {order.subtotal}</span>
                </div>

                {order.apply_gift_wrap && (<div className={styles.feeRow}>
                    <span className={styles.detailLabel}>Gift Wrap:</span>
                    <span className={styles.feeValue}>€ 4.00</span>
                </div>)}

                <div className={styles.feeRow}>
                    <span className={styles.detailLabel}>Shipping:</span>
                    <span className={styles.feeValue}>€ {order.shipping}</span>
                </div>

                <div className={styles.feeRow}>
                    <span className={styles.detailLabel}>Estimated Tax:</span>
                    <span className={styles.feeValue}>€ {order.tax}</span>
                </div>
            </div>
        </div>
    </div>);
};

export default ShippingDetails;