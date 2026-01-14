// ─── Core & Global ──────────────────────────────────────────────
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// ─── Context Providers / Hooks ──────────────────────────────────
import AuthProvider from "./contex/AuthProvider.jsx";
import CartProvider from "./contex/cart-context.jsx";
import useAuth from "./hooks/auth/useAuth.js";

// ─── Layout Components ──────────────────────────────────────────
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import UserLayout from "./components/User/UserLayout.jsx";

// ─── Navigation Components ──────────────────────────────────────
import AdminNavigation from "./components/Navigation/Admin/AdminNavigation.jsx";
import UserNavigation from "./components/Navigation/User/UserNavigation.jsx";
import Footer from "./components/General/Footer/Footer.jsx";

// ─── Shared / Utility Components ────────────────────────────────
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/General/Unauthorized/Unauthorized.jsx";
import UsersList from "./components/UsersList";

// ─── Pages: Authentication ──────────────────────────────────────
import LoginPage from "./pages/Auth/Login/LoginPage.jsx";
import RegisterPage from "./pages/Auth/Register/RegisterPage.jsx";

// ─── Pages: Admin ───────────────────────────────────────────────
import AdminDashboardPage from "./pages/Admin/Dashboard/AdminDashboard.jsx";
import CreateProductPage from "./pages/Admin/CreateProduct/CreateProductPage.jsx";
import AdminProductsPage from "./pages/Admin/Products/AdminPorductsPage.jsx";
import OrdersList from "./pages/Admin/Orders/OrdersList.jsx";

// ─── Pages: User Profile / Account ──────────────────────────────
import ProfilePage from "./pages/User/Profile/ProfilePage.jsx";
import OverviewPage from "./pages/User/Overview/OverviewPage.jsx";
import OrdersPage from "./pages/User/Orders/OrdersPage.jsx";
import WishlistPage from "./pages/User/Wishlist/WishlistPage.jsx";
import SettingsPage from "./pages/User/Settings/SettingsPage.jsx";

// ─── Pages: Shop / Public ───────────────────────────────────────
import HomePage from "./pages/General/Home/HomePage.jsx";
import Products from "./pages/General/Products/Products";
import ProductDetail from "./pages/General/ProductDetail/ProductDetail";
import CartPage from "./pages/General/Cart/CartPage.jsx";
import CheckoutPage from "./pages/General/Checkout/CheckoutPage.jsx";
import NotFound from "./pages/General/NotFound/NotFound.jsx";
import OrderSuccessPage from "./pages/General/OrderSuccess/OrderSuccessPage.jsx";

function AppShell() {
    const {isAdmin, loading} = useAuth();
    if (loading) return null;

    return (
        <div
            className={`min-h-screen flex flex-col bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-blue-400 ${isAdmin ? "admin-theme" : ""}`}>
            {isAdmin ? <AdminNavigation/> : <UserNavigation/>}

            <main className="flex-1">
                <div>
                    <Routes>
                        {/* Public routes */}
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/products/:id" element={<ProductDetail/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/unauthorized" element={<Unauthorized/>}/>

                        <Route path="/cart" element={<CartPage/>}/>
                        <Route path="/checkout" element={<CheckoutPage/>}/>
                        <Route path="/order-success/:orderId" element={<OrderSuccessPage/>}/>

                        {/* User routes */}
                        <Route element={<ProtectedRoute role="user"/>}>
                            <Route path="/user" element={<UserLayout/>}>
                                <Route index element={<Navigate to="overview" replace/>}/>
                                <Route path="overview" element={<OverviewPage/>}/>
                                <Route path="profile" element={<ProfilePage/>}/>
                                <Route path="orders" element={<OrdersPage/>}/>
                                <Route path="wishlist" element={<WishlistPage/>}/>
                                <Route path="settings" element={<SettingsPage/>}/>
                            </Route>
                        </Route>

                        {/* Admin routes (protected) */}
                        <Route element={<ProtectedRoute role="admin"/>}>
                            <Route path="/admin" element={<AdminLayout/>}>
                                <Route path="dashboard" element={<AdminDashboardPage/>}/>
                                <Route path="create" element={<CreateProductPage/>}/>
                                <Route path="products" element={<AdminProductsPage/>}/>
                                <Route path="users" element={<UsersList/>}/>
                                <Route path="orders" element={<OrdersList/>}/>
                            </Route>
                        </Route>

                        {/*Not Found*/}
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </main>

            <Footer />
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <AppShell/>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}
