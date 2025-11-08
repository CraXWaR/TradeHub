import {useEffect, useMemo, useState} from "react";
import {useCartStore} from "../../contex/cart-context.jsx";

import {FiShoppingCart, FiTrash2, FiLock, FiArrowLeft, FiGift, FiHelpCircle} from "react-icons/fi";
import EmptyCart from "../../components/Cart/EmptyCart.jsx";
import CartItem from "../../components/Cart/CartItem.jsx";
import OrderSummary from "../../components/Cart/OrderSummary.jsx";

import style from "./CartPage.module.css";

const INITIAL_ITEMS = [{
    id: "sku-espresso",
    title: "Espresso Roast Beans",
    price: 14.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1503481766315-7a586b20f66b?q=80&w=1200&auto=format&fit=crop",
    variant: "500g • Whole Bean",
}, {
    id: "sku-mug",
    title: "Stoneware Mug",
    price: 9.5,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    variant: "Matte • 350ml",
}, {
    id: "sku-filter",
    title: "Reusable Coffee Filter",
    price: 12.0,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1461988625982-7e46a099bf4a?q=80&w=1200&auto=format&fit=crop",
    variant: "Stainless Steel • V60",
},];

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
        <main className={style.main}>
            <div className={style.wrap}>
                {/* Top utility bar */}
                <div className={style.topbar}>
                    <a href="/products" className={style.topLink}>
                        <FiArrowLeft aria-hidden/> Continue shopping
                    </a>

                    <div className={style.topSupport}>
                        <FiHelpCircle aria-hidden/>
                        <a href="/help" className={style.helpLink}>Need help?</a>
                    </div>
                </div>

                {/* Page header */}
                <header className={style.header} aria-live="polite">
                    <div className={style.headerLeft}>
                        <span className={style.cartBadge} aria-hidden>
                          <FiShoppingCart/>
                        </span>
                        <div className={style.headerText}>
                            <h1 className={style.title}>Your Cart</h1>
                            <span className={style.sub}>
                                {cartCount} {cartCount === 1 ? "item" : "items"}
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={clearAll}
                        className={style.clearBtn}
                        aria-label="Remove all items from the cart"
                        disabled={!hasItems}>
                        <FiTrash2 aria-hidden/>
                        Remove all
                    </button>
                </header>

                {/* Free shipping banner */}
                {hasItems && (
                    <section className={style.promo} aria-live="polite">
                        <div className={style.promoRow}>
                            {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                                <span className={style.promoOk}>
                                  🎉 Free shipping unlocked
                                </span>
                            ) : (
                                <span className={style.promoText}>
                                  You’re <strong>${remaining}</strong> away from free shipping
                                </span>
                            )}
                            <span className={style.progressPill}>
                              ${FREE_SHIPPING_THRESHOLD} goal
                            </span>
                        </div>

                        <div
                            className={style.progress}
                            role="progressbar"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={progress}
                            aria-label="Free shipping progress">
                            <span
                                className={style.progressFill}
                                style={{width: `${progress}%`}}
                            />
                        </div>
                    </section>
                )}

                {/* Grid layout */}
                {!hasItems ? (
                    <EmptyCart/>
                ) : (
                    <div className={style.grid}>
                        {/* Items */}
                        <section className={style.items} aria-label="Cart items">
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
                        <aside className={style.summary} aria-label="Order summary">
                            <div className={style.card}>
                                {/* Promo input */}
                                <form
                                    className={style.promoForm}
                                    onSubmit={(e) => e.preventDefault()}
                                    aria-label="Apply a promo code">
                                    <label className={style.promoLabel} htmlFor="promo">
                                        Promo code
                                    </label>

                                    <div className={style.promoField}>
                                        <input
                                            id="promo"
                                            className={style.promoInput}
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
                                            className={style.promoBtn}
                                            disabled={!promo.trim()}
                                            aria-disabled={!promo.trim()}>
                                            Apply
                                        </button>
                                    </div>
                                </form>

                                {/* Gift wrap */}
                                <label className={style.gift} htmlFor="gift-wrap">
                                    <input
                                        id="gift-wrap"
                                        type="checkbox"
                                        className={style.giftInput}
                                        checked={applyGiftWrap}
                                        onChange={(e) =>
                                            setApplyGiftWrap(e.target.checked)
                                        }/>

                                    <span className={style.giftBox}>
                                        <span className={style.giftIcon} aria-hidden>
                                          <FiGift />
                                        </span>

                                        <span className={style.giftText}>
                                          Add gift wrap{" "}
                                            <em className={style.giftPrice}>+ $4.00</em>
                                        </span>

                                        <span className={style.giftSwitch} aria-hidden>
                                          <span className={style.giftKnob} />
                                        </span>
                                      </span>
                                </label>

                                <OrderSummary
                                    subtotal={subtotal}
                                    shipping={shipping}
                                    tax={tax}
                                    total={total}
                                />

                                <button
                                    className={style.checkoutBtn}
                                    type="button"
                                    disabled={!hasItems}
                                >
                                    Checkout
                                </button>

                                <div className={style.secureRow} aria-live="polite">
                                    <FiLock aria-hidden/>
                                    <span>Secure checkout • 256-bit encryption</span>
                                </div>

                                <p className={style.terms}>
                                    By checking out you agree to our{" "}
                                    <a href="/terms" className={style.link}>
                                        Terms &amp; Conditions.
                                    </a>
                                </p>
                            </div>
                        </aside>
                    </div>
                )}
            </div>

            {/* Mobile sticky bar */}
            {hasItems && (
                <div className={style.stickyPay} aria-label="Quick checkout bar">
                    <div className={style.stickyMeta}>
                        <span className={style.stickyLabel}>Total</span>
                        <span className={style.stickyTotal}>${total.toFixed(2)}</span>
                    </div>
                    <button className={style.stickyBtn} type="button">
                        Checkout
                    </button>
                </div>
            )}
        </main>
    );
}