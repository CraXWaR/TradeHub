import {Link} from "react-router-dom";
import styles from "./AuthForm.module.css";
import Button from "../User/UI/Button/Button.jsx";

const AuthForm = ({
                      mode = "login", formData, onChange, onSubmit, loading, message,
                  }) => {
    const isRegister = mode === "register";

    return (<>
        {message?.text && (<div
            className={`${styles.message} ${message.type === "success" ? styles.success : message.type === "error" ? styles.error : ""}`}
        >
            {message.text}
        </div>)}

        <form onSubmit={onSubmit} className={styles.form}>
            {isRegister && (<div className={styles.formGroup}>
                <label htmlFor="name" className={styles.formLabel}>
                    Name
                </label>
                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name || ""}
                        onChange={onChange}
                        className={styles.formInput}
                        placeholder="Enter your name"

                    />
                    <div className={styles.inputIcon}>👤</div>
                </div>
            </div>)}

            <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.formLabel}>
                    Email Address
                </label>
                <div className={styles.inputWrapper}>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email || ""}
                        onChange={onChange}
                        className={styles.formInput}
                        placeholder="Enter your email"

                    />
                    <div className={styles.inputIcon}>📧</div>
                </div>
            </div>

            <div className={isRegister ? styles.passwordGrid : ""}>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.formLabel}>
                        Password
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password || ""}
                            onChange={onChange}
                            className={styles.formInput}
                            placeholder={isRegister ? "Create password" : "Enter your password"}

                        />
                        <div className={styles.inputIcon}>🔒</div>
                    </div>
                </div>

                {isRegister && (<div className={styles.formGroup}>
                    <label htmlFor="confirmPassword" className={styles.formLabel}>
                        Confirm Password
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={formData.confirmPassword || ""}
                            onChange={onChange}
                            className={styles.formInput}
                            placeholder="Confirm password"

                        />
                        <div className={styles.inputIcon}>🔐</div>
                    </div>
                </div>)}
            </div>

            {!isRegister && (<div className={styles.formOptions}>
                <label className={styles.checkboxWrapper}>
                    <input type="checkbox" className={styles.checkbox}/>
                    <span className={styles.checkboxLabel}>Remember me</span>
                </label>
                <Link to="#" className={styles.forgotLink}>
                    Forgot password?
                </Link>
            </div>)}

            <Button
                type="submit"
                variant="full"
                size="lg"
                loading={loading}>
                {isRegister ? (loading ? "Creating Account..." : "Create Account") : (loading ? "Signing in..." : "Sign In")}
            </Button>

        </form>

        <div className={styles.footer}>
            {isRegister ? (<p>
                Already have an account?{" "}
                <Link to="/login" className={styles.linkLogin}>
                    Sign in
                </Link>
            </p>) : (<p>
                Don&apos;t have an account?{" "}
                <Link to="/register" className={styles.linkRegister}>
                    Sign up
                </Link>
            </p>)}
        </div>
    </>);
};

export default AuthForm;
