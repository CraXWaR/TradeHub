import {FiTrash2} from "react-icons/fi";
import style from "./CartItem.module.css";
import {useState} from "react";
import styles from "../ProductDetail/ProductInfo.module.css";
import Button from "../../User/UI/Button/Button.jsx";
import NiceSelect from "../../User/UI/Select/NiceSelect.jsx";

const MIN_QTY = 1;
const MAX_QTY = 10;

const BASE_URL = import.meta.env.VITE_API_URL || '';

export default function CartItem({item, onQtyChange, onRemove, onVariantChange, mode = "cart",}) {
    const {title, price, quantity, image, variants, id, selectedVariantId: initialSelected,} = item;

    const [selectedVariantId, setSelectedVariantId] = useState(initialSelected ?? null);
    const selectedVariant = variants?.find((variant) => variant.id === selectedVariantId) ?? null;
    const effectivePrice = selectedVariant?.price ?? price;

    const isCheckout = mode === "checkout";

    const qtyOptions = Array.from({length: MAX_QTY}, (_, i) => ({
        value: i + 1, label: (i + 1).toString()
    }));

    const onSelectChange = (val) => {
        const clamped = Math.max(MIN_QTY, Math.min(MAX_QTY, Number(val)));

        if (!onQtyChange) return;

        const productId = item.productId || item.product_id || item.id;
        const variantId = item.selectedVariantId ?? null;

        onQtyChange(productId, variantId, clamped);
    };

    const handleCartVariantClick = (variant) => {
        if (isCheckout) return;

        const oldVariantId = selectedVariantId;
        const newVariantId = variant.id;

        if (oldVariantId === newVariantId) {
            return;
        }

        setSelectedVariantId(newVariantId);

        if (onVariantChange) {
            onVariantChange(item.id, oldVariantId, newVariantId);
        }
    };

    return (<article className={style.item} role="listitem">
        {/* Media */}
        <figure className={style.media}>
            <img
                className={style.img}
                alt={title}
                src={`${BASE_URL}/uploads/${image}`}
                loading="lazy"/>
        </figure>

        {/* Content */}
        <div className={style.content}>
            <h3 className={style.title} title={title}>
                {title}
            </h3>

            {/* Product Variant */}
            {!isCheckout && variants?.length > 0 && (<div className={style["variants-list"]}>
                {variants.map((variant) => (<Button
                    key={variant.id}
                    type="button"
                    onClick={() => handleCartVariantClick(variant)}
                    variant={selectedVariant?.id === variant.id ? "full" : "empty"}
                    size="sm"
                    className={[styles["variant-pill"], selectedVariant?.id === variant.id ? styles["variant-pill--active"] : "",]
                        .filter(Boolean)
                        .join(" ")}>
                    {variant.name}
                </Button>))}
            </div>)}

            {isCheckout && selectedVariant && (<p className={style.variantReadOnly}>{selectedVariant.name}</p>)}

            <div className={style.bottom}>
                {/* CART: qty select / CHECKOUT: static qty */}
                {!isCheckout ? (<>
                    <label className={style.qtyLabel} htmlFor={`qty-${id}`}>
                        Qty
                    </label>
                    <div className={style.qtyWrap}>
                        <NiceSelect
                            options={qtyOptions}
                            value={quantity}
                            onChange={onSelectChange}
                        />
                    </div>
                </>) : (<span className={style.qtyStatic}>Qty {quantity}</span>)}

                <span className={style.unit}>€{effectivePrice.toFixed(2)}</span>
            </div>
        </div>

        {/* Right column: total + remove only in cart */}
        <div className={style.side}>
            <div className={style.totalCol}>
                <span className={style.totalLabel}>Total</span>
                <span className={style.total} aria-label="Item total">
                        €{(effectivePrice * quantity).toFixed(2)}
                    </span>
            </div>

            {!isCheckout && (<div className={style.actions}>
                <Button
                    variant={"empty"}
                    size={"sm"}
                    onClick={onRemove}
                    aria-label={`Remove ${title} from cart`}
                    title="Remove">
                    <FiTrash2 aria-hidden/>
                    <span className={style.removeText}>Remove</span>
                </Button>
            </div>)}
        </div>
    </article>);
}
