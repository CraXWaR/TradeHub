import {FiShoppingCart, FiLock, FiTruck, FiCreditCard} from "react-icons/fi";
import OrderSummary from "../../components/Cart/OrderSummary.jsx";
import {Navigate, useLocation} from "react-router-dom";

import styles from "./CheckoutPage.module.css";

export default function CheckoutPage() {
    const location = useLocation();
    const {subtotal, shipping, tax, total} = location.state || {};

    const hasSummaryData =
        typeof subtotal === "number" &&
        typeof shipping === "number" &&
        typeof tax === "number" &&
        typeof total === "number";

    if (!hasSummaryData) {
        return <Navigate to="/cart" replace/>;
    }

    return (
        <div className={styles.page}>
            <main className={styles.shell}>
                {/* Header */}
                <header className={styles.header}>
                    <div className={styles.badge}>
                        <FiShoppingCart/>
                    </div>

                    <div>
                        <h1 className={styles.title}>Checkout</h1>
                        <p className={styles.subtitle}>
                            Enter your details to complete your order securely.
                        </p>
                    </div>

                    <div className={styles.stepIndicator} aria-hidden="true">
                        <span className={styles.stepDotActive}/>
                        <span className={styles.stepDot}/>
                        <span className={styles.stepDot}/>
                    </div>
                </header>

                {/* Content */}
                <section className={styles.content}>
                    {/* Left side – shipping + payment */}
                    <div className={styles.formCard}>
                        {/* Shipping */}
                        <section
                            className={styles.formSection}
                            aria-labelledby="shipping-heading">
                            <div className={styles.sectionHeading}>
                                <h2 id="shipping-heading">Shipping details</h2>
                                <span className={styles.sectionTag}>
                                    <FiTruck/>
                                    <span>Fast delivery options</span>
                                </span>
                            </div>

                            <div className={styles.grid2}>
                                <div className={styles.field}>
                                    <label htmlFor="first-name">First name</label>
                                    <input
                                        id="first-name"
                                        type="text"
                                        name="firstName"
                                        placeholder="Alex"
                                        autoComplete="given-name"/>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="last-name">Last name</label>
                                    <input
                                        id="last-name"
                                        type="text"
                                        name="lastName"
                                        placeholder="Johnson"
                                        autoComplete="family-name"/>
                                </div>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="email">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"/>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="address">Address</label>
                                <input
                                    id="address"
                                    type="text"
                                    name="address"
                                    placeholder="123 Orange Street"
                                    autoComplete="street-address"/>
                            </div>

                            <div className={styles.grid3}>
                                <div className={styles.field}>
                                    <label htmlFor="city">City</label>
                                    <input
                                        id="city"
                                        type="text"
                                        name="city"
                                        placeholder="Sofia"
                                        autoComplete="address-level2"/>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="postal-code">Postal code</label>
                                    <input
                                        id="postal-code"
                                        type="text"
                                        name="postalCode"
                                        placeholder="1000"
                                        autoComplete="postal-code"/>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="country">Country</label>
                                    <select id="country" name="country" defaultValue="bg">
                                        <option value="bg">Bulgaria</option>
                                        <option value="de">Germany</option>
                                        <option value="uk">United Kingdom</option>
                                        <option value="us">United States</option>
                                    </select>
                                </div>
                            </div>
                        </section>

                        {/* Payment */}
                        <section
                            className={styles.formSection}
                            aria-labelledby="payment-heading">
                            <div className={styles.sectionHeading}>
                                <h2 id="payment-heading">Payment</h2>
                                <span className={styles.sectionTag}>
                                    <FiLock/>
                                    <span>Secure & encrypted</span>
                                </span>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="cardholder-name">Cardholder name</label>
                                <input
                                    id="cardholder-name"
                                    type="text"
                                    name="cardholderName"
                                    placeholder="Alex Johnson"
                                    autoComplete="cc-name"/>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="card-number">Card number</label>
                                <div className={styles.inputWithIcon}>
                                    <FiCreditCard/>
                                    <input
                                        id="card-number"
                                        type="text"
                                        name="cardNumber"
                                        inputMode="numeric"
                                        placeholder="4242 4242 4242 4242"
                                        autoComplete="cc-number"/>
                                </div>
                            </div>

                            <div className={styles.grid3}>
                                <div className={styles.field}>
                                    <label htmlFor="expiry">Expiry</label>
                                    <input
                                        id="expiry"
                                        type="text"
                                        name="expiry"
                                        placeholder="MM / YY"
                                        autoComplete="cc-exp"/>
                                </div>

                                <div className={styles.field}>
                                    <label htmlFor="cvc">CVC</label>
                                    <input
                                        id="cvc"
                                        type="password"
                                        name="cvc"
                                        placeholder="•••"
                                        autoComplete="cc-csc"/>
                                </div>

                                <div className={styles.field}>
                                    <label className={styles.checkboxLabel}>
                                        <input
                                            type="checkbox"
                                            name="saveCard"
                                            className={styles.checkbox}/>
                                        <span>Save card for future orders</span>
                                    </label>
                                </div>
                            </div>
                        </section>

                        {/* Actions */}
                        <div className={styles.actions}>
                            <button type="submit" className={styles.primaryButton}>
                                <FiLock/>
                                <span>Pay €{total.toFixed(2)}</span>
                            </button>
                            <p className={styles.finePrint}>
                                By placing your order, you agree to our{" "}
                                <button type="button" className={styles.inlineLink}>
                                    Terms
                                </button>
                                {" "}
                                and{" "}
                                <button type="button" className={styles.inlineLink}>
                                    Privacy Policy
                                </button>
                                .
                            </p>
                        </div>
                    </div>

                    {/* Right side – OrderSummary */}
                    <div>
                        <OrderSummary
                            subtotal={subtotal}
                            shipping={shipping}
                            tax={tax}
                            total={total}/>
                    </div>
                </section>
            </main>
        </div>
    );
}
