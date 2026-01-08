import styles from './OrderStatusSelect.module.css';
import {useEffect, useRef, useState} from "react";

const statuses = [{value: 'pending', label: 'Pending'}, {value: 'paid', label: 'Paid'}, {
    value: 'shipped',
    label: 'Shipped'
}, {value: 'delivered', label: 'Delivered'}, {value: 'cancelled', label: 'Cancelled'}];

const OrderStatusSelect = ({currentStatus, onChange}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const ref = useRef(null);

    const toggleMenu = () => {
        if (!isOpen) {
            setIsOpen(true);
            setTimeout(() => setIsTransitioning(true), 10);
        } else {
            setIsTransitioning(false);
            setTimeout(() => setIsOpen(false), 200);
        }
    };

    const handleSelect = (val) => {
        onChange(val);
        toggleMenu();
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target) && isOpen) {
                toggleMenu();
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [isOpen]);

    const selected = statuses.find(s => s.value === currentStatus);

    return (<div className={styles.container} ref={ref}>
            <label className={styles.fieldLabel}>Order Status</label>
            <div
                className={`${styles.selectTrigger} ${styles[currentStatus]} ${isOpen ? styles.active : ""}`}
                onClick={toggleMenu}>
                <span className={styles.statusText}>{selected?.label}</span>
                <div className={styles.chevron}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </div>
            </div>

            {isOpen && (<div className={`${styles.dropdown} ${isTransitioning ? styles.slideIn : styles.slideOut}`}>
                    {statuses.map(status => (<div
                            key={status.value}
                            className={`${styles.option} ${currentStatus === status.value ? styles.selected : ""}`}
                            onClick={() => handleSelect(status.value)}>
                            <span className={`${styles.dot} ${styles[`dot_${status.value}`]}`}/>
                            {status.label}
                        </div>))}
                </div>)}
        </div>);
};

export default OrderStatusSelect;