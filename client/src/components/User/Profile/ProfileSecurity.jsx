import styles from "./ProfileSecurity.module.css";
import Button from "../UI/Button/Button.jsx";

const ProfileSecurity = () => {
    const changePassword = () => {
        // future: open modal or navigate to /user/settings/security
    };

    return (
        <section className={`profile-card ${styles.card}`}>
            <div className={styles.header}>
                <h3 className={styles.title}>Security</h3>
                <p className={styles.subtitle}>Keep your account safe</p>
            </div>

            <div className={styles.row}>
                <Button type="button" variant={"empty"} size={"md"} onClick={changePassword}>
                    Change password
                </Button>
            </div>
        </section>
    );
};

export default ProfileSecurity;
