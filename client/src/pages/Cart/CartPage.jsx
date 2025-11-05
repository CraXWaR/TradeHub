import {useMemo, useState} from "react";
import {FiShoppingCart, FiTrash2} from "react-icons/fi";
import EmptyCart from "../../components/Cart/EmptyCart.jsx";
import CartItem from "../../components/Cart/CartItem.jsx";
import OrderSummary from "../../components/Cart/OrderSummary.jsx";
import style from "./CartPage.module.css";

const INITIAL_ITEMS = [
    {
        id: "sku-espresso",
        title: "Espresso Roast Beans",
        price: 14.99,
        quantity: 2,
        image:
            "https://images.unsplash.com/photo-1503481766315-7a586b20f66b?q=80&w=1200&auto=format&fit=crop",
        variant: "500g • Whole Bean",
    },
    {
        id: "sku-mug",
        title: "Stoneware Mug",
        price: 9.5,
        quantity: 1,
        image:
            "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
        variant: "Matte • 350ml",
    },
    {
        id: "sku-filter",
        title: "Reusable Coffee Filter",
        price: 12.0,
        quantity: 1,
        image:
            "https://images.unsplash.com/photo-1461988625982-7e46a099bf4a?q=80&w=1200&auto=format&fit=crop",
        variant: "Stainless Steel • V60",
    },
];

export default function CartPage() {
    const [items, setItems] = useState(INITIAL_ITEMS);

    const handleQtyChange = (id, qty) => {
        setItems((prev) => prev.map((it) => (it.id === id ? {...it, quantity: qty} : it)));
    };
    const handleRemove = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

    const {subtotal, shipping, tax, total, itemCount} = useMemo(() => {
        const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
        const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99;
        const tax = +(subtotal * 0.1).toFixed(2);
        const total = +(subtotal + shipping + tax).toFixed(2);
        const itemCount = items.reduce((acc, it) => acc + it.quantity, 0);
        return {subtotal: +subtotal.toFixed(2), shipping, tax, total, itemCount};
    }, [items]);

    const clearAll = () => setItems([]);

    return (
        <main className={style.main}>
            <div className={style.content}>
                <header className={style.header} aria-live="polite">
                    <div className={style.headerLeft}>
                        <FiShoppingCart className={style.icon} aria-hidden/>
                        <h1 className={style.title}>Your Cart</h1>
                    </div>
                    <span className={style.countBadge}>
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
                </header>

                {items.length === 0 ? (
                    <EmptyCart/>
                ) : (
                    <div className={style.grid}>
                        <section className={style.itemsSection} aria-label="Cart items">
                            {items.map((item) => (
                                <CartItem
                                    key={item.id}
                                    item={item}
                                    onQtyChange={handleQtyChange}
                                    onRemove={() => handleRemove(item.id)}
                                />
                            ))}

                            <button
                                type="button"
                                onClick={clearAll}
                                className={style.clearBtn}
                                aria-label="Remove all items from the cart"
                            >
                                <FiTrash2 className={style.clearBtnIcon} aria-hidden/>
                                <span className={style.clearBtnText}>Remove all</span>
                            </button>
                        </section>

                        <aside className={style.summaryAside} aria-label="Order summary">
                            <OrderSummary subtotal={subtotal} shipping={shipping} tax={tax} total={total}/>
                            <button
                                className={style.checkoutBtn}
                                type="button"
                                disabled={items.length === 0}
                            >
                                Checkout
                            </button>
                            <p className={style.terms}>
                                By checking out you agree to our{" "}
                                <a href="/terms" className={style.link}>
                                    Terms &amp; Conditions
                                </a>
                                .
                            </p>
                        </aside>
                    </div>
                )}
            </div>
        </main>
    );
}
