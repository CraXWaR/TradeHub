import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import UsersList from './components/UsersList'
import CreateProduct from './pages/CreateProduct/CreateProduct'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Products from './pages/Products/Products'
import ProductDetail from './pages/ProductDetail/ProductDetail'
import { AuthProvider } from './contex/AuthContext'

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="min-h-screen flex flex-col bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-green-400">
                    <Navigation />
                    <main className="flex-1">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/users" element={<UsersList />} />
                            <Route path="/create" element={
                                <ProtectedRoute>
                                    <CreateProduct />
                                </ProtectedRoute>
                            } />
                            <Route path="/login" element={<Login />} />
                            <Route path="/products/:id" element={<ProductDetail />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App

