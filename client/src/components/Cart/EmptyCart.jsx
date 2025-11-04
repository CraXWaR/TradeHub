import {NavLink} from "react-router-dom";
import {FiShoppingCart} from "react-icons/fi";

export default function EmptyCart() {
    return (<section className="rounded-lg border bg-[var(--bg-1)] p-10 text-center">
            <div
                className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--nav-hover-bg)]">
                <FiShoppingCart className="text-xl text-[var(--primary-600)]"/>
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-700)]">
                Your cart is empty
            </h2>
            <p className="mt-2 text-[var(--text-500)]">
                Looks like you haven’t added anything yet.
            </p>
            <NavLink
                to="/"
                className="mt-6 inline-block rounded-md bg-[var(--primary-500)] px-4 py-2 font-medium text-white transition-all hover:bg-[var(--primary-600)]"
            >
                Browse products
            </NavLink>
        </section>);
}
