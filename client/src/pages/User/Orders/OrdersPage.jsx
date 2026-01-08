import {useState} from "react";
import {useUserOrders} from "../../../hooks/profile/useUserOrders.js";
import {FaExclamationTriangle} from "react-icons/fa";

import OrderDetailsModal from "../../../components/User/Orders/OrderDetailsModal.jsx";
import Button from "../../../components/User/UI/Button/Button.jsx";
import OrderItem from "../../../components/User/Orders/OrderItem.jsx";

import styles from "./OrdersPage.module.css";

const OrdersPage = () => {
    const {orders, loading, error} = useUserOrders();

    const [selectedOrder, setSelectedOrder] = useState(null);

    const openOrder = (order) => setSelectedOrder(order);
    const closeOrder = () => setSelectedOrder(null);

    //TODO CREATE COMMON COMPONENTS FOR THIS 3 STATES
    if (loading) {
        return (<div className={styles.centerContainer}>
            <div className={styles.loaderWrapper}>
                <div className={styles.warmLoader}></div>
                <div className={styles.loaderPulse}></div>
            </div>
            <h3 className={styles.loadingTitle}>Preparing your history</h3>
            <p className={styles.loadingText}>Fetching your orders from the vault...</p>
        </div>);
    }
    if (error) {
        return (<div className={styles.errorState}>
            <div className={styles.errorContent}>
                <div className={styles.iconContainer}>
                    <FaExclamationTriangle className={styles.errorIcon}/>
                </div>
                <div className={styles.errorInfo}>
                    <span className={styles.errorTitle}>Communication Error</span>
                    <p className={styles.errorMessage}>{error}</p>
                </div>
            </div>
            <div className={styles.errorBar}/>
        </div>);
    }
    if (orders.length === 0) {
        return (<div className={styles.footerAction}>
            <Button to={'/products'} variant={"full"} size={"md"}>
                Continue Shopping
            </Button>
        </div>)
    }

    return (<section className={styles.page}>
        <header className={styles.header}>
            <h2 className={styles.title}>Orders</h2>
            <p className={styles.subtitle}>Track and manage your orders.</p>
        </header>

        <div className={styles.content}>
            <div className={styles.orderList}>
                {orders.map(order => (
                    <OrderItem key={order.id} order={order} onOpen={openOrder}/>))}
            </div>
        </div>

        {selectedOrder && (<OrderDetailsModal
                order={selectedOrder}
                onClose={closeOrder}
            />)}
    </section>);
};

export default OrdersPage;