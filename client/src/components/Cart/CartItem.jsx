import {FiTrash2} from "react-icons/fi";
import style from "./CartItem.module.css";

const MIN_QTY = 1;
const MAX_QTY = 10;

const BASE_URL = import.meta.env.VITE_API_URL;

export default function CartItem({item, onQtyChange, onRemove}) {
    const {title, price, quantity, image, variant, id} = item;

    const onSelectChange = (e) => {
        const val = Number(e.target.value);
        onQtyChange(id, Math.max(MIN_QTY, Math.min(MAX_QTY, val)));
    };

    return (<article className={style.item} role="listitem">
        {/* Media */}
        <figure className={style.media}>
            <img className={style.img} alt={title} src={`${BASE_URL}/uploads/${image}`} loading="lazy"/>
        </figure>

        {/* Content */}
        <div className={style.content}>
            <h3 className={style.title} title={title}>{title}</h3>
            {variant && <span className={style.variant}>{variant}</span>}

            <div className={style.bottom}>
                {/* Quantity dropdown */}
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
                        {Array.from({length: MAX_QTY}, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n}</option>))}
                    </select>
                </div>

                <span className={style.unit}>€{price.toFixed(2)}</span>
            </div>
        </div>

        {/* Right column: total + bottom-right remove */}
        <div className={style.side}>
            <div className={style.totalCol}>
                <span className={style.totalLabel}>Total</span>
                <span className={style.total} aria-label="Item total">
                        €{(price * quantity).toFixed(2)}
                    </span>
            </div>

            <div className={style.actions}>
                <button
                    type="button"
                    className={style.remove}
                    onClick={onRemove}
                    aria-label={`Remove ${title} from cart`}
                    title="Remove">
                    <FiTrash2 aria-hidden/>
                    <span className={style.removeText}>Remove</span>
                </button>
            </div>
        </div>
    </article>);
}
