import {useState} from "react";
import {useUserOrders} from "../../../hooks/profile/useUserOrders.js";
import {LuPackageOpen} from "react-icons/lu";

import {OrderDetailsModal} from "../../../components/User/Orders/OrderDetailsModal.jsx";
import {Empty} from "../../../components/User/Common/Empty/Empty.jsx";
import {OrderItem} from "../../../components/User/Orders/OrderItem.jsx";
import {Loading} from "../../../components/User/Common/Loading/Loading.jsx";
import {Error} from "../../../components/User/Common/Error/Error.jsx";

import styles from "./OrdersPage.module.css";

const OrdersPage = () => {
    const {orders, loading, error} = useUserOrders();
    const [selectedOrder, setSelectedOrder] = useState(null);

    const openOrder = (order) => setSelectedOrder(order);
    const closeOrder = () => setSelectedOrder(null);

    if (loading) return (
        <Loading message={"Preparing your history"} subMessage={"Fetching your orders from the vault..."}/>);
    if (error) return (<Error error={error} message={"Communication Error"}/>);
    if (orders.length === 0) return (<Empty Icon={LuPackageOpen} title="You haven't ordered anything yet"
                                            description="When you place your first order, it will appear here. Ready to find something you love?"
                                            actionText="Start Shopping" actionTo="/products"/>)

    return (<section className={styles.page}>
        <header className={styles.header}>
            <h2 className={styles.title}>Orders</h2>
            <p className={styles.subtitle}>Track and manage your orders.</p>
        </header>

        <div className={styles.content}>
            <div className={styles.orderList}>
                {orders.map(order => (
                    <OrderItem key={order.id} order={order} onOpen={openOrder}/>))}
            </div>
        </div>

        {selectedOrder && (<OrderDetailsModal
            order={selectedOrder}
            onClose={closeOrder}
        />)}
    </section>);
};

export default OrdersPage;