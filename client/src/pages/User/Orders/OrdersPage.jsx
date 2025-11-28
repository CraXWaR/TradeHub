import styles from "./OrdersPage.module.css";
import {Link} from "react-router-dom";

const OrdersPage = () => {
    const hasOrders = false;

    return (
        <section className={styles.page}>
            <header className={styles.header}>
                <h2 className={styles.title}>Orders</h2>
                <p className={styles.subtitle}>
                    Track and manage your orders.
                </p>
            </header>

            <div className={styles.card}>
                {hasOrders ? (
                    <div> {/* will replace with list of orders later */}</div>) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📦</div>
                        <h3 className={styles.emptyTitle}>No orders yet</h3>
                        <p className={styles.emptyText}>
                            When you place an order, it will appear here so you
                            can follow its status and details.
                        </p>
                        <Link to={'/products'}
                            className={styles.primaryButton}>
                            Start shopping
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default OrdersPage;
