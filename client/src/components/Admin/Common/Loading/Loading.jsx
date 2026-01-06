import styles from './Loading.module.css';

export const Loading = ({message = "Fetching latest data..."}) => {
    return (<div className={styles.loadingContainer}>
            <div className={styles.spinnerWrapper}>
                <div className={styles.mainSpinner}></div>
                <div className={styles.pulseRing}></div>
            </div>
            <p className={styles.loadingText}>{message}</p>
        </div>);
};