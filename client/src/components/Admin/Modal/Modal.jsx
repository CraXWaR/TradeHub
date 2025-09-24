import { useEffect, useRef } from 'react';
import styles from './Modal.module.css';

export default function Modal({ open, onClose, children, title }) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && onClose?.();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    if (!open) return null;

    return (
        <div className={styles.backdrop} onClick={onClose} role="presentation">
            <div
                className={styles.modal}
                onClick={(e) => e.stopPropagation()}
                ref={dialogRef}
                role="dialog"
                aria-modal="true"
                aria-label={title || 'Dialog'}
            >
                <div className={styles.header}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    <button className={styles.close} onClick={onClose} aria-label="Close">×</button>
                </div>
                <div className={styles.body}>{children}</div>
            </div>
        </div>
    );
}
