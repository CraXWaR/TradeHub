import styles from './Empty.module.css';

export const Empty = ({
                               title = "No data available",
                               description = "There are no items to display right now.",
                               icon: Icon
                           }) => {
    return (<div className={styles.container}>
        <div className={styles.card}>
            {Icon && (<div className={styles.iconBox}>
                <Icon/>
            </div>)}
            <div className={styles.textGroup}>
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
            <div className={styles.liveIndicator}>
                <span className={styles.pulse}></span>
                <span className={styles.statusText}>System Active & Monitoring</span>
            </div>
        </div>
    </div>);
};