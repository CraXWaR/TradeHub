import {useState} from "react";
import {FaTimes, FaMapMarkerAlt, FaShoppingBag, FaCreditCard} from "react-icons/fa";

import Button from "../UI/Button/Button.jsx";

import styles from "./OrderDetailsModal.module.css";
import OrderContent from "./subComponents/OrderContent.jsx";
import OrderFooter from "./subComponents/OrderFooter.jsx";
import ShippingDetails from "./subComponents/ShippingDetails.jsx";

const BASE_URL = import.meta.env.VITE_API_URL || '';

export const OrderDetailsModal = ({order, onClose}) => {
    const [isClosing, setIsClosing] = useState(false);
    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 350);
    };

    return (<div className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ""}`} onClick={handleClose}>
        <div className={`${styles.modal} ${isClosing ? styles.closing : ""}`} onClick={e => e.stopPropagation()}>
            <Button size={"sm"} variant={"full"} className={styles.closeBtn} onClick={handleClose}><FaTimes
                size={20}/></Button>

            <header className={styles.header}>
                <h2 className={styles.orderId}>Order #{order.id}</h2>
                <div className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                    {order.status}
                </div>
            </header>

            <div className={styles.scrollContent}>
                <div className={styles.infoGrid}>
                    <div>
                        <span className={styles.infoLabel}>Date</span>
                        <span className={styles.infoValue}>
                            {new Date(order.createdAt).toLocaleDateString("en-GB")}
                        </span>
                    </div>
                </div>

                <OrderContent items={order.items} baseUrl={BASE_URL}/>

                <ShippingDetails order={order}/>
            </div>

            <OrderFooter total={order.total}/>
        </div>
    </div>);
};