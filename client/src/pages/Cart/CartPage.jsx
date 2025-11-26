import {useState} from "react";
import {Link} from "react-router-dom";
import {FiShoppingCart, FiTrash2, FiArrowLeft, FiHelpCircle} from "react-icons/fi";
import {useCartStore} from "../../contex/cart-context.jsx";

import EmptyCart from "../../components/Cart/EmptyCart.jsx";
import CartItem from "../../components/Cart/CartItem.jsx";
import {FreeShippingBanner} from "../../components/Cart/FreeShippingBanner.jsx";
import {CheckoutCard} from "../../components/Cart/CheckoutCard.jsx";

import {useCartTotals} from "../../hooks/cart/useCartTotals.js";
import {useCartProducts} from "../../hooks/cart/useCartProducts.js";

import styles from "./CartPage.module.css";

export default function CartPage() {
    const {cartItems, removeFromCart, clearCart, cartCount, updateItemQuantity, updateItemVariant} = useCartStore();

    const [promo, setPromo] = useState("");
    const [applyGiftWrap, setApplyGiftWrap] = useState(false);

    const {items, updateQuantity, removeItem, clearItems} = useCartProducts(cartItems);

    const {subtotal, shipping, tax, total, freeShippingThreshold} = useCartTotals(items, applyGiftWrap);

    const hasItems = items.length > 0;

    const handleRemove = (productId, variantId) => {
        const norm = variantId ?? null;
        removeItem(productId, norm);
        removeFromCart(productId, norm);
    };

    const clearAll = () => {
        clearItems();
        clearCart();
    };

    return (<main className={styles.main}>
        <div className={styles.wrap}>
            {/* Top utility bar */}
            <div className={styles.topbar}>
                <Link to="/products" className={styles.topLink}>
                    <FiArrowLeft aria-hidden/> Continue shopping
                </Link>

                <div className={styles.topSupport}>
                    <FiHelpCircle aria-hidden/>
                    <Link to="/help" className={styles.helpLink}>
                        Need help?
                    </Link>
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
            <FreeShippingBanner
                hasItems={hasItems}
                subtotal={subtotal}
                threshold={freeShippingThreshold}/>

            {/* Grid layout */}
            {!hasItems ? (<EmptyCart/>) : (<div className={styles.grid}>
                {/* Items */}
                <section className={styles.items} aria-label="Cart items">
                    {items.map((item) => (<CartItem
                        key={item.id}
                        item={item}
                        onQtyChange={(productId, qty, variantId) => {
                            updateQuantity(productId, variantId, qty);
                            updateItemQuantity(productId, variantId, qty);
                        }}
                        onRemove={() => handleRemove(item.id, item.selectedVariantId ?? null)}
                        onVariantChange={(productId, oldVariantId, newVariantId) => {
                            updateItemVariant(productId, oldVariantId, newVariantId);
                        }}
                    />))}
                </section>

                {/* Summary card */}
                <aside className={styles.summary} aria-label="Order summary">
                    <CheckoutCard
                        subtotal={subtotal}
                        shipping={shipping}
                        tax={tax}
                        total={total}
                        hasItems={hasItems}
                        promo={promo}
                        setPromo={setPromo}
                        applyGiftWrap={applyGiftWrap}
                        setApplyGiftWrap={setApplyGiftWrap}
                        items={items} />
                </aside>
            </div>)}
        </div>
    </main>);
}
