import {useState} from "react";

import ProductMeta from "./ProductMeta";
import ProductActions from "./ProductActions.jsx";

import {useWishlist} from "../../hooks/useWishlist.js";
import {Modal} from "../Modal.jsx";
import styles from "./ProductInfo.module.css";

import {FiHeart} from "react-icons/fi";
import {FaHeart} from "react-icons/fa";
import Button from "../User/UI/Button/Button.jsx";

const ProductInfo = ({product, navigate}) => {
    const {inWishlist, isBusy, message, dismissMessage, toggleWishlist,} = useWishlist(product.id);

    const [selectedVariant, setSelectedVariant] = useState(null);

    const activePrice = selectedVariant?.price ?? product.price;
    const formattedPrice = `$${Number(activePrice || 0).toFixed(2)}`;

    const handleVariantClick = (variant) => {
        setSelectedVariant((current) => current?.id === variant.id ? null : variant);
    };

    return (<div className={styles["product-info"]}>
        <div className="inline-flex flex-col items-end gap-1">
            <Button
                onClick={toggleWishlist}
                loading={isBusy}
                variant="full"
                size="icon"
                title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                aria-label={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                className={[
                    "p-2 rounded-full border transition-colors disabled:opacity-70 disabled:cursor-not-allowed disabled:pointer-events-none",
                    inWishlist
                        ? "border-orange-500 bg-orange-500 text-white"
                        : "border-orange-300 bg-white text-orange-600 hover:bg-orange-100",
                    isBusy ? "animate-bounce" : "",]
                    .filter(Boolean)
                    .join(" ")}>
                {inWishlist ? <FaHeart size={20}/> : <FiHeart size={20}/>}
            </Button>


            <Modal open={!!message?.text} onClose={dismissMessage}>
                <h2
                    className={["text-lg md:text-xl font-semibold tracking-wide mb-4", message?.type === "error" ? "text-red-700" : "text-green-700",].join(" ")}>
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

        {/* VARIANTS ABOVE PRICE */}
        {product.variants?.length > 0 && (<div className={styles["variants-wrapper"]}>
            <h3 className={styles["variants-title"]}>Available Variants</h3>

            <div className={styles["variants-list"]}>
                {product.variants.map((variant) => (<Button
                        key={variant.id}
                        type="button"
                        onClick={() => handleVariantClick(variant)}
                        variant={selectedVariant?.id === variant.id ? "full" : "empty"}
                        size="sm"
                        className={[styles["variant-pill"], selectedVariant?.id === variant.id ? styles["variant-pill--active"] : "",]
                            .filter(Boolean)
                            .join(" ")}>
                        {variant.name}
                    </Button>))}
            </div>

        </div>)}

        <p className={styles["product-price"]}>{formattedPrice}</p>

        <div className={styles["product-description"]}>
            <h3>Description</h3>
            <p>{product.description || "No description available."}</p>
        </div>

        <div className="mt-10">
            <ProductMeta createdAt={product.createdAt}/>
            <ProductActions
                navigate={navigate}
                productId={product.id}
                selectedVariant={selectedVariant}
                initialInWishlist={false}/>
        </div>
    </div>);
};

export default ProductInfo;
