import styles from "./ProductActions.module.css";
import {useAddToWishlist} from "../../hooks/useAddToWishlist.js";

const ActionButtons = ({navigate, productId, initialInWishlist = false}) => {
    const {inWishlist, loading, message, addToWishlist} = useAddToWishlist(initialInWishlist);

    return (<div className={styles["action-buttons"]}>
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
            >
                ← Back to Products
            </button>

            <div className="inline-flex flex-col items-start gap-1">
                <button
                    onClick={() => addToWishlist(productId)}
                    disabled={loading || inWishlist}
                    className={inWishlist ? "px-6 py-3 rounded-lg border border-orange-500 text-white bg-orange-500 transition-colors disabled:opacity-70" : "px-6 py-3 rounded-lg border border-orange-300 text-orange-700 hover:bg-orange-100 transition-colors disabled:opacity-70"}
                    aria-pressed={inWishlist}
                    aria-label={inWishlist ? "Already in wishlist" : "Add to Wishlist"}
                >
                    {loading ? "Adding…" : inWishlist ? "In Wishlist ✓" : "Add to Wishlist"}
                </button>
            </div>

        {message?.text && (Array.isArray(message.text) ? (
            <ul className={`text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
                {message.text.map((t, i) => <li key={i}>{t}</li>)}
            </ul>) : (
            <span className={`text-sm ${message.type === "error" ? "text-red-600" : "text-green-600"}`}>
              {message.text}
            </span>))}

        </div>);
};

export default ActionButtons;