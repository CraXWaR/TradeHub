import {useState} from "react";
import {useFormHandler} from "../useFormHandler.js";
import {useNavigate} from "react-router-dom";

const BASE_URL = import.meta.env.VITE_API_URL;

export function useCheckoutForm() {
    const {loading, setLoading, message, setMessage, resetMessage, withMinDelay} = useFormHandler();
    const navigate = useNavigate();
    const [country, setCountry] = useState("");
    const [shippingData, setShippingData] = useState({
        firstName: "", lastName: "", email: "", address: "", city: "", postalCode: ""
    });
    const [paymentData, setPaymentData] = useState({
        cardHolderName: "", cardNumber: "", expiry: "", cvc: ""
    });

    const formatters = {
        cardHolderName: (val) => val.toUpperCase().replace(/[^A-Z\s]/g, ""), cardNumber: (val) => {
            const digits = val.replace(/\D/g, "").slice(0, 16);
            return digits.match(/.{1,4}/g)?.join(" ") || "";
        }, expiry: (val) => {
            const digits = val.replace(/\D/g, "").slice(0, 4);
            return digits.length >= 3 ? `${digits.slice(0, 2)} / ${digits.slice(2)}` : digits;
        }, cvc: (val) => val.replace(/\D/g, "").slice(0, 3)
    };

    const handleShippingChange = (e) => {
        const {name, value} = e.target;
        setShippingData(prev => ({...prev, [name]: value}));
    };

    const handlePaymentChange = (e) => {
        const {name, value} = e.target;
        const formatted = formatters[name] ? formatters[name](value) : value;
        setPaymentData(prev => ({...prev, [name]: formatted}));
    };

    const isFormValid = Object.values(shippingData).every(val => val.trim() !== "") && country !== "" && shippingData.email.includes("@") && paymentData.cardNumber.length === 19 && paymentData.expiry.length === 7 && paymentData.cvc.length >= 3;

    const submitOrder = async (orderSummary) => {
        if (!isFormValid || loading) return;

        resetMessage();
        setLoading(true);

        const token = localStorage.getItem("token");
        const orderData = {
            shippingDetails: {...shippingData, country}, ...orderSummary
        };

        try {
            const response = await withMinDelay(fetch(`${BASE_URL}/api/orders`, {
                method: 'POST', headers: {
                    'Content-Type': 'application/json', ...(token && {'Authorization': `Bearer ${token}`})
                }, body: JSON.stringify(orderData)
            }));

            const data = await response.json();

            if (response.ok) {
                console.log("Order Successfully Created", {state: {orderId: data.orderId}});
                // navigate('/success', {state: {orderId: data.orderId}});
            } else {
                setMessage({type: "error", text: data.message || "Order failed"});
            }
        } catch (err) {
            setMessage({type: "error", text: "Network error. Please try again."});
        } finally {
            setLoading(false);
        }
    };

    return {
        country,
        setCountry,
        shippingData,
        handleShippingChange,
        paymentData,
        handlePaymentChange,
        isFormValid,
        loading,
        message,
        submitOrder
    };
}