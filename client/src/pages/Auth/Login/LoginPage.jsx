import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {useLogin} from "../../../hooks/auth/useLogin.js";
import AuthForm from "../../../components/AuthForm/AuthForm.jsx";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const successFromRegister = location.state?.successMessage || null;

    const {
        formData, handleChange, handleSubmit, loading, message,
    } = useLogin({initialMessage: successFromRegister});

    useEffect(() => {
        if (location.state?.successMessage) {
            navigate(location.pathname, {replace: true, state: null});
        }
    }, [location, navigate]);

    return (<div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.icon}>🔐</div>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to your TradeHub account</p>
                </div>

                <AuthForm
                    mode="login"
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    loading={loading}
                    message={message}
                />
            </div>
        </div>);
};

export default LoginPage;