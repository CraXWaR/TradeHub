import styles from './DataGroup.module.css';

const DataGroup = ({label, value, extra}) => {
    return (<div className={styles.dataGroup}>
            <span className={styles.dataLabel}>{label}</span>
            <span className={styles.dataValue}>{value}</span>
            {extra && <span className={styles.dataExtra}>{extra}</span>}
        </div>);
};

export default DataGroup;