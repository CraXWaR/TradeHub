import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useAuth} from "../../contex/AuthContext.jsx";

const AdminNavigation = () => {
    const {isAdmin, user, logout, loading} = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && !isAdmin) navigate("/");
    }, [loading, isAdmin, navigate]);

    if (loading || !isAdmin) return null;

    const navItems = [{path: "/admin/dashboard", label: "Dashboard"}, {
        path: "/admin/products", label: "Products"
    }, {path: "/admin/users", label: "Users"},];

    return (<nav
        className="bg-blue-900 text-white border-b border-blue-700 shadow-md relative z-50"
        // force all <a> inside this nav to hover with white (overrides global a:hover via CSS var)
        style={{"--link-hover": "white"}}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Title link: make its own hover a soft blue if you prefer */}
                <Link
                    to="/admin/dashboard"
                    className="text-xl font-bold text-white transition-colors"
                    style={{"--link-hover": "var(--primary-400)"}}
                >
                    ⚙️ Admin Panel
                </Link>

                <div className="hidden lg:flex items-center space-x-2">
                    {navItems.map((item) => (<Link
                        key={item.path}
                        to={item.path}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${location.pathname === item.path ? "bg-blue-700 text-white" : "text-blue-100 hover:bg-blue-800"}`}
                    >
                        {item.label}
                    </Link>))}

                    <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-blue-700">
                          <span className="text-blue-100 font-medium">
                            {user?.name || user?.email}
                          </span>
                        <button
                            onClick={logout}
                            className="px-3 py-2 rounded-md text-sm font-medium transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </nav>);
};

export default AdminNavigation;
