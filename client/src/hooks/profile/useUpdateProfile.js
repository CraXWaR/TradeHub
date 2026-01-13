import {useState, useEffect, useTransition} from 'react';
import useAuth from "../auth/useAuth.js";

const BASE_URL = import.meta.env.VITE_API_URL || '';

export const useUpdateProfile = () => {
    const {user, setUser, refreshUser} = useAuth();
    const [status, setStatus] = useState({loading: false, error: "", ok: ""});
    const [isPending, startTransition] = useTransition();
    const [name, setName] = useState(user?.name ?? "");

    useEffect(() => {
        setName(user?.name ?? "");
    }, [user?.name]);

    const updateName = async (newName) => {
        setStatus({loading: true, error: "", ok: ""});

        const trimmedName = (newName || "").trim();
        if (!trimmedName) {
            setStatus({loading: false, error: "Name is required.", ok: ""});
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/api/users/me`, {
                method: "PATCH", headers: {
                    "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}`,
                }, body: JSON.stringify({name: trimmedName}),
            });

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data?.message || "Failed to update profile");

            startTransition(() => {
                setUser((u) => ({...u, name: trimmedName}));
            });

            await refreshUser();
            setStatus({loading: false, error: "", ok: "Saved!"});
        } catch (err) {
            setStatus({
                loading: false, error: err?.message || "Something went wrong", ok: "",
            });
        }
    };

    return {
        name, setName, status, updateName, isPending
    };
};