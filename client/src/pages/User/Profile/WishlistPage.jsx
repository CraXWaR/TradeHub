const UserWishlistPage = () => {
    return (
        <div>
            <h2 className="text-lg font-semibold text-[var(--text-700)]">Wishlist</h2>
            <p className="text-sm text-[var(--text-500)] mt-1">
                Items you’ve saved for later.
            </p>

            <div className="profile-card p-4 mt-4">
                <p className="text-sm text-[var(--text-500)]">Your wishlist is empty.</p>
            </div>
        </div>
    );
};
export default UserWishlistPage;
