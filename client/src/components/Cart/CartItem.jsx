import {FiTrash2} from "react-icons/fi";
import style from "./CartItem.module.css";
import {useState} from "react";

const MIN_QTY = 1;
const MAX_QTY = 10;

const BASE_URL = import.meta.env.VITE_API_URL;

export default function CartItem({item, onQtyChange, onRemove, onVariantChange, mode = "cart",}) {
    const {title, price, quantity, image, variants, id, selectedVariantId: initialSelected,} = item;

    const [selectedVariantId, setSelectedVariantId] = useState(initialSelected ?? null);
    const selectedVariant = variants?.find((variant) => variant.id === selectedVariantId) ?? null;
    const effectivePrice = selectedVariant?.price ?? price;

    const isCheckout = mode === "checkout";

    const onSelectChange = (e) => {
        const val = Number(e.target.value);
        const clamped = Math.max(MIN_QTY, Math.min(MAX_QTY, val));

        if (!onQtyChange) return;

        const variantKey = variants && variants.length > 0 ? selectedVariantId : undefined;

        onQtyChange(item.id, clamped, variantKey);
    };

    const handleCartVariantClick = (variant) => {
        if (isCheckout) return;

        const oldVariantId = selectedVariantId;
        const newVariantId = variant.id;

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

            {/* CART: variant buttons / CHECKOUT: static variant text */}
            {!isCheckout && variants?.length > 0 && (<div className={style["variants-list"]}>
                {variants.map((variant) => (<button
                    key={variant.id}
                    type="button"
                    onClick={() => handleCartVariantClick(variant)}
                    className={[style.variant, selectedVariantId === variant.id ? style["variant--active"] : "",]
                        .filter(Boolean)
                        .join(" ")}>
                    {variant.name}
                </button>))}
            </div>)}

            {isCheckout && selectedVariant && (<p className={style.variantReadOnly}>{selectedVariant.name}</p>)}

            <div className={style.bottom}>
                {/* CART: qty select / CHECKOUT: static qty */}
                {!isCheckout ? (<>
                    <label className={style.qtyLabel} htmlFor={`qty-${id}`}>
                        Qty
                    </label>
                    <div className={style.qtyWrap}>
                        <select
                            id={`qty-${id}`}
                            className={style.qtySelect}
                            value={quantity}
                            onChange={onSelectChange}
                            aria-label={`Quantity for ${title}`}>
                            {Array.from({length: MAX_QTY}, (_, i) => i + 1).map((n) => (<option key={n} value={n}>
                                {n}
                            </option>))}
                        </select>
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
                <button
                    type="button"
                    className={style.remove}
                    onClick={onRemove}
                    aria-label={`Remove ${title} from cart`}
                    title="Remove">
                    <FiTrash2 aria-hidden/>
                    <span className={style.removeText}>Remove</span>
                </button>
            </div>)}
        </div>
    </article>);
}
