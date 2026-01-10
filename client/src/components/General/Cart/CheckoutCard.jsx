import {Link} from "react-router-dom";
import {FiGift, FiLock} from "react-icons/fi";
import OrderSummary from "./OrderSummary.jsx";

import styles from "./CheckoutCard.module.css";
import Button from "../../User/UI/Button/Button.jsx";

export function CheckoutCard({
                                 subtotal,
                                 shipping,
                                 tax,
                                 total,
                                 hasItems,
                                 promo,
                                 setPromo,
                                 applyGiftWrap,
                                 setApplyGiftWrap,
                                 items
                             }) {
    return (<div className={styles.card}>
        {/* Promo input */}
        <form
            className={styles.promoForm}
            onSubmit={(e) => e.preventDefault()}
            aria-label="Apply a promo code">
            <label className={styles.promoLabel} htmlFor="promo">
                Promo code
            </label>

            <div className={styles.promoField}>
                <input
                    id="promo"
                    className={styles.promoInput}
                    placeholder="ENTER CODE"
                    value={promo}
                    onChange={(e) => setPromo(e.target.value.toUpperCase())}
                    inputMode="text"
                    autoComplete="off"
                    enterKeyHint="done"/>

                <Button
                    type="submit"
                    variant={"contained"}
                    size={"sm"}
                    disabled={!promo.trim()}
                    aria-disabled={!promo.trim()}>
                    Apply
                </Button>
            </div>
        </form>

        {/* Gift wrap */}
        <label className={styles.gift} htmlFor="gift-wrap">
            <input
                id="gift-wrap"
                type="checkbox"
                className={styles.giftInput}
                checked={applyGiftWrap}
                onChange={(e) => setApplyGiftWrap(e.target.checked)}/>

            <span className={styles.giftBox}>
                <span className={styles.giftIcon} aria-hidden>
                    <FiGift/>
                </span>

              <span className={styles.giftText}>
                  Add gift wrap <em className={styles.giftPrice}>+ €4.00</em>
              </span>

              <span className={styles.giftSwitch} aria-hidden>
                  <span className={styles.giftKnob}/>
              </span>
            </span>
        </label>

        <OrderSummary
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}/>

        <Button
            to="/checkout"
            variant={"full"}
            size={"lg"}
            className={styles.checkoutBtn}
            state={{subtotal, shipping, tax, total, items, applyGiftWrap}}
            aria-disabled={!hasItems}
            onClick={(e) => {
                if (!hasItems) e.preventDefault();
            }}>
            Checkout
        </Button>

        <div className={styles.secureRow} aria-live="polite">
            <FiLock aria-hidden/>
            <span>Secure checkout • 256-bit encryption</span>
        </div>

        <p className={styles.terms}>
            By checking out you agree to our{" "}
            <Link to="/TODO" className={styles.link}>
                Terms &amp; Conditions.
            </Link>
        </p>
    </div>);
}