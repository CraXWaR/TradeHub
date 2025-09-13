import {Link, Outlet} from "react-router-dom";
import {useState} from "react";
import {
    FaAlignRight, FaAlignLeft, FaUsers, FaBox, FaPlus, FaChartBar,
} from "react-icons/fa";

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (<div className="admin-theme min-h-screen flex">
        {/* Sidebar */}
        <aside
            className={`${collapsed ? "w-20" : "w-64"} relative bg-white shadow-lg p-4 flex flex-col transition-all duration-300`}>

            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-6
             flex items-center justify-center
             rounded-md
             bg-[var(--medium-orange)] text-[var(--warm-white)]
             hover:bg-[var(--deep-orange)]
             active:bg-[var(--light-red)]
             transition-colors duration-200">
                {collapsed ? <FaAlignRight size={16}/> : <FaAlignLeft size={16}/>}
            </button>

            {/* Sidebar Header */}
            {!collapsed && (<h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>)}

            {/* Navigation */}
            <nav className="flex flex-col space-y-4 mt-6">
                <Link
                    to="/admin/dashboard"
                    className="flex items-center space-x-2 hover:text-[var(--deep-orange)]">
                    <FaChartBar/>
                    {!collapsed && <span>Dashboard</span>}
                </Link>

                <Link
                    to="/admin/create"
                    className="flex items-center space-x-2 hover:text-[var(--deep-orange)]">
                    <FaPlus/>
                    {!collapsed && <span>Create Product</span>}
                </Link>

                <Link
                    to="/admin/users"
                    className="flex items-center space-x-2 hover:text-[var(--deep-orange)]">

                    <FaUsers/>
                    {!collapsed && <span>Manage Users</span>}
                </Link>

                <Link
                    to="/products"
                    className="flex items-center space-x-2 hover:text-[var(--deep-orange)]">
                    <FaBox/>
                    {!collapsed && <span>View Products</span>}
                </Link>
            </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-[var(--warm-cream)]">
            <Outlet/>
        </main>
    </div>);
};

export default AdminLayout;
