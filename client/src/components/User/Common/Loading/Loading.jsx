import styles from './Loading.module.css';

export const Loading = ({message, subMessage}) => {
    return (<div className={styles.centerContainer}>
        <div className={styles.loaderWrapper}>
            <div className={styles.warmLoader}></div>
            <div className={styles.loaderPulse}></div>
        </div>
        <h3 className={styles.loadingTitle}>{message}</h3>
        <p className={styles.loadingText}>{subMessage}</p>
    </div>);
};