import {Link} from "react-router-dom";
import {useRegister} from "../../hooks/useRegister.js";
import "./RegisterForm.css";

const RegisterForm = () => {
    const {formData, handleChange, handleSubmit, loading, message} = useRegister();

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
