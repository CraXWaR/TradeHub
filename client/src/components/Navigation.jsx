import { useState, useEffect, useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

const Navigation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            const storedUser = localStorage.getItem("user");
            const storedToken = localStorage.getItem("token");

            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            } else {
                setUser(null);
                setToken(null);
            }
        };

        checkAuth();
        window.addEventListener("storage", checkAuth);
        return () => window.removeEventListener("storage", checkAuth);
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setToken(null);
        setIsMobileMenuOpen(false);
        navigate("/");
    };

    const navItems = useMemo(() => {
        const base = [
            { path: "/", label: "Home" },
            { path: "/users", label: "Users" },
        ];
        return token
            ? [...base, { path: "/create", label: "Create Product" }]
            : [...base, { path: "/login", label: "Login" }];
    }, [token]);

    const NavLinks = ({ onClick, mobile = false }) =>
        navItems.map((item) => (
            <Link
                key={item.path}
                to={item.path}
                onClick={onClick}
                className={`px-4 py-2 rounded-${mobile ? "lg" : "full"} text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                        ? "bg-gradient-to-r from-orange-500 to-red-500 text-orange-50 shadow-lg"
                        : "text-gray-700 hover:bg-orange-100 hover:text-orange-600 hover:shadow-md"
                }`}>
                {item.label}
            </Link>
        ));

    const UserSection = ({ mobile = false }) =>
        token &&
        user && (
            <div
                className={`${
                    mobile ? "mt-6 border-t pt-4" : "flex items-center space-x-3 ml-4 pl-4 border-l"
                } border-orange-200`}>
                <span className="text-gray-700 font-medium">
                    Welcome, {user.name || user.email}
                </span>
                <button
                    onClick={handleLogout}
                    className={`${
                        mobile
                            ? "w-full px-4 py-2 rounded-lg"
                            : "px-4 py-2 rounded-full"
                    } bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium hover:from-red-600 hover:to-red-700 hover:shadow-md transition-all duration-200`}>
                    Logout
                </button>
            </div>
        );

    return (
        <>
            <nav className="bg-white/95 backdrop-blur-sm border-b border-orange-200 shadow-lg relative z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link
                            to="/"
                            className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent text-xl font-bold hover:scale-105 transition-transform duration-200"
                        >
                            🚀 TradeHub
                        </Link>

                        <div className="hidden lg:flex items-center space-x-2">
                            <NavLinks />
                            <UserSection />
                        </div>

                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(true)}
                                className="p-2 text-gray-700 hover:text-orange-600 focus:outline-none"
                            >
                                ☰
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {createPortal(
                <>
                    <div
                        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
                            isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    ></div>

                    <div
                        className={`fixed right-0 top-0 z-50 h-screen w-72 max-w-[85%] bg-white shadow-2xl border-l border-orange-200 transform transition-transform duration-300 ease-out lg:hidden rounded-l-2xl p-6 flex flex-col ${
                            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                        }`}>
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="self-end mb-6 text-gray-500 hover:text-red-500 text-2xl font-bold"
                        >
                            ✖
                        </button>

                        <div className="flex flex-col space-y-4">
                            <NavLinks onClick={() => setIsMobileMenuOpen(false)} mobile />
                            <UserSection mobile />
                        </div>
                    </div>
                </>,
                document.body
            )}
        </>
    );
};

export default Navigation;
