import { useEffect, useState } from "react";
import styles from "./OverviewPage.module.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const OverviewPage = () => {
    const [wlCount, setWlCount] = useState(0);
    const [loadingWl, setLoadingWl] = useState(true);

    const token = localStorage.getItem("token") || "";

    useEffect(() => {
        let cancelled = false;

        const loadWishlistCount = async () => {
            try {
                const res = await fetch(`${BASE_URL}/user/wishlist`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json().catch(() => ({}));
                if (!cancelled && res.ok && Array.isArray(data.items)) {
                    setWlCount(data.items.length);
                }
            } catch {
                if (!cancelled) setWlCount(0);
            } finally {
                if (!cancelled) setLoadingWl(false);
            }
        };

        if (token) loadWishlistCount();
        else {
            setWlCount(0);
            setLoadingWl(false);
        }

        return () => {
            cancelled = true;
        };
    }, [token]);

    const wishlistText = loadingWl
        ? "Loading…"
        : wlCount === 0
            ? "No items saved yet."
            : `Total items: ${wlCount}`;

    // TODO ADD ORDER COUNTER
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
                    <p className={styles.cardText}>You have 0 recent orders.</p>
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
