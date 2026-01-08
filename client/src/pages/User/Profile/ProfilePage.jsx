import ProfileSummary from "../../../components/User/Profile/ProfileSummary.jsx";
import ProfileDetails from "../../../components/User/Profile/ProfileDetails.jsx";
import ProfileSecurity from "../../../components/User/Profile/ProfileSecurity.jsx";

import styles from "./ProfilePage.module.css";
import useAuth from "../../../hooks/auth/useAuth.js";

const ProfilePage = () => {
    const {user, loading} = useAuth();

    if (loading) return <div className={styles.loading}>Loading profile…</div>;
    if (!user) return <div className={styles.empty}>No user data available.</div>;

    return (<section className={styles.wrapper}>
            <div className={styles.grid}>
                <ProfileSummary user={user}/>
                <div className={styles.stack}>
                    <ProfileDetails user={user}/>
                    <ProfileSecurity/>
                </div>
            </div>
        </section>);
};

export default ProfilePage;
