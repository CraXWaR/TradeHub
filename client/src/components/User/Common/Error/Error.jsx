import {FaExclamationTriangle} from 'react-icons/fa';
import styles from './Error.module.css';

export const Error = ({error, message}) => {
    if (!error) return null;

    return (<div className={styles.errorState}>
        <div className={styles.errorContent}>
            <div className={styles.iconContainer}>
                <FaExclamationTriangle className={styles.errorIcon}/>
            </div>
            <div className={styles.errorInfo}>
                <span className={styles.errorTitle}>{message}</span>
                <p className={styles.errorMessage}>{error}</p>
            </div>
        </div>
        <div className={styles.errorBar}/>
    </div>);
};