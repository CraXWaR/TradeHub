import styles from "./SettingsPage.module.css";
import NiceSelect from "../../../components/User/UI/Select/NiceSelect.jsx";
import {useState} from "react";
import Button from "../../../components/User/UI/Button/Button.jsx";

const SettingsPage = () => {
    const [notifications, setNotifications] = useState("enabled");

    return (<section className={styles.page}>
        <header className={styles.header}>
            <h2 className={styles.title}>Settings</h2>
            <p className={styles.subtitle}>
                Update preferences and security.
            </p>
        </header>

        <form className={styles.card}>
            <div className={styles.field}>
                <label className={styles.label}>Email notifications</label>

                <NiceSelect
                    value={notifications}
                    onChange={setNotifications}
                    options={[{value: "enabled", label: "Enabled"}, {value: "disabled", label: "Disabled"},]}/>
            </div>

            <div className={styles.actions}>
                <Button type="submit" variant={"full"} size={"md"}>
                    Save settings
                </Button>
            </div>
        </form>
    </section>);
};

export default SettingsPage;
