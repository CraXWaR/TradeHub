import {Link} from "react-router-dom";
import {useLogin} from "../../hooks/useLogin";
import './LoginForm.css';

const LoginForm = () => {
    const {formData, handleChange, handleSubmit, loading, message} = useLogin();

    return (<>
        {message.text && (<div className={`message ${message.type}`}>{message.text}</div>)}

        <form onSubmit={handleSubmit} className="login-form">
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
                        placeholder="Enter your password"
                        required
                    />
                    <div className="input-icon">🔒</div>
                </div>
            </div>

            <div className="form-options">
                <label className="checkbox-wrapper">
                    <input type="checkbox" className="checkbox"/>
                    <span className="checkbox-label">Remember me</span>
                </label>
                <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button
                type="submit"
                className={`login-button ${loading ? "loading" : ""}`}
                disabled={loading}
            >
                {loading ? (<>
                    <div className="spinner"></div>
                    Signing in...
                </>) : ("Sign In")}
            </button>
        </form>

        <div className="login-footer">
            <p>
                Don't have an account?{" "}
                <Link to="/register" className="register-link">Sign up</Link>
            </p>
        </div>
    </>);
};

export default LoginForm;
