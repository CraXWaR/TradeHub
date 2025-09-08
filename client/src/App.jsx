import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import UsersList from './components/UsersList';
import CreateProductPage from './pages/Admin/CreateProduct/CreateProductPage.jsx';
import RegisterForm from './components/RegisterForm/RegisterForm.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import ProtectedRoute from './components/ProtectedRoute';
import Products from './pages/Products/Products';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import {AuthProvider} from './contex/AuthContext';

import Unauthorized from "./pages/Unauthorized.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import RegisterPage from "./pages/Register/RegisterPage.jsx";

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-green-400">
                    <Navigation />
                    <main className="flex-1">
                        <Routes>
                            {/* User routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/users" element={<UsersList />} />
                            <Route path="/register" element={<RegisterPage />} />

                            <Route path="/login" element={<LoginPage />} />
                            <Route path="/products/:id" element={<ProductDetail />} />
                            <Route path="/unauthorized" element={<Unauthorized />} />

                            {/* Admin routes */}
                            <Route path="/admin" element={<ProtectedRoute role="admin" />}>
                                <Route path="dashboard" element={<AdminDashboard />} />
                                <Route path="create" element={<CreateProductPage />} />
                            </Route>
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>

    );
}

export default App

