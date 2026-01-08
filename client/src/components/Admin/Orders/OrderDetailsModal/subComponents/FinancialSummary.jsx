import {FaGift} from 'react-icons/fa';

import styles from './FinancialSummary.module.css';

const FinancialSummary = ({order}) => {
    const subtotal = (order.total - 5.00 - (order.total * 0.20)).toFixed(2);
    const vat = (order.total * 0.20).toFixed(2);

    return (<div className={styles.billTable}>
        <div className={styles.billRow}>
            <span>Subtotal:</span>
            <span>{subtotal} BGN</span>
        </div>
        <div className={styles.billRow}>
            <span>Shipping Fee:</span>
            <span>€{order.shipping}</span>
        </div>
        <div className={styles.billRow}>
            <span>VAT (20%):</span>
            <span>{vat} BGN</span>
        </div>
        {order.apply_gift_wrap && (<div className={styles.giftIndicator}>
            <FaGift size={12}/> GIFT WRAPPING INCLUDED
        </div>)}
    </div>);
};

export default FinancialSummary;