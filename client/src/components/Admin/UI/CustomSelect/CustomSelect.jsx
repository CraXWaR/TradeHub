import {useEffect, useRef, useState} from "react";
import styles from "./CustomSelect.module.css";

export const CustomSelect = ({options, value, onChange}) => {
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

    const selectedOption = options.find(option => option.value === value);

    return (
        <div className={styles.container} ref={ref}>
            <div
                className={`${styles.selectTrigger} ${isOpen ? styles.active : ""}`}
                onClick={toggleMenu}>
                <span className={styles.statusText}>{selectedOption?.label}</span>
                <div className={styles.chevron}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M6 9l6 6 6-6"/>
                    </svg>
                </div>
            </div>

            {isOpen && (
                <div className={`${styles.dropdown} ${isTransitioning ? styles.slideIn : styles.slideOut}`}>
                    {options.map(option => (
                        <div
                            key={option.value}
                            className={`${styles.option} ${value === option.value ? styles.selected : ""}`}
                            onClick={() => handleSelect(option.value)}>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};