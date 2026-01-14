import ProductRow from "./ProductRow.jsx";
import styles from "./ProductsTable.module.css";

export const ProductsTable = ({products, onEdit, onDelete}) => {
    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead>
                <tr>
                    <th className={styles.colId}>ID</th>
                    <th className={styles.colProduct}>Product</th>
                    <th className={styles.colPrice}>Price</th>
                    <th className={styles.colActions}>Actions</th>
                </tr>
                </thead>
                <tbody>
                {products.map((p, idx) => (
                    <ProductRow
                        key={p.id || idx}
                        product={p}
                        onEdit={onEdit}
                        onDelete={onDelete}/>
                ))}
                </tbody>
            </table>
        </div>
    );
};