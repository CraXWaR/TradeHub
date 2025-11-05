import {FiTrash2} from "react-icons/fi";
import style from "./CartItem.module.css";

export default function CartItem({item, onQtyChange, onRemove}) {
    const {title, price, quantity, image, variant, id} = item;

    return (
        <article className={style.item} role="listitem">
            <figure className={style.imageWrap}>
                <img alt={title} src={image} className={style.image} loading="lazy"/>
            </figure>

            <div className={style.info}>
                <h3 className={style.title} title={title}>
                    {title}
                </h3>
                <p className={style.variant}>{variant}</p>

                <div className={style.controls}>
                    <label className={style.qtyLabel} htmlFor={`${id}-qty`}>
                        Qty
                    </label>
                    <select
                        id={`${id}-qty`}
                        value={quantity}
                        onChange={(e) => onQtyChange(id, Number(e.target.value))}
                        className={style.select}
                        aria-label={`Quantity for ${title}`}
                    >
                        {Array.from({length: 10}, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>
                                {n}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={style.right}>
        <span className={style.price} aria-label="Item total price">
          €{(price * quantity).toFixed(2)}
        </span>
                <button onClick={onRemove} className={style.removeBtn} type="button">
                    <FiTrash2 aria-hidden/> <span>Remove</span>
                </button>
            </div>
        </article>
    );
}
