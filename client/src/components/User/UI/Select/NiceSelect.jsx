import {useState, useRef, useEffect} from "react";
import styles from "./NiceSelect.module.css";

const NiceSelect = ({options = [], value, onChange}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const currentLabel = options.find((o) => o.value === value)?.label || "Select…";

    return (<div className={styles.wrapper} ref={ref}>
            <button
                type="button"
                className={`${styles.trigger} ${open ? styles.triggerOpen : ""}`}
                onClick={() => setOpen((o) => !o)}
            >
                {currentLabel}
                <span className={styles.icon}/>
            </button>

            {open && (<div className={styles.menu}>
                    {options.map((opt) => (<button
                            key={opt.value}
                            className={styles.item}
                            onClick={() => {
                                onChange(opt.value);
                                setOpen(false);
                            }}
                        >
                            {opt.label}
                        </button>))}
                </div>)}
        </div>);
};

export default NiceSelect;
