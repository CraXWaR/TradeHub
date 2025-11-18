import {useEffect, useMemo, useState} from "react";
import {useCartStore} from "../../contex/cart-context.jsx";
import {Link} from "react-router-dom";

import {FiShoppingCart, FiTrash2, FiLock, FiArrowLeft, FiGift, FiHelpCircle} from "react-icons/fi";
import EmptyCart from "../../components/Cart/EmptyCart.jsx";
import CartItem from "../../components/Cart/CartItem.jsx";
import OrderSummary from "../../components/Cart/OrderSummary.jsx";

import styles from "./CartPage.module.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const FREE_SHIPPING_THRESHOLD = 50;
const SHIPPING_FEE = 4.99;
const TAX_RATE = 0.1;

export default function CartPage() {
    const {cartItems, removeFromCart, clearCart, cartCount} = useCartStore();

    const [items, setItems] = useState([]);
    const [promo, setPromo] = useState("");
    const [applyGiftWrap, setApplyGiftWrap] = useState(false);

    useEffect(() => {
        if (!cartItems || cartItems.length === 0) {
            setItems([]);
            return;
        }

        const controller = new AbortController();
        const idsParam = cartItems.join(",");

        async function loadCartProducts() {
            try {
                const res = await fetch(
                    `${BASE_URL}/api/cart?ids=${idsParam}`,
                    {
                        headers: {Accept: "application/json"},
                        signal: controller.signal,
                    }
                );

                if (!res.ok) {
                    throw new Error("Failed to load cart products");
                }

                const data = await res.json();

                setItems(
                    data.map((p) => ({
                        ...p,
                        quantity: p.quantity != null ? p.quantity : 1,
                    }))
                );
            } catch (err) {
                if (err.name === "AbortError") return;
                console.error(err);
                setItems([]);
            }
        }

        loadCartProducts();

        return () => controller.abort();
    }, [cartItems]);

    const handleQtyChange = (id, qty) => {
        setItems((prev) =>
            prev.map((it) => (it.id === id ? {...it, quantity: qty} : it))
        );
    };

    // remove from UI + from cart storage
    const handleRemove = (id) => {
        setItems((prev) => prev.filter((it) => it.id !== id));
        removeFromCart(id);
    };

    const {subtotal, shipping, tax, total} = useMemo(() => {
        const s = items.reduce(
            (acc, it) => acc + it.price * (it.quantity || 1),
            0
        );
        const sh = s === 0 || s >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
        const tx = +(s * TAX_RATE).toFixed(2);
        const tt = +(s + sh + tx + (applyGiftWrap ? 4 : 0)).toFixed(2);

        return {
            subtotal: +s.toFixed(2),
            shipping: sh,
            tax: tx,
            total: tt,
        };
    }, [items, applyGiftWrap]);

    const clearAll = () => {
        setItems([]);
        clearCart();
    };

    const progress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);
    const hasItems = items.length > 0;

    return (
        <main className={styles.main}>
            <div className={styles.wrap}>
                {/* Top utility bar */}
                <div className={styles.topbar}>
                    <Link to="/products" className={styles.topLink}>
                        <FiArrowLeft aria-hidden/> Continue shopping
                    </Link>

                    <div className={styles.topSupport}>
                        <FiHelpCircle aria-hidden/>
                        <Link to="/help" className={styles.helpLink}>Need help?</Link>
                    </div>
                </div>

                {/* Page header */}
                <header className={styles.header} aria-live="polite">
                    <div className={styles.headerLeft}>
                        <span className={styles.cartBadge} aria-hidden>
                          <FiShoppingCart/>
                        </span>
                        <div className={styles.headerText}>
                            <h1 className={styles.title}>Your Cart</h1>
                            <span className={styles.sub}>
                                {cartCount} {cartCount === 1 ? "item" : "items"}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={clearAll}
                        className={styles.clearBtn}
                        aria-label="Remove all items from the cart"
                        disabled={!hasItems}>
                        <FiTrash2 aria-hidden/>
                        Remove all
                    </button>
                </header>

                {/* Free shipping banner */}
                {hasItems && (
                    <section className={styles.promo} aria-live="polite">
                        <div className={styles.promoRow}>
                            {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                                <span className={styles.promoOk}>
                                  🎉 Free shipping unlocked
                                </span>
                            ) : (
                                <span className={styles.promoText}>
                                  You’re <strong>${remaining}</strong> away from free shipping
                                </span>
                            )}
                            <span className={styles.progressPill}>
                              ${FREE_SHIPPING_THRESHOLD} goal
                            </span>
                        </div>

                        <div
                            className={styles.progress}
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={progress}
                            aria-label="Free shipping progress">
                            <span
                                className={styles.progressFill}
                                style={{width: `${progress}%`}}/>
                        </div>
                    </section>
                )}

                {/* Grid layout */}
                {!hasItems ? (
                    <EmptyCart/>
                ) : (
                    <div className={styles.grid}>
                        {/* Items */}
                        <section className={styles.items} aria-label="Cart items">
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onQtyChange={handleQtyChange}
                                    onRemove={() => handleRemove(item.id)}
                                />
                            ))}
                        </section>

                        {/* Summary card */}
                        <aside className={styles.summary} aria-label="Order summary">
                            <div className={styles.card}>
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
                                            onChange={(e) =>
                                                setPromo(e.target.value.toUpperCase())
                                            }
                                            inputMode="text"
                                            autoComplete="off"
                                            enterKeyHint="done"/>

                                        <button
                                            type="submit"
                                            className={styles.promoBtn}
                                            disabled={!promo.trim()}
                                            aria-disabled={!promo.trim()}>
                                            Apply
                                        </button>
                                    </div>
                                </form>

                                {/* Gift wrap */}
                                <label className={styles.gift} htmlFor="gift-wrap">
                                    <input
                                        id="gift-wrap"
                                        type="checkbox"
                                        className={styles.giftInput}
                                        checked={applyGiftWrap}
                                        onChange={(e) =>
                                            setApplyGiftWrap(e.target.checked)}/>

                                    <span className={styles.giftBox}>
                                        <span className={styles.giftIcon} aria-hidden>
                                          <FiGift/>
                                        </span>

                                        <span className={styles.giftText}>
                                          Add gift wrap{" "}
                                            <em className={styles.giftPrice}>+ $4.00</em>
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

                                <Link to='/checkout'
                                      className={styles.checkoutBtn}
                                      type="button"
                                      state={{subtotal, shipping, tax, total}}
                                      disabled={!hasItems}>
                                    Checkout
                                </Link>

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
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}