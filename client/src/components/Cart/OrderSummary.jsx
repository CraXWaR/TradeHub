import style from "./OrderSummary.module.css";

export default function OrderSummary({subtotal, shipping, tax, total}) {
    const isFreeShipping = shipping === 0;

    return (<section
            className={style.wrap}
            role="region"
            aria-labelledby="order-summary-title">

            <h2 className={style.h2} id="order-summary-title">
                Order Summary
            </h2>

            <dl className={style.list}>
                <div className={style.row}>
                    <dt className={style.label}>Subtotal</dt>
                    <dd className={style.value}>€{subtotal.toFixed(2)}</dd>
                </div>

                <div className={style.row}>
                    <dt className={style.label}>Shipping</dt>
                    <dd className={style.value}>
                        {isFreeShipping ? (
                            <span className={style.badgeFree} aria-label="Free shipping">Free</span>
                        ) : (<>€{shipping.toFixed(2)}</>)}
                    </dd>
                </div>

                <div className={style.row}>
                    <dt className={style.label}>Tax (est.)</dt>
                    <dd className={style.value}>€{tax.toFixed(2)}</dd>
                </div>

                <hr className={style.hr}/>

                <div className={style.rowTotal}>
                    <dt className={style.totalLabel}>Total</dt>
                    <dd className={style.totalValue}>€{total.toFixed(2)}</dd>
                </div>
            </dl>

            <p className={style.hint} aria-live="polite">
                Prices in EUR. Taxes shown are estimates and will be confirmed at
                checkout.
            </p>
        </section>);
}
