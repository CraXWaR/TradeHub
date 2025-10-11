const UserOverviewPage = () => {
    return (
        <div>
            <h2 className="text-lg font-semibold text-[var(--text-700)]">Overview</h2>
            <p className="text-sm text-[var(--text-500)] mt-1">
                Quick glance at your recent activity.
            </p>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
                <div className="profile-card p-4">
                    <h3 className="font-semibold text-[var(--text-700)]">Orders</h3>
                    <p className="text-sm text-[var(--text-500)]">You have 0 recent orders.</p>
                </div>
                <div className="profile-card p-4">
                    <h3 className="font-semibold text-[var(--text-700)]">Wishlist</h3>
                    <p className="text-sm text-[var(--text-500)]">No items saved yet.</p>
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
