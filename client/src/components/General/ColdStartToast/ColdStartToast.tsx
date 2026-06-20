import { useEffect, useState } from "react";
import { LuInfo, LuX } from "react-icons/lu";

import styles from "./ColdStartToast.module.css";

const STORAGE_KEY = "cinelog_first_visit_dismissed";

export default function ColdStartToast() {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 600);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      localStorage.setItem(STORAGE_KEY, "true");
    }, 35);
  };

  if (!visible) return null;

  return (
    <div
      className={`${styles.toast} ${exiting ? styles.exit : styles.enter}`}
      role="status"
      aria-live="polite"
    >
      <div className={styles.iconWrap} aria-hidden="true">
        <LuInfo size={18} />
      </div>

      <div className={styles.body}>
        <p className={styles.label}>HEADS UP</p>
        <p className={styles.message}>
          Your first couple of requests may be a bit slow —{" "}
          <span className={styles.highlight}>
            we&apos;re waking up the database.
          </span>{" "}
          Things will snap into speed right after.
        </p>
      </div>

      <button
        className={styles.close}
        onClick={dismiss}
        aria-label="Dismiss notification"
      >
        <LuX size={14} />
      </button>
    </div>
  );
}
