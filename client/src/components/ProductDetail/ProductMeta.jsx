import styles from "./ProductMeta.module.css";

const ProductMeta = ({createdAt}) => (
    <div className={`${styles["product-meta"]} flex justify-between items-center text-sm`}>
    <span>
      Listed on:{" "}
        {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric",
        })}
    </span>
    </div>);

export default ProductMeta;
