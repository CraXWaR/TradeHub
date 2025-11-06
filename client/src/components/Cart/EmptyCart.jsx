import {NavLink} from "react-router-dom";
import {FiShoppingCart} from "react-icons/fi";
import style from "./EmptyCart.module.css";

export default function EmptyCart() {
    return (
        <section className={style.wrap} aria-labelledby="empty-title">
            <div className={style.iconWrap} aria-hidden>
                <FiShoppingCart className={style.icon}/>
            </div>

            <h2 id="empty-title" className={style.title}>Your cart is empty</h2>
            <p className={style.text}>
                You haven’t added anything yet — explore our products and find something you love.
            </p>

            <NavLink to="/products" className={style.btn}>
                Browse products
            </NavLink>
        </section>
    );
}
