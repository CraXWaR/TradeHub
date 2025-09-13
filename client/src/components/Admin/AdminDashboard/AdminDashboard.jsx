import "./AdminDashboard.css";
import {Link} from "react-router-dom";

const AdminDashboard = () => {
    return (<div className="admin-dashboard">
            {/* Header */}
            <div className="admin-dashboard-header">
                <h1>Admin Dashboard 🎉</h1>
                <p>Quick access to management tools and important actions.</p>
            </div>

            {/* Links */}
            <div className="admin-dashboard-links">
                <Link to="/admin/create" className="admin-link">
                    <div className="icon">➕</div>
                    <h2>Create Product</h2>
                    <p>Add new items to the marketplace with ease.</p>
                </Link>

                <Link to="/admin/users" className="admin-link">
                    <div className="icon">👥</div>
                    <h2>Manage Users</h2>
                    <p>View, update, and control registered users.</p>
                </Link>

                <Link to="/products" className="admin-link">
                    <div className="icon">📦</div>
                    <h2>View Products</h2>
                    <p>Browse and maintain product listings.</p>
                </Link>
            </div>
        </div>);
};

export default AdminDashboard;
