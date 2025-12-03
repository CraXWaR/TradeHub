import {Link} from "react-router-dom";
import styles from "./Button.module.css";

export default function Button({
                                   to,
                                   children,
                                   loading = false,
                                   type = "button",
                                   variant = "full",
                                   size = "lg",
                                   className = "",
                                   ...props
                               }) {
    const composedClassName = [styles.base, styles[variant], styles[size], loading ? styles.loading : "", className,]
        .filter(Boolean)
        .join(" ");

    if (to) {
        return (<Link to={to} className={composedClassName} {...props}>
            {children}
        </Link>);
    }

    return (<button
        type={type}
        disabled={loading}
        className={composedClassName}
        {...props}>
        {loading && <div className={styles.spinner}></div>}
        {children}
    </button>);
}
