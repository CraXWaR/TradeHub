import {useState} from "react";
import {NavLink} from "react-router-dom";
import {FiShoppingCart, FiMenu, FiX} from "react-icons/fi";

import useAuth from "../../hooks/auth/useAuth.js";
import {useCartStore} from "../../contex/cart-context.jsx";

import styles from "./UserNavigation.module.css";

const UserNavigation = () => {
    const {isAuthenticated, user, logout, loading} = useAuth();
    const {cartCount} = useCartStore();
    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    if (loading) return null;

    const baseItems = [{path: "/", label: "Home"}, {path: "/products", label: "Products"},];

    const authItems = isAuthenticated ? [{path: "/user/profile", label: "Profile"}] : [];
    const guestItems = !isAuthenticated ? [{path: "/login", label: "Login"}] : [];

    const navItems = [...baseItems, ...authItems, ...guestItems];

    const openMenu = () => {
        setIsOpen(true);
        setIsAnimating(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setIsAnimating(true);
    };

    return (<nav
        className={`${styles.navRoot} relative z-50`}
        style={{"--link-hover": "var(--nav-hover-text)"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                {/* Logo */}
                <NavLink
                    to="/"
                    className="flex items-center space-x-2 group">
                    <span className="text-2xl">🚀</span>
                    <span
                        className="bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent text-xl font-bold group-hover:scale-105 transition-transform duration-200">
                            TradeHub
                        </span>
                </NavLink>

                {/* Desktop nav */}
                <div className="hidden lg:flex items-center space-x-2">
                    {navItems.map((item) => (<NavLink
                        key={item.path}
                        to={item.path}
                        className={({isActive}) => `${styles.desktopLink} ${isActive ? styles.desktopLinkActive : ""}`}>
                        {item.label}
                    </NavLink>))}

                    <NavLink
                        to="/cart"
                        aria-label="Cart"
                        className={({isActive}) => `${styles.cartButton} ${isActive ? styles.cartButtonActive : ""}`}>
                        <FiShoppingCart className="text-xl"/>
                        {cartCount > 0 && (<span className={styles.cartBadge}>
                                    {cartCount}
                                </span>)}
                    </NavLink>

                    {isAuthenticated && (
                        <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-orange-200/70">
                                <span className="text-gray-700 text-sm font-medium">
                                  Welcome,{" "}
                                    <span className="font-semibold">
                                        {user?.name || user?.email}
                                    </span>
                                </span>
                            <button
                                onClick={logout}
                                className="px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-medium hover:from-red-600 hover:to-red-700 hover:shadow-md transition-all duration-200">
                                Logout
                            </button>
                        </div>)}
                </div>

                {/* Mobile hamburger */}
                <div className="flex items-center space-x-2 lg:hidden">
                    <button
                        type="button"
                        onClick={() => (isOpen ? closeMenu() : openMenu())}
                        className={styles.hamburgerBtn}
                        aria-label="Toggle navigation">
                        {isOpen ? <FiX className="text-2xl"/> : <FiMenu className="text-2xl"/>}
                    </button>
                </div>
            </div>
        </div>

        {/* Mobile sidebar */}
        {isAnimating && (<div
                className={`
            fixed inset-0 z-40 lg:hidden
            ${styles.mobileOverlay}
            ${isOpen ? styles.mobileOverlayOpen : styles.mobileOverlayClose}`}>
                <div
                    className={styles.mobileOverlayBackdrop}
                    onClick={closeMenu}
                />

                <aside
                    className={`
                ${styles.mobileDrawer}
                ${isOpen ? styles.mobileDrawerOpen : styles.mobileDrawerClose}`}
                    onAnimationEnd={() => {
                        if (!isOpen) {
                            setIsAnimating(false);
                        }
                    }}>
                    <div className={styles.mobileDrawerHeader}>
                        <span className={styles.mobileDrawerTitle}>Menu</span>
                        <button
                            type="button"
                            onClick={closeMenu}
                            className={styles.mobileDrawerCloseBtn}
                            aria-label="Close menu">
                            <FiX className="text-xl"/>
                        </button>
                    </div>

                    <div className={styles.mobileDrawerLinks}>
                        {navItems.map((item) => (<NavLink
                                key={item.path}
                                to={item.path}
                                onClick={closeMenu}
                                className={({isActive}) => `${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`}>
                                {item.label}
                            </NavLink>))}

                        <NavLink
                            to="/cart"
                            onClick={closeMenu}
                            className={({isActive}) => `${styles.mobileLink} ${styles.mobileLinkCart} ${isActive ? styles.mobileLinkActive : ""}`}>
                            <span>Cart</span>
                            <span className={styles.mobileCartRight}>
                        <FiShoppingCart/>
                                {cartCount > 0 && (<span className={styles.mobileCartBadge}>
                                {cartCount}
                            </span>)}
                    </span>
                        </NavLink>
                    </div>

                    <div className={styles.mobileFooter}>
                        {isAuthenticated ? (<>
                                <div className={styles.mobileUser}>
                            <span className={styles.mobileUserName}>
                                {user?.name || user?.email}
                            </span>
                                    <span className={styles.mobileUserStatus}>
                                Logged in
                            </span>
                                </div>
                                <button
                                    onClick={() => {
                                        closeMenu();
                                        logout();
                                    }}
                                    className={styles.mobileLogoutBtn}>
                                    Logout
                                </button>
                            </>) : (<p className={styles.mobileHint}>
                                Log in to see your profile and order history.
                            </p>)}
                    </div>
                </aside>
            </div>)}
    </nav>);
};

export default UserNavigation;
