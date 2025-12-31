import {createContext, useContext} from "react";
import {useCart} from "../hooks/cart/useCart.js";

const CartContext = createContext(null);

export default function CartProvider({children}) {
    const cart = useCart();
    return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartStore() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCartStore must be used within <CartProvider>");
    return ctx;
}
