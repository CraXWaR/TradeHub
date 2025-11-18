import styles from "./ProductRow.module.css";
import {getProductImageUrl, formatPrice} from "../../../utils/admin/productDisplay.js";

const ProductRow = ({product, onEdit, onDelete}) => {
    const {id, title, price, image} = product;

    return (
        <tr>
            <td className={styles.idCell} title={String(id)}>{id}</td>
            <td className={styles.productCell}>
                <div className={styles.productWrap}>
                    <div className={styles.thumb}>
                        {image ? (
                            <img
                                src={getProductImageUrl(product)}
                                alt={title || "product image"}
                                loading="lazy"/>
                        ) : (
                            <div className={styles.noImg}>IMG</div>
                        )}
                    </div>
                    <span className={styles.title}>{title || "Untitled"}</span>
                </div>
            </td>
            <td className={styles.priceCell}>{formatPrice(price)}</td>
            <td className={styles.actionsCell}>
                <button onClick={() => onEdit(product)}>Edit</button>
                <button onClick={() => onDelete(id)}>Delete</button>
            </td>
        </tr>
    );
};

export default ProductRow;
