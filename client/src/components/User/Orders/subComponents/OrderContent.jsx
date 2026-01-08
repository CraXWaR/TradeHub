import {FaShoppingBag} from "react-icons/fa";

import styles from "./OrderContent.module.css";

const OrderContent = ({items, baseUrl}) => {
    return (<div className={styles.card}>
        <div className={styles.cardHeader}>
            <FaShoppingBag/>
            <h3>Order Items</h3>
        </div>

        {items?.map((item, idx) => (<div key={idx} className={styles.productRow}>
            <div className={styles.productInfo}>
                <div className={styles.imageWrapper}>
                    <img
                        src={`${baseUrl}/uploads/${item.product?.image}`}
                        alt={item.product?.title}
                        className={styles.productImage}
                    />
                    <span className={styles.productQtyBadge}>{item.quantity}</span>
                </div>

                <div className={styles.productMeta}>
                    <span className={styles.productName}>{item.product?.title}</span>
                    {item.variant && (<span className={styles.productVariant}>
                        Variant: {item.variant.name}
                    </span>)}
                </div>
            </div>

            <div className={styles.priceTag}>
                <span className={styles.priceCurrency}>€</span>
                <span className={styles.productPrice}>{item.price}</span>
            </div>
        </div>))}
    </div>);
};

export default OrderContent;