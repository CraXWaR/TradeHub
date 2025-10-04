import styles from "./ProductActions.module.css";
import {useAddToWishlist} from "../../hooks/useAddToWishlist.js";
import {Modal} from "../Modal.jsx";

const ActionButtons = ({navigate, productId}) => {
    const {
        inWishlist, loading, initLoading, message, addToWishlist, dismissMessage,
    } = useAddToWishlist(productId);

    const isBusy = initLoading || loading;

    return (<div className={styles["action-buttons"]}>
        <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
        >
            ← Back to Products
        </button>

        <div className="inline-flex flex-col items-start gap-1">
            <button
                onClick={addToWishlist}
                disabled={isBusy || inWishlist}
                className={inWishlist ? "px-6 py-3 rounded-lg border border-orange-500 text-white bg-orange-500 transition-colors disabled:opacity-70" : "px-6 py-3 rounded-lg border border-orange-300 text-orange-700 hover:bg-orange-100 transition-colors disabled:opacity-70"}
                aria-pressed={inWishlist}
                aria-busy={isBusy}
            >
                {initLoading ? "Loading…" : loading ? "Adding…" : inWishlist ? "In Wishlist ✓" : "Add to Wishlist"}
            </button>

            <Modal
                open={!!message?.text}
                onClose={dismissMessage}
            >
                <h2
                    className={["text-lg md:text-xl font-semibold tracking-wide mb-4", message?.type === "error" ? "text-red-700" : "text-green-700",].join(" ")}
                >
                    {message?.type === "error" ? "Something went wrong" : "Success"}
                </h2>

                {Array.isArray(message?.text) ? (
                    <ul className="text-base md:text-lg leading-relaxed text-gray-800 font-medium list-disc pl-6">
                        {message.text.map((t, i) => (<li key={i}>{t}</li>))}
                    </ul>) : (<p className="text-base md:text-lg leading-relaxed text-gray-800 font-medium">
                    {message?.text}
                </p>)}
            </Modal>
        </div>
    </div>);
};

export default ActionButtons;
