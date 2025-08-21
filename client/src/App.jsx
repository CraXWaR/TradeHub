import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './components/Home'
import UsersList from './components/UsersList'
import ProductForm from './components/ProductForm'
import RegisterForm from './components/RegisterForm'

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-gray-800 to-gray-700 text-green-400">
                <Navigation />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/users" element={<UsersList />} />
                    <Route path="/create" element={<ProductForm />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App
