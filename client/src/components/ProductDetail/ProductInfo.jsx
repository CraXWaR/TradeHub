import ProductMeta from "./ProductMeta";
import ProductActions from "./ProductActions.jsx";

import {useWishlist} from "../../hooks/useWishlist.js";
import {Modal} from "../Modal.jsx";
import styles from "./ProductInfo.module.css";

import {FiHeart} from "react-icons/fi";
import {FaHeart} from "react-icons/fa";

const ProductInfo = ({product, navigate}) => {
    const {inWishlist, isBusy, message, dismissMessage, toggleWishlist,} = useWishlist(product.id);

    return (
        <div className={styles["product-info"]}>
            <div className="inline-flex flex-col items-end gap-1">
                <button
                    onClick={toggleWishlist}
                    disabled={isBusy}
                    title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                    aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                    className={`p-2 rounded-full border transition-colors disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none
                    ${inWishlist
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-orange-300 bg-white text-orange-600 hover:bg-orange-100"}
                        ${isBusy ? "animate-bounce" : ""}`}>
                    {inWishlist ? <FaHeart size={20} /> : <FiHeart size={20} />}
                </button>

                <Modal
                    open={!!message?.text}
                    onClose={dismissMessage}>
                    <h2 className={["text-lg md:text-xl font-semibold tracking-wide mb-4", message?.type === "error" ? "text-red-700" : "text-green-700",].join(" ")}>
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

            <div className="flex justify-between items-start mb-4">
                <h1 className={styles["product-title"]}>{product.title}</h1>
            </div>

            <p className={styles["product-price"]}>
                ${Number(product.price || 0).toFixed(2)}
            </p>

            <div className={styles["product-description"]}>
                <h3>Description</h3>
                <p>{product.description || "No description available."}</p>
            </div>

            <div className="mt-10">
                <ProductMeta createdAt={product.createdAt}/>
                <ProductActions navigate={navigate} productId={product.id} initialInWishlist={false}/>
            </div>
        </div>
    );
};

export default ProductInfo;
