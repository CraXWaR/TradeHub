import React, {useState} from 'react';
import {
    FaCalendarAlt, FaGift, FaArrowRight, FaTimes, FaUserAlt, FaTruck, FaBoxOpen, FaClipboardList
} from 'react-icons/fa';

import styles from './OrdersList.module.css';

const OrdersList = () => {
    // test orders TODO GET ORDERS FROM DB
    const [orders] = useState([{
        id: 2501,
        first_name: "Иван",
        last_name: "Иванов",
        phone_number: "0895707436",
        email: "ivan@email.bg",
        address: "ул. Пирин 12",
        city: "София",
        postal_code: "1000",
        country: "Bulgaria",
        subtotal: 140.00,
        shipping: 10.00,
        tax: 5.20,
        total: 155.20,
        apply_gift_wrap: true,
        status: "pending",
        created_at: "2026-01-05"
    }, {
        id: 2502,
        first_name: "Елена",
        last_name: "Георгиева",
        phone_number: "0895703674",
        email: "elena@georgieva.com",
        address: "бул. Марица 45",
        city: "Пловдив",
        postal_code: "4000",
        country: "Bulgaria",
        subtotal: 80.00,
        shipping: 5.00,
        tax: 4.00,
        total: 89.00,
        apply_gift_wrap: false,
        status: "paid",
        created_at: "2026-01-04"
    }, {
        id: 2503,
        first_name: "Димитър",
        last_name: "Петров",
        phone_number: "0887123456",
        email: "d.petrov@abv.bg",
        address: "ул. Оборище 5",
        city: "Варна",
        postal_code: "9000",
        country: "Bulgaria",
        subtotal: 210.00,
        shipping: 0.00,
        tax: 10.50,
        total: 220.50,
        apply_gift_wrap: true,
        status: "shipped",
        created_at: "2026-01-03"
    }, {
        id: 2504,
        first_name: "Мария",
        last_name: "Колева",
        phone_number: "0876998877",
        email: "m.koleva@gmail.com",
        address: "ул. Цар Симеон 88",
        city: "Бургас",
        postal_code: "8000",
        country: "Bulgaria",
        subtotal: 45.50,
        shipping: 7.00,
        tax: 2.30,
        total: 54.80,
        apply_gift_wrap: false,
        status: "cancelled",
        created_at: "2026-01-03"
    }, {
        id: 2505,
        first_name: "Стефан",
        last_name: "Данаилов",
        phone_number: "0894556677",
        email: "stefan.d@mail.bg",
        address: "ул. Гурко 14",
        city: "Велико Търново",
        postal_code: "5000",
        country: "Bulgaria",
        subtotal: 320.00,
        shipping: 0.00,
        tax: 16.00,
        total: 336.00,
        apply_gift_wrap: false,
        status: "paid",
        created_at: "2026-01-02"
    }, {
        id: 2506,
        first_name: "Анелия",
        last_name: "Стоянова",
        phone_number: "0885112233",
        email: "stoyanova_a@outlook.com",
        address: "ул. Търговска 2",
        city: "Русе",
        postal_code: "7000",
        country: "Bulgaria",
        subtotal: 115.00,
        shipping: 8.50,
        tax: 5.75,
        total: 129.25,
        apply_gift_wrap: true,
        status: "pending",
        created_at: "2026-01-02"
    }, {
        id: 2507,
        first_name: "Николай",
        last_name: "Младенов",
        phone_number: "0878445566",
        email: "niko_m@yahoo.com",
        address: "жк. Младост 3, бл. 302",
        city: "София",
        postal_code: "1712",
        country: "Bulgaria",
        subtotal: 19.99,
        shipping: 6.00,
        tax: 1.00,
        total: 26.99,
        apply_gift_wrap: false,
        status: "shipped",
        created_at: "2026-01-01"
    }, {
        id: 2508,
        first_name: "Петя",
        last_name: "Николова",
        phone_number: "0899887766",
        email: "petya_n@icloud.com",
        address: "ул. Александровска 120",
        city: "Стара Загора",
        postal_code: "6000",
        country: "Bulgaria",
        subtotal: 255.00,
        shipping: 0.00,
        tax: 12.75,
        total: 267.75,
        apply_gift_wrap: true,
        status: "paid",
        created_at: "2025-12-31"
    }, {
        id: 2509,
        first_name: "Георги",
        last_name: "Димитров",
        phone_number: "0883009911",
        email: "g.dimitrov88@gmail.com",
        address: "ул. Вапцаров 3",
        city: "Благоевград",
        postal_code: "2700",
        country: "Bulgaria",
        subtotal: 67.40,
        shipping: 5.50,
        tax: 3.35,
        total: 76.25,
        apply_gift_wrap: false,
        status: "pending",
        created_at: "2025-12-30"
    }, {
        id: 2510,
        first_name: "Виктория",
        last_name: "Радева",
        phone_number: "+359894123987",
        email: "viki_radeva@abv.bg",
        address: "ул. Свобода 15",
        city: "Хасково",
        postal_code: "6300",
        country: "Bulgaria",
        subtotal: 150.00,
        shipping: 10.00,
        tax: 7.50,
        total: 167.50,
        apply_gift_wrap: true,
        status: "shipped",
        created_at: "2025-12-29"
    }, {
        id: 2511,
        first_name: "Борис",
        last_name: "Милев",
        phone_number: "0877554433",
        email: "bmilev@pro.bg",
        address: "ул. Дунав 4",
        city: "Видин",
        postal_code: "3700",
        country: "Bulgaria",
        subtotal: 95.00,
        shipping: 9.00,
        tax: 4.75,
        total: 108.75,
        apply_gift_wrap: false,
        status: "paid",
        created_at: "2025-12-28"
    }, {
        id: 2512,
        first_name: "Кристина",
        last_name: "Попова",
        phone_number: "0889112244",
        email: "kris_p@start.bg",
        address: "ул. Родопи 21",
        city: "Кърджали",
        postal_code: "6600",
        country: "Bulgaria",
        subtotal: 12.50,
        shipping: 5.00,
        tax: 0.60,
        total: 18.10,
        apply_gift_wrap: false,
        status: "cancelled",
        created_at: "2025-12-28"
    }]);

    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isClosing, setIsClosing] = useState(false);

    const closePanel = () => {
        setIsClosing(true);
        setTimeout(() => {
            setSelectedOrder(null);
            setIsClosing(false);
        }, 400);
    };

    return (<div className={`admin-theme ${styles.container}`}>
        <header>
            <h1>Order Management</h1>
            <p style={{color: 'var(--text-500)'}}>Review and process incoming requests</p>
        </header>

        <div className={styles.orderGrid}>
            {orders.map(order => (<div key={order.id} className={styles.orderCard}>
                {order.apply_gift_wrap && (<div className={styles.giftRibbon}><FaGift/> GIFT WRAP</div>)}

                <div className={styles.orderHeader}>
                    <span className={styles.orderId}>#ORD-{order.id}</span>
                    <span className={styles.price}>{order.total.toFixed(2)} BGN</span>
                </div>

                <div className={styles.customerInfo}>
                    <h3>{order.first_name} {order.last_name}</h3>
                    <p><FaCalendarAlt size={12}/> {new Date(order.created_at).toLocaleDateString('en-GB')}</p>
                </div>

                <div className={styles.footerActions}>
                        <span className={`${styles.statusBadge} status_${order.status}`}>
                            {order.status.toUpperCase()}
                        </span>
                    <button onClick={() => setSelectedOrder(order)}>
                        Details <FaArrowRight size={12}/>
                    </button>
                </div>
            </div>))}
        </div>

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
                                Received on: {new Date(selectedOrder.created_at).toLocaleDateString('en-GB')}
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
                        <span className={styles.totalValue}>{selectedOrder.total.toFixed(2)} BGN</span>
                    </div>
                </div>
            </div>)}
    </div>);
};

export default OrdersList;