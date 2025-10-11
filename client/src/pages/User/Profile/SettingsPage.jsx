const UserSettingsPage = () => {
    const onSave = (e) => {
        e.preventDefault();
        // future: handle save
    };

    return (
        <div>
            <h2 className="text-lg font-semibold text-[var(--text-700)]">Settings</h2>
            <p className="text-sm text-[var(--text-500)] mt-1">
                Update preferences and security.
            </p>

            <form className="profile-card p-4 mt-4 grid gap-3" onSubmit={onSave}>
                <label className="grid gap-1">
                    <span className="text-xs text-[var(--text-500)]">Email notifications</span>
                    <select className="border border-[#ffd6b3] rounded-md p-2 bg-[var(--bg-0)]">
                        <option>Enabled</option>
                        <option>Disabled</option>
                    </select>
                </label>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-4 py-2 rounded-full border border-[#ffcfad] text-white font-semibold bg-gradient-to-r from-[var(--primary-500)] to-[var(--primary-600)] hover:shadow-md transition">
                        Save settings
                    </button>
                </div>
            </form>
        </div>
    );
};
export default UserSettingsPage;
