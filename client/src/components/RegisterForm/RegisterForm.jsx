import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./RegisterForm.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        name: "", email: "", password: "", confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({type: "", text: ""});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({type: "", text: ""});

        if (formData.password !== formData.confirmPassword) {
            setMessage({type: "error", text: "Passwords do not match"});
            setLoading(false);
            return;
        }

        try {
            const startTime = Date.now();

            const response = await fetch(`${BASE_URL}/api/users/register`, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({
                    name: formData.name, email: formData.email, password: formData.password,
                }),
            });

            const data = await response.json();

            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, 1500 - elapsedTime);
            if (remainingTime > 0) {
                await new Promise((resolve) => setTimeout(resolve, remainingTime));
            }

            if (data.success) {
                setMessage({type: "success", text: "User registered successfully!"});
                setFormData({
                    name: "", email: "", password: "", confirmPassword: "",
                });
                setTimeout(() => navigate("/login"), 1000);
            } else {
                setMessage({type: "error", text: data.message || "Failed to register user"});
            }
        } catch (error) {
            console.error("Error registering user:", error);
            setMessage({type: "error", text: "Error connecting to server"});
        } finally {
            setLoading(false);
        }
    };

    return (<>
            {message.text && (<div className={`message ${message.type}`}>
                    {message.text}
                </div>)}

            <form onSubmit={handleSubmit} className="register-form">
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Name</label>
                    <div className="input-wrapper">
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="Enter your Name"
                            required
                        />
                        <div className="input-icon">👤</div>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
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

                <div className="password-grid">
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Create password"
                                required
                            />
                            <div className="input-icon">🔒</div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <div className="input-wrapper">
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Confirm password"
                                required
                            />
                            <div className="input-icon">🔐</div>
                        </div>
                    </div>
                </div>

                <button
                    type="submit"
                    className={`register-button ${loading ? "loading" : ""}`}
                    disabled={loading}
                >
                    {loading ? (<>
                            <div className="spinner"></div>
                            Creating Account...
                        </>) : ("Create Account")}
                </button>
            </form>

            <div className="register-footer">
                <p>
                    Already have an account?{" "}
                    <Link to="/login" className="login-link">Sign in</Link>
                </p>
            </div>
        </>);
};

export default RegisterForm;
