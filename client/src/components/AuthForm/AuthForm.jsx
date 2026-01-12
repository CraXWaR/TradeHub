import {Link} from "react-router-dom";
import styles from "./AuthForm.module.css";
import Button from "../User/UI/Button/Button.jsx";
import {useState} from "react";
import {LuEye, LuEyeOff, LuLock, LuMail, LuUser} from "react-icons/lu";

export const AuthForm = ({
                      mode = "login", formData, onChange, onSubmit, loading, message,
                  }) => {
    const isRegister = mode === "register";
    const [showPassword, setShowPassword] = useState(false);

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
                    <div className={styles.inputIcon}><LuUser size={20} /></div>
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
                    <div className={styles.inputIcon}><LuMail size={20} /></div>
                </div>
            </div>

            <div className={isRegister ? styles.passwordGrid : ""}>
                <div className={styles.formGroup}>
                    <label htmlFor="password" className={styles.formLabel}>Password</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={formData.password || ""}
                            onChange={onChange}
                            className={styles.formInput}
                            placeholder={isRegister ? "Create password" : "Enter your password"}
                        />
                        <div className={styles.inputIcon}><LuLock size={20} /></div>

                        <button
                            type="button"
                            className={styles.eyeBtn}
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex="-1">
                            {showPassword ? <LuEyeOff size={22} /> : <LuEye size={22} />}
                        </button>
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
                        <div className={styles.inputIcon}><LuLock size={20} /></div>
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