import {useGetWishlistItems} from "../../../hooks/useGetWishlistItems.js";

import styles from "./OverviewPage.module.css";
import {useUserOrders} from "../../../hooks/profile/useUserOrders.js";

const OverviewPage = () => {
    const {items, loading: wlLoading} = useGetWishlistItems();
    const wlCount = items.length;
    const wishlistText = wlLoading
        ? "Loading wishlist..."
        : (wlCount === 0 ? "No items saved yet." : `Total items: ${wlCount}`);

    const {orders, loading: ordersLoading} = useUserOrders();
    const ordersCount = orders.length;
    const ordersText = ordersLoading
        ? "Loading orders..."
        : (ordersCount === 0 ? "No orders yet." : `Total orders: ${ordersCount}`);

    return (
        <section className={styles.page}>
            <header className={styles.header}>
                <h2 className={styles.title}>Overview</h2>
                <p className={styles.subtitle}>
                    Quick glance at your recent activity.
                </p>
            </header>

            <div className={styles.grid}>
                <article className={styles.card}>
                    <h3 className={styles.cardTitle}>Orders</h3>
                    <p className={styles.cardText}>{ordersText}</p>
                </article>

                <article className={styles.card}>
                    <h3 className={styles.cardTitle}>Wishlist</h3>
                    <p className={styles.cardText}>{wishlistText}</p>
                </article>

                <article className={styles.card}>
                    <h3 className={styles.cardTitle}>Account</h3>
                    <p className={styles.cardText}>Everything looks good.</p>
                </article>
            </div>
        </section>
    );
};

export default OverviewPage;
