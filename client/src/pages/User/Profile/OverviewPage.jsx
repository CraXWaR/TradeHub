import {useEffect, useState} from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

const UserOverviewPage = () => {
    const [wlCount, setWlCount] = useState(0);
    const [loadingWl, setLoadingWl] = useState(true);

    const token = localStorage.getItem("token") || "";

    useEffect(() => {
        let cancelled = false;

        const loadWishlistCount = async () => {
            try {
                const res = await fetch(`${BASE_URL}/user/wishlist`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                const data = await res.json().catch(() => ({}));
                if (!cancelled && res.ok && Array.isArray(data.items)) {
                    setWlCount(data.items.length);
                }
            } catch {
                if (!cancelled) setWlCount(0);
            } finally {
                if (!cancelled) setLoadingWl(false);
            }
        };

        if (token) loadWishlistCount();
        else {
            setWlCount(0);
            setLoadingWl(false);
        }

        return () => {
            cancelled = true;
        };
    }, [token]);

    return (
        <div>
            <h2 className="text-lg font-semibold text-[var(--text-700)]">Overview</h2>
            <p className="text-sm text-[var(--text-500)] mt-1">Quick glance at your recent activity.</p>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="profile-card p-4">
                    <h3 className="font-semibold text-[var(--text-700)]">Orders</h3>
                    <p className="text-sm text-[var(--text-500)]">You have 0 recent orders.</p>
                </div>

                <div className="profile-card p-4">
                    <h3 className="font-semibold text-[var(--text-700)]">Wishlist</h3>
                    <p className="text-sm text-[var(--text-500)]">
                        {loadingWl ? "Loading…" : wlCount === 0 ? "No items saved yet." : `Total items: ${wlCount}`}
                    </p>
                </div>

                <div className="profile-card p-4">
                    <h3 className="font-semibold text-[var(--text-700)]">Account</h3>
                    <p className="text-sm text-[var(--text-500)]">Everything looks good.</p>
                </div>
            </div>
        </div>
    );
};

export default UserOverviewPage;
