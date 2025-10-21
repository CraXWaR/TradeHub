import "./App.css";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

import Home from "./components/Home";
import UsersList from "./components/UsersList";
import CreateProductPage from "./pages/Admin/CreateProduct/CreateProductPage.jsx";
import LoginPage from "./pages/Auth/Login/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";
import ProfilePage from "./pages/User/Profile/ProfilePage.jsx";

import AuthProvider from "./contex/AuthProvider.jsx";

import Unauthorized from "./pages/Unauthorized.jsx";
import RegisterPage from "./pages/Auth/Register/RegisterPage.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import AdminDashboardPage from "./pages/Admin/Dashboard/AdminDashboard.jsx";
import AdminNavigation from "./components/Navigation/AdminNavigation.jsx";
import UserNavigation from "./components/Navigation/UserNavigation.jsx";
import AdminProductsPage from "./pages/Admin/Products/AdminPorductsPage.jsx";
import UserLayout from "./components/User/UserLayout.jsx";
import UserOverviewPage from "./pages/User/Profile/OverviewPage.jsx";
import UserOrdersPage from "./pages/User/Profile/OrdersPage.jsx";
import UserWishlistPage from "./pages/User/Profile/WishlistPage.jsx";
import UserSettingsPage from "./pages/User/Profile/SettingsPage.jsx";
import useAuth from "./hooks/auth/useAuth.js";

function AppShell() {
    const {isAdmin, loading} = useAuth();
    if (loading) return null;

    return (
        <div
            className={`min-h-screen flex flex-col bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-green-400 ${isAdmin ? "admin-theme" : ""}`}>
            {isAdmin ? <AdminNavigation/> : <UserNavigation/>}

            <main className="flex-1">
                <div>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<Home/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/products/:id" element={<ProductDetail/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/unauthorized" element={<Unauthorized/>}/>

                        {/* User routes */}
                        <Route element={<ProtectedRoute role="user"/>}>
                            <Route path="/user" element={<UserLayout/>}>
                                <Route index element={<Navigate to="overview" replace/>}/>
                                <Route path="overview" element={<UserOverviewPage/>}/>
                                <Route path="profile" element={<ProfilePage/>}/>
                                <Route path="orders" element={<UserOrdersPage/>}/>
                                <Route path="wishlist" element={<UserWishlistPage/>}/>
                                <Route path="settings" element={<UserSettingsPage/>}/>
                            </Route>
                        </Route>

                        {/* Admin routes (protected) */}
                        <Route element={<ProtectedRoute role="admin"/>}>
                            <Route path="/admin" element={<AdminLayout/>}>
                                <Route path="dashboard" element={<AdminDashboardPage/>}/>
                                <Route path="create" element={<CreateProductPage/>}/>
                                <Route path="products" element={<AdminProductsPage/>}/>
                                <Route path="users" element={<UsersList/>}/>
                            </Route>
                        </Route>
                    </Routes>
                </div>
            </main>
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <Router>
                <AppShell/>
            </Router>
        </AuthProvider>
    );
}
