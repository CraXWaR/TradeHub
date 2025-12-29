import {FiShoppingCart, FiLock, FiTruck, FiCreditCard, FiUnlock} from "react-icons/fi";
import OrderSummary from "../../components/Cart/OrderSummary.jsx";
import {Link, Navigate, useLocation} from "react-router-dom";
import {useState} from "react";

import Button from "../../components/User/UI/Button/Button.jsx";
import NiceSelect from "../../components/User/UI/Select/NiceSelect.jsx";

import styles from "./CheckoutPage.module.css";

const BASE_URL = import.meta.env.VITE_API_URL;

export default function CheckoutPage() {
    const [country, setCountry] = useState("");

    const [shippingData, setShippingData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        city: "",
        postalCode: ""
    });

    const [cardHolderName, setCardHolderName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiry, setExpiry] = useState("");
    const [cvc, setCvc] = useState("");

    const location = useLocation();
    const {subtotal, shipping, tax, total, items, applyGiftWrap} = location.state || {};

    const hasSummaryData = typeof subtotal === "number" && typeof shipping === "number" && typeof tax === "number" && typeof total === "number" && Array.isArray(items);

    if (!hasSummaryData) {
        return <Navigate to="/cart" replace/>;
    }

    const isFormValid = shippingData.firstName.trim() !== "" && shippingData.lastName.trim() !== "" && shippingData.email.includes("@") && shippingData.address.trim() !== "" && shippingData.city.trim() !== "" && shippingData.postalCode.trim() !== "" && cardHolderName.trim() !== "" && cardNumber.length === 19 && expiry.length === 7 && cvc.length >= 3;

    const handleShippingChange = (e) => {
        const {name, value} = e.target;
        setShippingData(prev => ({...prev, [name]: value}));
    };
    const handleCardHolderNameChange = (e) => {
        const value = e.target.value.toUpperCase().replace(/[^A-Z\s]/g, "");
        setCardHolderName(value);
    }
    const handleCardNumberChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.slice(0, 16);
        const formattedValue = value.match(/.{1,4}/g)?.join(" ") || "";

        setCardNumber(formattedValue);
    };
    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, "");

        if (value.length > 4) value = value.slice(0, 4);

        if (value.length >= 3) {
            value = `${value.slice(0, 2)} / ${value.slice(2)}`;
        }

        setExpiry(value);
    };
    const handleCvcChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 3);
        setCvc(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const token = localStorage.getItem("token");

        const orderData = {
            shippingDetails: {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                email: formData.get('email'),
                address: formData.get('address'),
                city: formData.get('city'),
                postalCode: formData.get('postalCode'),
                country: country,
            },
            items: items,
            totals: {
                subtotal: subtotal,
                shipping: shipping,
                tax: tax,
                total: total
            },
            applyGiftWrap: applyGiftWrap
        };

        try {
            const response = await fetch(`${BASE_URL}/api/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` })
                },
                body: JSON.stringify(orderData)
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Order successful:", data);
                // navigate('/success', { state: { orderId: data.orderId } });
            } else {
                console.error("Order failed:", data.message);
            }
        } catch (err) {
            console.error("Network error:", err);
        }
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

                            <div className={styles.field}>
                                <label htmlFor="country">Country</label>
                                <NiceSelect
                                    value={country}
                                    onChange={setCountry}
                                    options={[{value: "bg", label: "Bulgaria"}, {
                                        value: "de", label: "Germany"
                                    }, {value: "uk", label: "United Kingdom"}, {value: "us", label: "United States"}]}/>
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
                                value={cardHolderName}
                                onChange={handleCardHolderNameChange}/>
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
                                    value={cardNumber}
                                    onChange={handleCardNumberChange}
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
                                    value={expiry}
                                    onChange={handleExpiryChange}
                                    maxLength={7}/>
                            </div>

                            <div className={styles.field}>
                                <label htmlFor="cvc">CVC</label>
                                <input
                                    id="cvc"
                                    type="password"
                                    name="cvc"
                                    placeholder="•••"
                                    value={cvc}
                                    onChange={handleCvcChange}/>
                            </div>
                        </div>
                    </section>

                    {/* Actions */}
                    <div className={styles.actions}>
                        <Button variant={"full"} size={"md"} type={"submit"} disabled={!isFormValid}>
                            {isFormValid ? <FiUnlock /> : <FiLock />}
                            <span>Pay €{total.toFixed(2)}</span>
                        </Button>
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
