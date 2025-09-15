import "./App.css";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import Home from "./components/Home";
import UsersList from "./components/UsersList";
import CreateProductPage from "./pages/Admin/CreateProduct/CreateProductPage.jsx";
import LoginPage from "./pages/Login/LoginPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import Products from "./pages/Products/Products";
import ProductDetail from "./pages/ProductDetail/ProductDetail";

import {AuthProvider, useAuth} from "./contex/AuthContext.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import AdminDashboardPage from "./pages/Admin/Dashboard/AdminDashboard.jsx";
import AdminNavigation from "./components/Navigation/AdminNavigation.jsx";
import UserNavigation from "./components/Navigation/UserNavigation.jsx";

function AppShell() {
    const {isAdmin, loading} = useAuth();
    if (loading) return null;

    return (
        <div
            className={`min-h-screen flex flex-col bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-green-400 ${isAdmin ? "admin-theme" : ""}`}>
            {isAdmin ? <AdminNavigation/> : <UserNavigation/>}

            <main className="flex-1">
                {/* remove the inner admin-theme wrapper */}
                <div>
                    <Routes>
                        {/* Public/User routes */}
                        <Route path="/" element={<Home/>}/>
                        <Route path="/products" element={<Products/>}/>
                        <Route path="/products/:id" element={<ProductDetail/>}/>
                        <Route path="/register" element={<RegisterPage/>}/>
                        <Route path="/login" element={<LoginPage/>}/>
                        <Route path="/unauthorized" element={<Unauthorized/>}/>

                        {/* Admin routes (protected) */}
                        <Route element={<ProtectedRoute role="admin"/>}>
                            <Route path="/admin" element={<AdminLayout/>}>
                                <Route path="dashboard" element={<AdminDashboardPage/>}/>
                                <Route path="create" element={<CreateProductPage/>}/>
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
