import RegisterForm from "../../components/Register/RegisterForm";

const RegisterPage = () => {
    return (<div className="register-container">
            <div className="register-card">
                <div className="register-header">
                    <div className="register-icon">👤</div>
                    <h1 className="register-title">Create Account</h1>
                    <p className="register-subtitle">
                        Join TradeHub and start your marketplace journey
                    </p>
                </div>
                <RegisterForm/>
            </div>
        </div>);
};

export default RegisterPage;
