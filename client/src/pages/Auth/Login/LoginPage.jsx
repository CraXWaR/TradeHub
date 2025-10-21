import {useLogin} from "../../../hooks/auth/useLogin.js";
import AuthForm from "../../../components/AuthForm/AuthForm.jsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
    const {formData, handleChange, handleSubmit, loading, message} = useLogin();
    const location = useLocation();
    const navigate = useNavigate();

    const [entryMessage, setEntryMessage] = useState(
        location.state?.successMessage || null
    );

    useEffect(() => {
        if (location.state?.successMessage) {
            navigate(location.pathname, {replace: true, state: null});
        }
    }, [location, navigate]);

    const onSubmit = (e) => {
        if (entryMessage) setEntryMessage(null);
        handleSubmit(e);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.icon}>🔐</div>
                    <h1 className={styles.title}>Welcome Back</h1>
                    <p className={styles.subtitle}>Sign in to your TradeHub account</p>
                </div>
                {entryMessage && (
                    <div className={`${styles.banner} ${styles.success}`}>
                        {entryMessage}
                    </div>
                )}
                <AuthForm
                    mode="login"
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    loading={loading}
                    message={message}
                    onSubmit={onSubmit}
                />
            </div>
        </div>
    );
};

export default LoginPage;
