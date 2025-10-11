//TODO CREATE UPDATE PROFILE FUNCTIONALITY

import styles from "./ProfileDetails.module.css";

const ProfileDetails = ({user}) => {
    const onSubmit = (e) => {
        e.preventDefault();
        // Future: call update API with only 'name' for now
        // const form = new FormData(e.currentTarget);
        // const payload = { name: form.get("name") };
    };

    return (
        <section className={`profile-card ${styles.card}`}>
            <h3 className={styles.title}>Account details</h3>

            <form className={styles.form} onSubmit={onSubmit}>
                <label className={styles.field}>
                    <span>Full name</span>
                    <input
                        name="name"
                        type="text"
                        defaultValue={user?.name ?? ""}
                        placeholder="Your full name"
                    />
                </label>

                <label className={styles.field}>
                    <span>Email</span>
                    <input type="email" value={user?.email ?? ""} disabled readOnly/>
                    <small className={styles.muted}>Email can’t be changed</small>
                </label>

                <div className={styles.actions}>
                    <button type="submit" className={styles.primaryBtn}>
                        Save changes
                    </button>
                </div>
            </form>
        </section>
    );
};

export default ProfileDetails;
