import styles from "./ProfileSummary.module.css";

const ProfileSummary = ({user}) => {
    const name = user?.name || "User";
    const email = user?.email || "—";
    const role = user?.role || "user";
    const joined = user?.created_at
        ? new Date(user.created_at).toLocaleDateString()
        : "—";
    const updated = user?.updated_at
        ? new Date(user.updated_at).toLocaleDateString()
        : "—";

    return (
        <aside className={`profile-card ${styles.card}`}>
            <div className={styles.header}>
                <h2 className={styles.title}>Profile</h2>
                <span className={styles.role}>{role}</span>
            </div>

            <div className={styles.body}>
                <dl className={styles.rows}>
                    <div className={styles.row}>
                        <dt>Name</dt>
                        <dd>{name}</dd>
                    </div>
                    <div className={styles.row}>
                        <dt>Email</dt>
                        <dd className={styles.mono}>{email}</dd>
                    </div>
                    <div className={styles.row}>
                        <dt>Joined</dt>
                        <dd>{joined}</dd>
                    </div>
                    <div className={styles.row}>
                        <dt>Updated</dt>
                        <dd>{updated}</dd>
                    </div>
                    <div className={styles.row}>
                        <dt>Status</dt>
                        <dd><span className={styles.badge}>Active</span></dd>
                    </div>
                </dl>
            </div>
        </aside>
    );
};

export default ProfileSummary;
