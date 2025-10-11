const UserOrdersPage = () => {
    return (
        <div>
            <h2 className="text-lg font-semibold text-[var(--text-700)]">Orders</h2>
            <p className="text-sm text-[var(--text-500)] mt-1">
                Track and manage your orders.
            </p>

            <div className="profile-card p-4 mt-4">
                <p className="text-sm text-[var(--text-500)]">No orders yet.</p>
            </div>
        </div>
    );
};
export default UserOrdersPage;
