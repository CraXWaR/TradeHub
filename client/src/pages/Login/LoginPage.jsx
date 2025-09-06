import LoginForm from "../../components/LoginForm/LoginForm.jsx";

const LoginPage = () => {
    return (<div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <div className="login-icon">🔐</div>
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Sign in to your TradeHub account</p>
                </div>
                <LoginForm/>
            </div>
        </div>);
};

export default LoginPage;
