import styles from "./ProductActions.module.css";

import {useCartStore} from "../../contex/cart-context.jsx";

const ActionButtons = ({navigate, productId}) => {
    const { addToCart, isBusy: cartBusy } = useCartStore();

    return (<div className={styles["action-buttons"]}>
        <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300">
            ← Back to Products
        </button>

        <button
            onClick={() => addToCart(productId)}
            disabled={cartBusy}
            className={styles.cartButton}
            aria-busy={cartBusy}
        >
            {cartBusy ? "Adding…" : "Add to Cart"}
        </button>
    </div>);
};

export default ActionButtons;
