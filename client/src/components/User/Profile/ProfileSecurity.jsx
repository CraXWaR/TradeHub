import styles from "./ProfileSecurity.module.css";

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
                <button type="button" className={styles.ghostBtn} onClick={changePassword}>
                    Change password
                </button>
            </div>
        </section>
    );
};

export default ProfileSecurity;
