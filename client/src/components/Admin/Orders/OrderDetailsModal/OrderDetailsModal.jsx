import {FaTimes, FaUserAlt, FaTruck, FaClipboardList} from 'react-icons/fa';

import ModalSection from './subComponents/ModalSection.jsx';
import DataGroup from './subComponents/DataGroup.jsx';
import OrderItem from './subComponents/OrderItem.jsx';
import FinancialSummary from './subComponents/FinancialSummary.jsx';

import styles from './OrderDetailsModal.module.css';
import OrderStatusSelect from "./subComponents/OrderStatusSelect.jsx";

const OrderDetailsModal = ({order, isClosing, onClose, baseUrl, onStatusChange}) => {
    if (!order) return null;

    return (<div className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`} onClick={onClose}>
            <div
                className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`}
                onClick={e => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <button className={styles.headerCloseBtn} onClick={onClose}>
                        <FaTimes size={20}/>
                    </button>
                    <div className={styles.headerTitleGroup}>
                        <span className={styles.orderBadge}>ORDER DETAILS</span>
                        <h2>#ORD-{order.id}</h2>
                        <span className={styles.mutedDate}>
                            Received on: {new Date(order.createdAt).toLocaleString("en-GB")}
                        </span>
                    </div>
                </div>

                <div className={styles.modalBody}>

                    <ModalSection title="Customer Information" icon={<FaUserAlt size={14}/>}>
                        <DataGroup label="Full Name" value={`${order.first_name} ${order.last_name}`}/>
                        <DataGroup label="Contact Details" value={order.email} extra={order.phone_number}/>
                    </ModalSection>

                    <ModalSection title="Logistics & Shipping" icon={<FaTruck size={14}/>}>
                        <DataGroup label="City / Postal Code" value={`${order.city}, ${order.postal_code}`}/>
                        <DataGroup label="Shipping Address" value={order.address}/>
                    </ModalSection>

                    <ModalSection title="Purchased Items" icon={<FaClipboardList size={14}/>}>
                        <div className={styles.itemsWrapper}>
                            {order.items?.map(item => (<OrderItem key={item.id} item={item} baseUrl={baseUrl}/>))}
                        </div>
                    </ModalSection>

                    <ModalSection title="Financial Summary" icon={<FaClipboardList size={14}/>}>
                        <FinancialSummary order={order}/>
                    </ModalSection>

                    <OrderStatusSelect
                        currentStatus={order.status}
                        onChange={(newStatus) => onStatusChange(order.id, newStatus)}
                    />
                </div>

                <div className={styles.footer}>
                    <span className={styles.label}>TOTAL AMOUNT DUE</span>
                    <span className={styles.totalValue}>{order.total} BGN</span>
                </div>
            </div>
        </div>);
};

export default OrderDetailsModal;