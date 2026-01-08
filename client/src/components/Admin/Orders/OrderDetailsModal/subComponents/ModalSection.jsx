import styles from './ModalSection.module.css';

const ModalSection = ({title, icon, children}) => {
    return (<div className={styles.sectionWrapper}>
            <div className={styles.sectionTitle}>
                {icon} <span>{title.toUpperCase()}</span>
            </div>
            <div className={styles.detailsGrid}>
                {children}
            </div>
        </div>);
};

export default ModalSection;