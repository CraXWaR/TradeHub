import { useMemo, useState } from "react";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import EmptyCart from "../../components/Cart/EmptyCart.jsx";
import CartItem from "../../components/Cart/CartItem.jsx";
import OrderSummary from "../../components/Cart/OrderSummary.jsx";


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
        setItems((prev) =>
            prev.map((it) => (it.id === id ? { ...it, quantity: qty } : it))
        );
    };

    const handleRemove = (id) => {
        setItems((prev) => prev.filter((it) => it.id !== id));
    };

    const { subtotal, shipping, tax, total, itemCount } = useMemo(() => {
        const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
        const shipping = subtotal > 50 || subtotal === 0 ? 0 : 4.99; // simple rule
        const tax = +(subtotal * 0.1).toFixed(2); // 10% placeholder
        const total = +(subtotal + shipping + tax).toFixed(2);
        const itemCount = items.reduce((acc, it) => acc + it.quantity, 0);
        return {
            subtotal: +subtotal.toFixed(2),
            shipping,
            tax,
            total,
            itemCount,
        };
    }, [items]);

    return (
        <main className="mx-auto max-w-6xl px-4 py-8">
            {/* Page header */}
            <div className="mb-8 flex items-center gap-3">
                <FiShoppingCart className="text-2xl text-[var(--primary-600)]" />
                <h1 className="text-2xl font-semibold text-[var(--text-700)]">
                    Your Cart
                </h1>
                <span className="ml-2 rounded-full bg-[var(--nav-hover-bg)] px-3 py-1 text-sm text-[var(--text-500)]">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </span>
            </div>

            {items.length === 0 ? (
                <EmptyCart />
            ) : (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_360px]">
                    {/* Left: items */}
                    <section className="space-y-4">
                        {items.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onQtyChange={handleQtyChange}
                                onRemove={() => handleRemove(item.id)}
                            />
                        ))}

                        {/* Clear all (hardcoded UX helper) */}
                        <button
                            onClick={() => setItems([])}
                            className="group inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm transition-all hover:bg-[var(--nav-hover-bg)]">
                            <FiTrash2 className="opacity-70 group-hover:opacity-100" />
                            <span className="text-[var(--text-500)] group-hover:text-[var(--text-700)]">
                            Remove all
                          </span>
                        </button>
                    </section>

                    {/* Right: summary */}
                    <aside className="h-max rounded-lg border bg-[var(--bg-1)] p-5">
                        <OrderSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            tax={tax}
                            total={total}
                        />

                        <button className="mt-4 w-full rounded-md bg-[var(--primary-500)] px-4 py-3 font-semibold text-white transition-all hover:bg-[var(--primary-600)]">
                            Checkout
                        </button>

                        <p className="mt-3 text-center text-xs text-[var(--text-500)]">
                            By checking out you agree to our Terms & Conditions.
                        </p>
                    </aside>
                </div>
            )}
        </main>
    );
}
