import {useEffect, useState, useTransition} from "react";

import styles from "./ProfileDetails.module.css";
import useAuth from "../../../hooks/auth/useAuth.js";
import Button from "../UI/Button/Button.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;

const ProfileDetails = () => {
    const {user, setUser, refreshUser} = useAuth();
    const [status, setStatus] = useState({loading: false, error: "", ok: ""});
    const [isPending, startTransition] = useTransition();

    const [name, setName] = useState(user?.name ?? "");
    useEffect(() => {
        setName(user?.name ?? "");
    }, [user?.name]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setStatus({loading: true, error: "", ok: ""});

        const payload = {name: (name || "").trim()};
        if (!payload.name) {
            setStatus({loading: false, error: "Name is required.", ok: ""});
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/api/users/me`, {
                method: "PATCH", headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, body: JSON.stringify(payload),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data?.message || "Failed to update profile");

            startTransition(() => {
                setUser((u) => ({...u, name: payload.name}));
            });

            await refreshUser();

            setStatus({loading: false, error: "", ok: "Saved!"});
        } catch (err) {
            setStatus({
                loading: false, error: err?.message || "Something went wrong", ok: "",
            });
        }
    };

    return (<section className={`profile-card ${styles.card}`}>
        <h3 className={styles.title}>Account details</h3>

        <form className={styles.form} onSubmit={onSubmit}>
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
