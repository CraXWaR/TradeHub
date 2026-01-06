import Button from "../../../components/User/UI/Button/Button.jsx";
import {FaBoxOpen, FaCalendarAlt, FaChevronRight, FaExclamationTriangle} from "react-icons/fa";

import styles from "./OrdersPage.module.css";
import {useUserOrders} from "../../../hooks/profile/useUserOrders.js";

const OrdersPage = () => {
    const {orders, loading, error} = useUserOrders();

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

    return (<section className={styles.page}>
        <header className={styles.header}>
            <h2 className={styles.title}>Orders</h2>
            <p className={styles.subtitle}>Track and manage your orders.</p>
        </header>

        <div className={styles.content}>
            {orders.length > 0 ? (<div className={styles.orderList}>
                {orders.map(order => (<div key={order.id} className={styles.orderItem}>
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
                            <span className={styles.total}>{order.total} BGN</span>
                            <FaChevronRight className={styles.arrow}/>
                        </div>
                    </div>
                </div>))}
            </div>) : (<div className={styles.emptyState}>
                <div className={styles.emptyContent}>
                    <div className={styles.emptyIconContainer}>
                        <FaBoxOpen className={styles.emptyIcon}/>
                    </div>
                    <div className={styles.emptyInfo}>
                        <span className={styles.emptyTitle}>No orders yet</span>
                        <p className={styles.emptyMessage}>
                            You haven't placed any orders. Start exploring our shop.
                        </p>
                    </div>
                </div>
                <div className={styles.emptyActions}>
                    <Button to={'/products'} variant={"full"} size={"md"}>
                        Start Shopping
                    </Button>
                </div>
                <div className={styles.emptyBar}/>
            </div>)}
        </div>

        {orders.length > 0 && (<div className={styles.footerAction}>
            <Button to={'/products'} variant={"full"} size={"md"}>
                Continue Shopping
            </Button>
        </div>)}
    </section>);
};

export default OrdersPage;