import style from "./OrderSummary.module.css";

export default function OrderSummary({subtotal, shipping, tax, total}) {
    return (
        <div className={style.card} role="region" aria-labelledby="order-summary-title">
            <h2 className={style.h2} id="order-summary-title">Order Summary</h2>

            <dl className={style.list}>
                <div className={style.row}>
                    <dt className={style.muted}>Subtotal</dt>
                    <dd className={style.value}>€{subtotal.toFixed(2)}</dd>
                </div>

                <div className={style.row}>
                    <dt className={style.muted}>Shipping</dt>
                    <dd className={style.value}>{shipping === 0 ? "Free" : `€${shipping.toFixed(2)}`}</dd>
                </div>

                <div className={style.row}>
                    <dt className={style.muted}>Tax (est.)</dt>
                    <dd className={style.value}>€{tax.toFixed(2)}</dd>
                </div>

                <hr className={style.hr}/>

                <div className={style.rowTotal}>
                    <dt className={style.totalLabel}>Total</dt>
                    <dd className={style.totalValue}>€{total.toFixed(2)}</dd>
                </div>
            </dl>

            <form
                className={style.promoWrap}
                onSubmit={(e) => e.preventDefault()}
                aria-label="Promo code"
            >
                <label className={style.label} htmlFor="promo-input">
                    Promo code
                </label>
                <div className={style.promoControls}>
                    <input className={style.input} id="promo-input" type="text" placeholder="SUMMER10"/>
                    <button className={style.applyBtn} type="submit">
                        Apply
                    </button>
                </div>
            </form>
        </div>
    );
}
