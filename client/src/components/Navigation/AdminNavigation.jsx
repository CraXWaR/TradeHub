import {Link, NavLink, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {FiMenu, FiX} from "react-icons/fi";

import useAuth from "../../hooks/auth/useAuth.js";
import styles from "./AdminNavigation.module.css";

const AdminNavigation = () => {
    const {isAdmin, user, logout, loading} = useAuth();
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (!loading && !isAdmin) {
            navigate("/");
        }
    }, [loading, isAdmin, navigate]);

    if (loading || !isAdmin) return null;

    const navItems = [
        {path: "/admin/dashboard", label: "Dashboard"},
        {path: "/admin/products", label: "Products"},
        {path: "/admin/users", label: "Users"},
    ];

    const openMenu = () => {
        setIsOpen(true);
        setIsAnimating(true);
    };

    const closeMenu = () => {
        setIsOpen(false);
        setIsAnimating(true);
    };

    return (
        <nav
            className={`${styles.navRoot} relative z-50`}
            style={{"--link-hover": "var(--nav-hover-text)"}}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo / title */}
                    <Link
                        to="/admin/dashboard"
                        className="flex items-center space-x-2 group">
                        <span className="text-2xl">⚙️</span>
                        <span
                            className="
                                bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-600
                                bg-clip-text text-transparent text-xl font-bold
                                group-hover:scale-105 transition-transform duration-200">
                            Admin Panel
                        </span>
                    </Link>

                    {/* Desktop nav */}
                    <div className="hidden lg:flex items-center space-x-2">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({isActive}) =>
                                    `${styles.desktopLink} ${
                                        isActive ? styles.desktopLinkActive : ""}`}>
                                {item.label}
                            </NavLink>
                        ))}

                        <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-blue-200/60">
                            <span className="text-sm font-medium text-slate-700">
                                {user?.name || user?.email}
                            </span>
                            <button
                                onClick={logout}
                                className="
                                    px-4 py-2 rounded-full text-sm font-medium
                                    bg-gradient-to-r from-blue-600 to-indigo-600
                                    text-white
                                    hover:from-blue-700 hover:to-indigo-700
                                    hover:shadow-md
                                    transition-all duration-200">
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Mobile hamburger */}
                    <div className="flex items-center lg:hidden">
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
            {isAnimating && (
                <div
                    className={`
                        fixed inset-0 z-40 lg:hidden
                        ${styles.mobileOverlay}
                        ${isOpen ? styles.mobileOverlayOpen : styles.mobileOverlayClose}`}>
                    <div
                        className={styles.mobileOverlayBackdrop}
                        onClick={closeMenu}/>

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
                            <span className={styles.mobileDrawerTitle}>Admin Menu</span>
                            <button
                                type="button"
                                onClick={closeMenu}
                                className={styles.mobileDrawerCloseBtn}
                                aria-label="Close menu">
                                <FiX className="text-xl"/>
                            </button>
                        </div>

                        <div className={styles.mobileDrawerLinks}>
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={closeMenu}
                                    className={({isActive}) =>
                                        `${styles.mobileLink} ${
                                            isActive ? styles.mobileLinkActive : ""}`}>
                                    {item.label}
                                </NavLink>
                            ))}
                        </div>

                        <div className={styles.mobileFooter}>
                            <div className={styles.mobileUser}>
                                <span className={styles.mobileUserName}>
                                    {user?.name || user?.email}
                                </span>
                                <span className={styles.mobileUserStatus}>
                                    Admin • Logged in
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
                        </div>
                    </aside>
                </div>
            )}
        </nav>
    );
};

export default AdminNavigation;
