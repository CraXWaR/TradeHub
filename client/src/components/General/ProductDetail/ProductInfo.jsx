import {useState} from "react";

import ProductMeta from "./ProductMeta.jsx";
import ProductActions from "./ProductActions.jsx";

import styles from "./ProductInfo.module.css";

import Button from "../../User/UI/Button/Button.jsx";
import {AddToWishlist} from "../../User/Wishlist/AddToWishlist.jsx";

export const ProductInfo = ({product, navigate}) => {
    const [selectedVariant, setSelectedVariant] = useState(null);

    const activePrice = selectedVariant?.price ?? product.price;
    const formattedPrice = `$${Number(activePrice || 0).toFixed(2)}`;

    const handleVariantClick = (variant) => {
        setSelectedVariant((current) => current?.id === variant.id ? null : variant);
    };

    return (<div className={styles["product-info"]}>
        <div className={`${styles.desktopOnly} inline-flex flex-col items-end gap-1`}>
            <AddToWishlist id={product.id} />
        </div>

        <div className={`${styles.desktopOnly} flex justify-between items-start mb-4`}>
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