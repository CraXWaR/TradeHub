import styles from "./ProductActions.module.css";

import {useCartStore} from "../../contex/cart-context.jsx";
import {Modal} from "../Modal.jsx";

const ActionButtons = ({navigate, productId, selectedVariant}) => {
    const {addToCart, isBusy: cartBusy, message: cartMessage, dismissMessage: dismissCartMessage} = useCartStore();

    return (<div className={styles["action-buttons"]}>
        <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
            ← Back to Products
        </button>

        <button
            onClick={() => addToCart(productId, selectedVariant)}
            disabled={cartBusy}
            className={styles.cartButton}
            aria-busy={cartBusy}>
            {cartBusy ? "Adding…" : "Add to Cart"}
        </button>

        <Modal open={!!cartMessage?.text} onClose={dismissCartMessage}>
            <h2
                className={["text-lg md:text-xl font-semibold tracking-wide mb-4", cartMessage?.type === "error" ? "text-red-700" : "text-green-700",].join(" ")}>
                {cartMessage?.type === "error" ? "Something went wrong" : "Success"}
            </h2>

            {Array.isArray(cartMessage?.text) ? (
                <ul className="text-base md:text-lg leading-relaxed text-gray-800 font-medium list-disc pl-6">
                    {cartMessage.text.map((t, i) => (<li key={i}>{t}</li>))}
                </ul>) : (<p className="text-base md:text-lg leading-relaxed text-gray-800 font-medium">
                    {cartMessage?.text}
                </p>)}
        </Modal>
    </div>);
};

export default ActionButtons;
