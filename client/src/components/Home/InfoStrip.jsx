import styles from "./InfoStrip.module.css";
import {FiTruck, FiLock, FiRefreshCcw} from "react-icons/fi";

const items = [{
    icon: <FiTruck/>, title: "Fast Shipping", text: "Orders ship within 24–48 hours",
}, {
    icon: <FiLock/>, title: "Secure Payments", text: "Encrypted and trusted checkout",
}, {
    icon: <FiRefreshCcw/>, title: "Easy Returns", text: "30-day return policy",
},];

export default function InfoStrip() {
    return (<section className={styles.strip}>
            <div className={styles.container}>
                {items.map((item) => (<div key={item.title} className={styles.item}>
                        <div className={styles.icon}>{item.icon}</div>
                        <div>
                            <h4 className={styles.title}>{item.title}</h4>
                            <p className={styles.text}>{item.text}</p>
                        </div>
                    </div>))}
            </div>
        </section>);
}