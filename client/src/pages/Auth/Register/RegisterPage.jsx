import styles from "./RegisterPage.module.css";
import {useRegister} from "../../../hooks/auth/useRegister.js";
import AuthForm from "../../../components/AuthForm/AuthForm.jsx";

const RegisterPage = () => {
    const {formData, handleChange, handleSubmit, loading, message} = useRegister();

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <div className={styles.icon}>👤</div>
                    <h1 className={styles.title}>Create Account</h1>
                    <p className={styles.subtitle}>
                        Join TradeHub and start your marketplace journey
                    </p>
                </div>

                <AuthForm
                    mode="register"
                    formData={formData}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    loading={loading}
                    message={message}
                />
            </div>
        </div>
    );
};

export default RegisterPage;
