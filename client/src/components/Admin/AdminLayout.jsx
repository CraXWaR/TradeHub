import {Link, Outlet} from "react-router-dom";
import {useState, useRef} from "react";
import {FaAlignRight, FaAlignLeft, FaUsers, FaBox, FaPlus, FaChartBar, FaCubes} from "react-icons/fa";

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(window.innerWidth < 768);
    const touchStart = useRef(null);
    const touchEnd = useRef(null);

    const minSwipeDistance = 30;

    const onTouchStart = (e) => {
        touchEnd.current = null;
        touchStart.current = e.targetTouches[0].clientX;
    };
    const onTouchMove = (e) => {
        touchEnd.current = e.targetTouches[0].clientX;
    };
    const onTouchEnd = () => {
        if (!touchStart.current || !touchEnd.current) return;

        const distance = touchStart.current - touchEnd.current;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;

        if (isRightSwipe && collapsed) {
            setCollapsed(false);
        }

        if (isLeftSwipe && !collapsed) {
            setCollapsed(true);
        }
    };

    return (
        <div className="admin-theme min-h-screen flex flex-col md:flex-row relative"
             onTouchStart={onTouchStart}
             onTouchMove={onTouchMove}
             onTouchEnd={onTouchEnd}>
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 transform ${collapsed ? "-translate-x-full" : "translate-x-0"} md:relative md:translate-x-0 ${collapsed ? "md:w-20" : "md:w-64"} bg-white shadow-lg p-4 flex flex-col transition-all duration-300`}>

                {/* Desktop Toggle Button */}
                <button onClick={() => setCollapsed(!collapsed)} type="button" aria-label="Toggle collapsed"
                        className="hidden md:flex absolute -right-3 top-6 z-50 items-center justify-center transition-all duration-200">
                    {collapsed ? <FaAlignRight size={16}/> : <FaAlignLeft size={16}/>}
                </button>

                {/* Sidebar Header */}
                <h2 className={`text-xl font-bold text-gray-800 mb-2 ${collapsed && "md:hidden"}`}>
                    Admin Panel
                </h2>

                {/* Navigation */}
                <nav className="flex flex-col space-y-4 mt-6">
                    {[
                        {to: "/admin/dashboard", icon: <FaChartBar/>, label: "Dashboard"},
                        {to: "/admin/create", icon: <FaPlus/>, label: "Create Product"},
                        {to: "/admin/users", icon: <FaUsers/>, label: "Manage Users"},
                        {to: "/admin/products", icon: <FaCubes/>, label: "View Products"},
                        {to: "/admin/orders", icon: <FaBox/>, label: "View Orders"},
                    ].map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            onClick={() => window.innerWidth < 768 && setCollapsed(true)}
                            className="flex items-center space-x-2 mb-0 p-3 hover:bg-[var(--nav-hover-bg)] hover:text-[var(--nav-hover-text)] rounded-lg transition-all">
                            <span className="text-xl">{link.icon}</span>
                            <span className={`${collapsed ? "md:hidden" : "block"} font-medium`}>{link.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {!collapsed && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 md:hidden"
                     onClick={() => setCollapsed(true)}/>)}

            {/* Main Content */}
            <main className="flex-1 p-4 md:p-8 bg-[var(--warm-cream)] min-w-0 w-full overflow-x-hidden">
                <Outlet/>
            </main>
        </div>
    );
};

export default AdminLayout;
