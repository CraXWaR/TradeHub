import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import UsersList from './components/UsersList'
import CreateProduct from './pages/CreateProduct/CreateProduct'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
    return (
        <Router>
            <div className="min-h-screen flex flex-col bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-green-400">
                <Navigation />
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/users" element={<UsersList />} />
                        <Route path="/create" element={
                            <ProtectedRoute>
                                <CreateProduct />
                            </ProtectedRoute>
                        } />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App
