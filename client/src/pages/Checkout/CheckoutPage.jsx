import {FiShoppingCart, FiLock, FiTruck, FiCreditCard, FiUnlock} from "react-icons/fi";
import OrderSummary from "../../components/Cart/OrderSummary.jsx";
import {Link, Navigate, useLocation} from "react-router-dom";

import Button from "../../components/User/UI/Button/Button.jsx";
import NiceSelect from "../../components/User/UI/Select/NiceSelect.jsx";

import styles from "./CheckoutPage.module.css";
import {useCheckoutForm} from "../../hooks/checkout/useCheckoutForm.js";


export function CheckoutPage() {
    const location = useLocation();
    const {subtotal, shipping, tax, total, items, applyGiftWrap} = location.state || {};

    const {
        loading,
        message,
        shippingData,
        handleShippingChange,
        paymentData,
        handlePaymentChange,
        country,
        setCountry,
        isFormValid,
        submitOrder
    } = useCheckoutForm();

    if (!subtotal) return <Navigate to="/cart" replace/>;

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitOrder({items, totals: {subtotal, shipping, tax, total}, applyGiftWrap});
    };

    return (<div className={styles.page}>
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
                <form className={styles.formCard} onSubmit={handleSubmit}>
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
                                    autoComplete="given-name"
                                    value={shippingData.firstName}
                                    onChange={handleShippingChange}/>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="last-name">Last name</label>
                                <input
                                    id="last-name"
                                    type="text"
                                    name="lastName"
                                    placeholder="Johnson"
                                    autoComplete="family-name"
                                    value={shippingData.lastName}
                                    onChange={handleShippingChange}/>
                            </div>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="email">Email</label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                value={shippingData.email}
                                onChange={handleShippingChange}/>
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="address">Address</label>
                            <input
                                id="address"
                                type="text"
                                name="address"
                                placeholder="123 Orange Street"
                                autoComplete="street-address"
                                value={shippingData.address}
                                onChange={handleShippingChange}/>
                        </div>

                        <div className={styles.grid3}>
                            <div className={styles.field}>
                                <label htmlFor="country">Country</label>
                                <NiceSelect
                                    value={country}
                                    onChange={setCountry}
                                    options={[{value: "bg", label: "Bulgaria"}, {
                                        value: "de", label: "Germany"
                                    }, {value: "uk", label: "United Kingdom"}, {value: "us", label: "United States"}]}/>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="city">City</label>
                                <input
                                    id="city"
                                    type="text"
                                    name="city"
                                    placeholder="Sofia"
                                    autoComplete="address-level2"
                                    value={shippingData.city}
                                    onChange={handleShippingChange}/>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="postal-code">Postal code</label>
                                <input
                                    id="postal-code"
                                    type="text"
                                    name="postalCode"
                                    placeholder="1000"
                                    autoComplete="postal-code"
                                    value={shippingData.postalCode}
                                    onChange={handleShippingChange}/>
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
                                name="cardHolderName"
                                placeholder="Alex Johnson"
                                value={paymentData.cardHolderName}
                                onChange={handlePaymentChange}/>
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
                                    value={paymentData.cardNumber}
                                    onChange={handlePaymentChange}
                                    maxLength={19}/>
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
                                    value={paymentData.expiry}
                                    onChange={handlePaymentChange}
                                    maxLength={7}/>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="cvc">CVC</label>
                                <input
                                    id="cvc"
                                    type="password"
                                    name="cvc"
                                    placeholder="•••"
                                    value={paymentData.cvc}
                                    onChange={handlePaymentChange}/>
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <Button
                            variant={"full"}
                            size={"md"}
                            type={"submit"}
                            disabled={!isFormValid || loading}>
                            {loading ? "Processing..." : (isFormValid ? <FiUnlock/> : <FiLock/>)}
                            <span>Pay €{total?.toFixed(2)}</span>
                        </Button>

                        {message.text && message.type === "error" && (<div className={styles.errorText}>
                            {message.text}
                        </div>)}

                        <p className={styles.finePrint}>
                            By placing your order, you agree to our{" "}
                            <Link to={'/TODO'} className={styles.inlineLink}>
                                Terms
                            </Link>
                            {" "}
                            and{" "}
                            <Link to={'/TODO'} className={styles.inlineLink}>
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </form>

                {/* Right side – OrderSummary */}
                <div>
                    <OrderSummary
                        subtotal={subtotal}
                        shipping={shipping}
                        tax={tax}
                        total={total}
                        items={items}
                        giftWrap={applyGiftWrap}/>
                </div>
            </section>
        </main>
    </div>);
}
