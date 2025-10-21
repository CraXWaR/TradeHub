import {NavLink} from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth.js";

const UserNavigation = () => {
    const {isAuthenticated, user, logout, loading} = useAuth();
    if (loading) return null;

    const baseItems = [
        {path: "/", label: "Home"},
        {path: "/products", label: "Products"},
    ];

    const authItems = isAuthenticated ? [{path: "/user/profile", label: "Profile"}] : [];
    const guestItems = !isAuthenticated ? [{path: "/login", label: "Login"}] : [];

    const navItems = [...baseItems, ...authItems, ...guestItems];

    return (
        <nav
            className="bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-lg relative z-50"
            style={{"--link-hover": "var(--nav-hover-text)"}}>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <NavLink
                        to="/"
                        className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent text-xl font-bold hover:scale-105 transition-transform duration-200">
                        🚀 TradeHub
                    </NavLink>

                    <div className="hidden lg:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({isActive}) =>
                                    `px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? "bg-gradient-to-r from-orange-500 to-red-500 text-orange-50 shadow-lg"
                                            : "text-gray-700 hover:bg-[var(--nav-hover-bg)] hover:text-[var(--nav-hover-text)] hover:shadow-md"
                                    }`
                                }>
                                {item.label}
                            </NavLink>
                        ))}

                        {isAuthenticated && (
                            <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-orange-200">
                                <span className="text-gray-700 font-medium">
                                  Welcome, {user?.name || user?.email}
                                </span>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium hover:from-red-600 hover:to-red-700 hover:shadow-md transition-all duration-200">
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default UserNavigation;
