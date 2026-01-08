import styles from './OrderItem.module.css';

const OrderItem = ({item, baseUrl}) => {
    return (<div className={styles.productRow}>
            <div className={styles.productMain}>
                <div className={styles.productImageWrapper}>
                    <img
                        src={`${baseUrl}/uploads/${item.product?.image}`}
                        alt={item.product?.title}
                        className={styles.productThumb}
                    />
                    <span className={styles.itemQuantityBadge}>{item.quantity}</span>
                </div>
                <div className={styles.productInfo}>
                    <span className={styles.productTitle}>{item.product?.title}</span>
                    {item.variant && (<div className={styles.variantTag}>
                            <span className={styles.variantLabel}>Option:</span>
                            <span className={styles.variantName}>{item.variant.name || item.variant.title}</span>
                        </div>)}
                    <span className={styles.productSku}>SKU: #{item.product_id}-{item.variant_id || 'base'}</span>
                </div>
            </div>
            <div className={styles.productPrice}>
                <span className={styles.unitPrice}>{Number(item.price).toFixed(2)} BGN</span>
                <span className={styles.totalPrice}>{(item.price * item.quantity).toFixed(2)} BGN</span>
            </div>
        </div>);
};

export default OrderItem;