import {FaInbox} from 'react-icons/fa';

import {useOrders} from "../../../hooks/admin/useOrders.js";

import {Error} from "../../../components/Admin/Common/Error/Error.jsx";
import {Loading} from "../../../components/Admin/Common/Loading/Loading.jsx";
import {Empty} from "../../../components/Admin/Common/Empty/Empty.jsx";

import OrderDetailsModal from "../../../components/Admin/Orders/OrderDetailsModal/OrderDetailsModal.jsx";
import OrderCard from "../../../components/Admin/Orders/OrderCard/OrderCard.jsx";

import styles from './OrdersList.module.css';

const BASE_URL = import.meta.env.VITE_API_URL;

const OrdersList = () => {
    const {
        orders, loading, error, selectedOrder, isClosing, openOrder, closePanel, updateOrderStatus
    } = useOrders();

    return (<div className={`admin-theme ${styles.container}`}>
        <header className={styles.header}>
            <h1>Order Management</h1>
            <p className={styles.subtitle}>Review and process incoming requests</p>
        </header>

        {loading && <Loading message="Loading orders..."/>}
        {error && !loading && <Error message={error}/>}

        {!loading && !error && (<div className={styles.orderGrid}>
            {orders.length > 0 ? (orders.map(order => (<OrderCard
                key={order.id}
                order={order}
                onOpen={openOrder}
            />))) : (<Empty
                title="No Orders Yet"
                description="Once a customer places an order, it will appear here for processing."
                icon={FaInbox}
            />)}
        </div>)}

        <OrderDetailsModal
            order={selectedOrder}
            isClosing={isClosing}
            onClose={closePanel}
            baseUrl={BASE_URL}
            onStatusChange={updateOrderStatus}/>
    </div>);
};

export default OrdersList;