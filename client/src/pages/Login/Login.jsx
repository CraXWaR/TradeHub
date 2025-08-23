import { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage({ type: '', text: '' });
        
        try {
            // Ensure minimum loading time of 1500ms
            const startTime = Date.now();
            
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });

            const data = await response.json();
            
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, 1500 - elapsedTime);
            
            if (remainingTime > 0) {
                await new Promise(resolve => setTimeout(resolve, remainingTime));
            }

            if (data.success) {
                setMessage({ type: 'success', text: 'Login successful! Redirecting...' });
                
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("user", JSON.stringify(data.data));

                setTimeout(() => {
                    navigate('/');
                }, 1000);
                
            } else {
                setMessage({ type: 'error', text: data.message || 'Login failed' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'Error connecting to server' });
            console.error('Error logging in:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-icon">
                        🔐
                    </div>
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to your TradeHub account</p>
                </div>

                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter your email"
                                required
                            />
                            <div className="input-icon">📧</div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter your password"
                                required
                            />
                            <div className="input-icon">🔒</div>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="checkbox-wrapper">
                            <input type="checkbox" className="checkbox" />
                            <span className="checkbox-label">Remember me</span>
                        </label>
                        <a href="#" className="forgot-link">Forgot password?</a>
                    </div>

                    <button 
                        type="submit" 
                        className={`login-button ${isLoading ? 'loading' : ''}`}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <div className="spinner"></div>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Don't have an account? <Link to="/register" className="register-link">Sign up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
