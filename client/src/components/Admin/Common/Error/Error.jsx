import {FaExclamationTriangle} from 'react-icons/fa';
import styles from './Error.module.css';

export const Error = ({message}) => {
    if (!message) return null;

    return (<div className={styles.errorState}>
        <div className={styles.errorContent}>
            <FaExclamationTriangle className={styles.errorIcon} size={24}/>
            <div className={styles.errorInfo}>
                <span className={styles.errorTitle}>Communication Error</span>
                <p className={styles.errorMessage}>{message}</p>
            </div>
        </div>
        <div className={styles.errorBar}/>
    </div>);
};