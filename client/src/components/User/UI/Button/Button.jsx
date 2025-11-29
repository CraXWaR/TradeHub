import {Link} from "react-router-dom";
import styles from "./Button.module.css";

export default function Button({
                                   to,
                                   children,
                                   loading = false,
                                   type = "button",
                                   variant = "full",
                                   size = "lg",
                                   ...props
                               }) {
    const className = `${styles.base} ${styles[variant]} ${styles[size]} ${loading ? styles.loading : ""} `.trim();

    if (to) {
        return (<Link to={to} className={className} {...props}>
            {children}
        </Link>);
    }

    return (<button
        type={type}
        disabled={loading}
        className={className}
        {...props}>
        {loading && <div className={styles.spinner}></div>}
        {children}
    </button>);
}
