const ActionButtons = ({navigate}) => (<div className="flex flex-wrap gap-4">
    <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
    >
        ← Back to Products
    </button>
    <button
        className="px-6 py-3 rounded-lg border border-orange-300 text-orange-700 hover:bg-orange-100 transition-colors">
        Add to Wishlist
    </button>
</div>);

export default ActionButtons;
