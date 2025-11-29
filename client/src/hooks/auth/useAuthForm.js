// useAuthForm.js
import {useState, useRef, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useFormHandler} from "../useFormHandler";

const BASE_URL = import.meta.env.VITE_API_URL;

export function useAuthForm({
                                initialValues,
                                endpoint,
                                makePayload,
                                validate,
                                onSuccess,
                                successMessage,
                                delayMs = 600,
                                initialMessage,
                            }) {
    const [formData, setFormData] = useState(initialValues);

    const {
        loading, setLoading, message, setMessage, resetMessage, withMinDelay,
    } = useFormHandler();

    const navigate = useNavigate();
    const mounted = useRef(true);

    useEffect(() => () => {
        mounted.current = false;
    }, []);

    useEffect(() => {
        if (initialMessage) {
            if (typeof initialMessage === "string") {
                setMessage({type: "success", text: initialMessage});
            } else {
                setMessage(initialMessage);
            }
        }
    }, [initialMessage, setMessage]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        resetMessage();
        setLoading(true);

        const validationError = validate?.(formData);

        if (validationError) {
            setMessage({type: "error", text: validationError});
            setLoading(false);
            return;
        }

        try {
            const res = await withMinDelay(fetch(`${BASE_URL}${endpoint}`, {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(makePayload(formData)),
            }), delayMs);

            if (!res.ok) {
                let errText = "Request failed";
                try {
                    const err = await res.json();

                    if (err.errors && err.errors.length > 0) {
                        errText = err.errors[0].message;
                    }

                    if (err.message) {
                        errText = err.message;
                    }
                } catch {
                    /* ignore */
                }
                setMessage({type: "error", text: errText});
                setLoading(false);
                return;
            }

            const data = await res.json();

            if (data?.success) {
                setMessage({type: "success", text: successMessage || "Success!"});
                onSuccess?.(data, {formData, setFormData, navigate, setMessage});
            } else {
                setMessage({
                    type: "error", text: data?.message || "Operation failed",
                });
                setLoading(false);
            }
        } catch (err) {
            console.error("Auth error:", err);
            setMessage({type: "error", text: "Error connecting to server"});
            setLoading(false);
        } finally {
            mounted.current && setLoading(false);
        }
    };

    return {formData, setFormData, handleChange, handleSubmit, loading, message};
}