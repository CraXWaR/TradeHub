import styles from "./FreeShippingBanner.module.css";

export function FreeShippingBanner({hasItems, subtotal, threshold}) {
    if (!hasItems) return null;

    const progress = Math.min(100, Math.round((subtotal / threshold) * 100));
    const remaining = Math.max(0, threshold - subtotal).toFixed(2);

    return (<section className={styles.promo} aria-live="polite">
            <div className={styles.promoRow}>
                {subtotal >= threshold ? (<span className={styles.promoOk}>🎉 Free shipping unlocked</span>) : (
                    <span className={styles.promoText}>
            You’re <strong>${remaining}</strong> away from free shipping
          </span>)}
                <span className={styles.progressPill}>${threshold} goal</span>
            </div>

            <div
                className={styles.progress}
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                aria-label="Free shipping progress">
                <span className={styles.progressFill} style={{width: `${progress}%`}}/>
            </div>
        </section>);
}