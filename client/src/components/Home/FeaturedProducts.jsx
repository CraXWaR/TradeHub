import styles from "./FeaturedProducts.module.css";
import {useProducts} from "../../hooks/admin/useProducts.js";
import ProductCard from "../ProductCard/ProductCard.jsx";

export default function FeaturedProducts() {
    const {products, error} = useProducts();
    const featured = products.slice(0, 4);

    return (<section className={styles.section}>
        <div className="max-w-6xl mx-auto px-8 py-24">

            <div className={styles.header}>
                <h2 className={styles.title}>Featured Products</h2>
                <div className={styles.underline}></div>
                <p className={styles.subtitle}>
                    Discover a selection of our best products, carefully curated for quality and style.
                </p>
            </div>

            {/* Error state */}
            {error && (<p className="text-[var(--accent-500)] mt-12 text-center">
                Something went wrong while fetching products.
            </p>)}

            {/* Products Grid */}
            {!error && featured.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-12">
                    {featured.map((product) => (<ProductCard key={product.id} product={product}/>))}
                </div>)}

            {/* Empty state */}
            {!error && featured.length === 0 && (<p className="text-[var(--text-500)] mt-12 text-center">
                No products available.
            </p>)}
        </div>
    </section>);
}
