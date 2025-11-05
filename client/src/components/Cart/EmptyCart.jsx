import {NavLink} from "react-router-dom";
import {FiShoppingCart} from "react-icons/fi";
import style from "./EmptyCart.module.css";

export default function EmptyCart() {
    return (
        <section className={style.wrapper} aria-labelledby="empty-title">
            <div className={style.iconWrap} aria-hidden>
                <FiShoppingCart className={style.icon}/>
            </div>
            <h2 id="empty-title" className={style.h2}>Your cart is empty</h2>
            <p className={style.p}>Looks like you haven’t added anything yet.</p>
            <NavLink to="/products" className={style.linkBtn}>Browse products</NavLink>
        </section>
    );
}
