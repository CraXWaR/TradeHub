import style from "./OrderSummary.module.css";
import CartItem from "./CartItem.jsx";

export default function OrderSummary({subtotal, shipping, tax, total, items = [], giftWrap}) {
    const safeSubtotal = Number(subtotal) || 0;
    const safeShipping = Number(shipping) || 0;
    const safeTax = Number(tax) || 0;
    const safeTotal = Number(total) || 0;

    const isFreeShipping = safeShipping === 0;

    return (<section
        className={style.wrap}
        role="region"
        aria-labelledby="order-summary-title">
        <h2 className={style.h2} id="order-summary-title">
            Order Summary
        </h2>

        {items.length > 0 && (<section className={style.itemsSection}>
            <div
                className={style.itemsList}
                role="list"
                aria-label="Items in your order">
                {items.map((item) => (<CartItem
                    key={item.id}
                    item={item}
                    mode="checkout"
                />))}
            </div>
        </section>)}

        <dl className={style.list}>
            <div className={style.row}>
                <dt className={style.label}>Subtotal</dt>
                <dd className={style.value}>€{safeSubtotal.toFixed(2)}</dd>
            </div>

            <div className={style.row}>
                <dt className={style.label}>Shipping</dt>
                <dd className={style.value}>
                    {isFreeShipping ? (<span
                        className={style.badgeFree}
                        aria-label="Free shipping">
                        Free
                    </span>) : (<>€{safeShipping.toFixed(2)}</>)}
                </dd>
            </div>

            {giftWrap && (<>
                <div className={style.row}>
                    <dt className={style.label}>Gift Wrap</dt>
                    <dd className={style.value}>€4.00</dd>
                </div>
            </>)}

            <div className={style.row}>
                <dt className={style.label}>Tax (est.)</dt>
                <dd className={style.value}>€{safeTax.toFixed(2)}</dd>
            </div>

            <hr className={style.hr}/>

            <div className={style.rowTotal}>
                <dt className={style.totalLabel}>Total</dt>
                <dd className={style.totalValue}>€{safeTotal.toFixed(2)}</dd>
            </div>
        </dl>

        <p className={style.hint} aria-live="polite">
            Prices in EUR. Taxes shown are estimates and will be confirmed at
            checkout.
        </p>
    </section>);
}
