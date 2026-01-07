import Button from "../UI/Button/Button.jsx";
import {useUpdateProfile} from "../../../hooks/profile/useUpdateProfile.js";
import useAuth from "../../../hooks/auth/useAuth.js";

import styles from "./ProfileDetails.module.css";

const ProfileDetails = () => {
    const {user} = useAuth();
    const {name, setName, status, updateName, isPending} = useUpdateProfile();

    const handleSubmit = (e) => {
        e.preventDefault();
        updateName(name);
    };

    return (<section className={`profile-card ${styles.card}`}>
        <h3 className={styles.title}>Account details</h3>

        <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.field}>
                <span>Full name</span>
                <input
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    disabled={status.loading || isPending}
                />
            </label>

            <label className={styles.field}>
                <span>Email</span>
                <input type="email" value={user?.email ?? ""} disabled readOnly/>
                <small className={styles.muted}>Email can’t be changed</small>
            </label>

            <div className={styles.actions}>
                <Button
                    type="submit"
                    variant={"full"}
                    size={"md"}
                    disabled={status.loading || isPending}>
                    {status.loading ? "Saving..." : "Save changes"}
                </Button>
            </div>

            {status.error && <p className={styles.error}>{status.error}</p>}
            {status.ok && <p className={styles.success}>{status.ok}</p>}
        </form>
    </section>);
};

export default ProfileDetails;
