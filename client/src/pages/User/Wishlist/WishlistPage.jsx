import {useMemo} from "react";
import {useGetWishlistItems} from "../../../hooks/useGetWishlistItems.js";
import {LuHeartOff} from "react-icons/lu";

import {ProductCard} from "../../../components/ProductCard/ProductCard.jsx";
import {Loading} from "../../../components/User/Common/Loading/Loading.jsx";
import {Empty} from "../../../components/User/Common/Empty/Empty.jsx";
import {Error} from "../../../components/User/Common/Error/Error.jsx";

import styles from "./WishlistPage.module.css";

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

        {loading && (
            <Loading message={"Preparing your wishlist"}
                     subMessage={"Fetching your wished products from the vault..."}/>
        )}

        {!loading && error && (
            <Error error={error} message={"Communication Error"}/>
        )}

        {!loading && !error && products.length === 0 && (<Empty Icon={LuHeartOff}
                                                                title="You haven't wished anything yet"
                                                                description="When you add products in your wishlist, they will appear here. Ready to find something you love?"
                                                                actionText="Start Wishlisting"
                                                                actionTo="/products"/>)}

        {!loading && !error && products.length > 0 && (<div className={styles.grid}>
            {productCards}
        </div>)}
    </section>);
};

export default WishlistPage;
