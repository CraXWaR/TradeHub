import ProductMeta from "./ProductMeta";
import ProductActions from "./ProductActions.jsx";
import styles from "./ProductInfo.module.css";

const ProductInfo = ({product, navigate}) => (<div className={styles["product-info"]}>
    <div className="flex justify-between items-start mb-4">
        <h1 className={styles["product-title"]}>{product.title}</h1>
    </div>

    <p className={styles["product-price"]}>
        ${Number(product.price || 0).toFixed(2)}
    </p>

    <div className={styles["product-description"]}>
        <h3>Description</h3>
        <p>{product.description || "No description available."}</p>
    </div>

    <div className="mt-10">
        <ProductMeta createdAt={product.createdAt}/>
        <ProductActions navigate={navigate} productId={product.id} initialInWishlist={false}/>
    </div>
</div>);

export default ProductInfo;
