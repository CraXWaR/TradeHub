import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import { FaPlus, FaUsers, FaCubes } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";

const AdminDashboard = () => {
    return (
        <div className={styles.adminDashboard}>
            {/* Header */}
            <div className={styles.header}>
                <h1>
                    Admin Dashboard
                    <GiPartyPopper className={styles.partyIcon} />
                </h1>
                <p>Quick access to management tools and important actions.</p>
            </div>

            {/* Links Grid */}
            <div className={styles.linksGrid}>
                <Link to="/admin/create" className={styles.adminLink}>
                    <div className={styles.iconWrapper}>
                        <FaPlus />
                    </div>
                    <h2>Create Product</h2>
                    <p>Add new items to the marketplace with ease.</p>
                </Link>

                <Link to="/admin/users" className={styles.adminLink}>
                    <div className={styles.iconWrapper}>
                        <FaUsers />
                    </div>
                    <h2>Manage Users</h2>
                    <p>View, update, and control registered users.</p>
                </Link>

                <Link to="/admin/products" className={styles.adminLink}>
                    <div className={styles.iconWrapper}>
                        <FaCubes />
                    </div>
                    <h2>View Products</h2>
                    <p>Browse and maintain product listings.</p>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;