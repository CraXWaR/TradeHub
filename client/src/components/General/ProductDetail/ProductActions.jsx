import styles from "./ProductActions.module.css";

import {useCartStore} from "../../../contex/cart-context.jsx";
import {Modal} from "../Modal.jsx";
import Button from "../../User/UI/Button/Button.jsx";

const ActionButtons = ({navigate, productId, selectedVariant}) => {
    const {addToCart, isBusy: cartBusy, message: cartMessage, dismissMessage: dismissCartMessage} = useCartStore();

    return (<div className={styles["action-buttons"]}>
        <Button
            onClick={() => navigate(-1)} size={'md'}>
            ← Back to Products
        </Button>

        <Button
            onClick={() => addToCart(productId, selectedVariant)}
            disabled={cartBusy}
            aria-busy={cartBusy}
            size={'md'}
            variant={'cart'}>
            {cartBusy ? "Adding…" : "Add to Cart"}
        </Button>

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
