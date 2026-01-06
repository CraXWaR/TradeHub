import {
    FaCalendarAlt, FaGift, FaArrowRight, FaTimes, FaUserAlt, FaTruck, FaClipboardList, FaInbox
} from 'react-icons/fa';

import {useOrders} from "../../../hooks/admin/useOrders.js";
import {Error} from "../../../components/Admin/Common/Error/Error.jsx";
import {Loading} from "../../../components/Admin/Common/Loading/Loading.jsx";
import {Empty} from "../../../components/Admin/Common/Empty/Empty.jsx";

import styles from './OrdersList.module.css';

const OrdersList = () => {
    const {
        orders, loading, error, selectedOrder, isClosing, openOrder, closePanel
    } = useOrders();

    return (<div className={`admin-theme ${styles.container}`}>
        <header>
            <h1>Order Management</h1>
            <p style={{color: 'var(--text-500)'}}>Review and process incoming requests</p>
        </header>

        {loading && <Loading message="Loading orders..."/>}
        {error && !loading && <Error message={error}/>}

        {!loading && !error && (<div className={styles.orderGrid}>
            {orders.length > 0 ? (orders.map(order => (<div key={order.id} className={styles.orderCard}>
                {order.apply_gift_wrap && (<div className={styles.giftRibbon}><FaGift/> GIFT WRAP</div>)}

                <div className={styles.orderHeader}>
                    <span className={styles.orderId}>#ORD-{order.id}</span>
                    <span className={styles.price}>{order.total} BGN</span>
                </div>

                <div className={styles.customerInfo}>
                    <h3>{order.first_name} {order.last_name}</h3>
                    <p><FaCalendarAlt size={12}/> {new Date(order.createdAt).toLocaleDateString("en-GB")}</p>
                </div>

                <div className={styles.footerActions}>
                            <span className={`${styles.statusBadge} status_${order.status}`}>
                                {order.status.toUpperCase()}
                            </span>
                    <button onClick={() => openOrder(order)}>
                        Details <FaArrowRight size={12}/>
                    </button>
                </div>
            </div>))) : (<Empty
                title="No Orders Yet"
                description="Once a customer places an order, it will appear here for processing."
                icon={FaInbox}
            />)}
        </div>)}

        {/* MODAL LOGIC */}
        {selectedOrder && (
            <div className={`${styles.modalOverlay} ${isClosing ? styles.closing : ''}`} onClick={closePanel}>
                <div className={`${styles.modalContent} ${isClosing ? styles.closing : ''}`}
                     onClick={e => e.stopPropagation()}>

                    <div className={styles.modalHeader}>
                        <button className={styles.headerCloseBtn} onClick={closePanel}>
                            <FaTimes size={20}/>
                        </button>

                        <div className={styles.headerTitleGroup}>
                            <span className={styles.orderBadge}>ORDER DETAILS</span>
                            <h2>#ORD-{selectedOrder.id}</h2>
                            <span style={{color: 'var(--text-500)', fontSize: '0.85rem', fontWeight: 500}}>
                                Received on:{" "}
                                {new Date(selectedOrder.createdAt).toLocaleString("en-GB", {
                                    day: "2-digit",
                                    month: "2-digit",
                                    year: "numeric",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </span>
                        </div>
                    </div>

                    <div className={styles.modalBody}>
                        {/* SECTION: CUSTOMER */}
                        <div className={styles.sectionTitle}>
                            <FaUserAlt size={14}/> CUSTOMER INFORMATION
                        </div>
                        <div className={styles.detailsGrid}>
                            <div className={styles.dataGroup}>
                                <span className={styles.dataLabel}>Full Name</span>
                                <span
                                    className={styles.dataValue}>{selectedOrder.first_name} {selectedOrder.last_name}</span>
                            </div>
                            <div className={styles.dataGroup}>
                                <span className={styles.dataLabel}>Contact Details</span>
                                <span className={styles.dataValue}>{selectedOrder.email}</span>
                                <span
                                    className={styles.dataValue}>{selectedOrder.phone_number || 'No phone provided'}</span>
                            </div>
                        </div>

                        {/* SECTION: SHIPPING */}
                        <div className={styles.sectionTitle}>
                            <FaTruck size={14}/> LOGISTICS & SHIPPING
                        </div>
                        <div className={styles.detailsGrid}>
                            <div className={styles.dataGroup}>
                                <span className={styles.dataLabel}>City / Postal Code</span>
                                <span
                                    className={styles.dataValue}>{selectedOrder.city}, {selectedOrder.postal_code}</span>
                            </div>
                            <div className={styles.dataGroup}>
                                <span className={styles.dataLabel}>Shipping Address</span>
                                <span className={styles.dataValue}>{selectedOrder.address}</span>
                            </div>
                        </div>

                        {/* SECTION: FINANCIAL BREAKDOWN */}
                        <div className={styles.sectionTitle}>
                            <FaClipboardList size={14}/> FINANCIAL SUMMARY
                        </div>
                        <div className={styles.billTable}>
                            <div className={styles.billRow}>
                                <span>Subtotal:</span>
                                <span>{(selectedOrder.total - 5.00 - (selectedOrder.total * 0.20)).toFixed(2)} BGN</span>
                            </div>
                            <div className={styles.billRow}>
                                <span>Shipping Fee:</span>
                                <span>5.00 BGN</span>
                            </div>
                            <div className={styles.billRow}>
                                <span>VAT (20%):</span>
                                <span>{(selectedOrder.total * 0.20).toFixed(2)} BGN</span>
                            </div>
                            {selectedOrder.apply_gift_wrap && (<div className={styles.giftIndicator}>
                                <FaGift size={12}/> GIFT WRAPPING INCLUDED
                            </div>)}
                        </div>
                    </div>

                    {/* FINAL BLOCK */}
                    <div className={styles.footer}>
                        <span className={styles.label}>TOTAL AMOUNT DUE</span>
                        <span className={styles.totalValue}>{selectedOrder.total} BGN</span>
                    </div>
                </div>
            </div>)}
    </div>);
};

export default OrdersList;