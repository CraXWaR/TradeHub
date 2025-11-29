import {useMemo} from "react";
import {Link} from "react-router-dom";
import ProductCard from "../../../components/ProductCard/ProductCard.jsx";
import {useGetWishlistItems} from "../../../hooks/useGetWishlistItems.js";

import styles from "./WishlistPage.module.css";
import Button from "../../../components/User/UI/Button/Button.jsx";

const WishlistPage = () => {
    const {items: products, loading, error} = useGetWishlistItems();

    const productCards = useMemo(() => products.map((p) => (<ProductCard
        key={p.id || `${p.title}-${p.price}`}
        product={p}/>)), [products]);

    return (<section className={styles.page}>
        <header className={styles.header}>
            <h2 className={styles.title}>Wishlist</h2>
            <p className={styles.subtitle}>Items you’ve saved for later.</p>
        </header>

        {loading && (<div className={styles.spinnerWrap}>
            <div className={styles.spinner}/>
        </div>)}

        {!loading && error && (<div className={styles.errorBox}>
            {error}
        </div>)}

        {!loading && !error && products.length === 0 && (<div className={styles.empty}>
            <div className={styles.emptyIcon}>❤️</div>
            <h3 className={styles.emptyTitle}>Your wishlist is empty</h3>
            <p className={styles.emptyText}>
                Browse products and save the ones you love!
            </p>
            <Button to={'/products'} variant="empty" size={'sm'}>
                Browse products!
            </Button>
        </div>)}

        {!loading && !error && products.length > 0 && (<div className={styles.grid}>
            {productCards}
        </div>)}
    </section>);
};

export default WishlistPage;
