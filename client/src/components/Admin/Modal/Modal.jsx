import {useEffect, useRef, Fragment} from 'react';
import {Transition} from '@headlessui/react';
import styles from './Modal.module.css';

export default function Modal({open, onClose, children, title}) {
    const dialogRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && onClose?.();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, onClose]);

    return (<Transition show={open} as={Fragment}>
            {/* Backdrop */}
            <div
                className={styles.backdrop}
                onClick={onClose}
                role="presentation">
                {/* Modal panel */}
                <Transition.Child
                    enter="transition duration-300 transform"
                    enterFrom="opacity-0 scale-90 translate-y-4"
                    enterTo="opacity-100 scale-100 translate-y-0"
                    leave="transition duration-200 transform"
                    leaveFrom="opacity-100 scale-100 translate-y-0"
                    leaveTo="opacity-0 scale-90 translate-y-4">
                    <div
                        className={styles.modal}
                        onClick={(e) => e.stopPropagation()}
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label={title || 'Dialog'}>
                        <div className={styles.header}>
                            {title && <h3 className={styles.title}>{title}</h3>}
                            <button
                                className={styles.close}
                                onClick={onClose}
                                aria-label="Close">
                                ×
                            </button>
                        </div>
                        <div className={styles.body}>{children}</div>
                    </div>
                </Transition.Child>
            </div>
        </Transition>);
}
