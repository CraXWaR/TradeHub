import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useFormHandler} from "./useFormHandler";

const BASE_URL = import.meta.env.VITE_API_URL;

export const useRegister = () => {
    const [formData, setFormData] = useState({
        name: "", email: "", password: "", confirmPassword: "",
    });

    const {loading, setLoading, message, setMessage, resetMessage, withMinDelay} = useFormHandler();

    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        resetMessage();

        if (formData.password !== formData.confirmPassword) {
            setMessage({type: "error", text: "Passwords do not match"});
            setLoading(false);
            return;
        }

        try {
            const response = await withMinDelay(fetch(`${BASE_URL}/api/users/register`, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify({
                    name: formData.name, email: formData.email, password: formData.password,
                }),
            }));

            const data = await response.json();

            if (data.success) {
                setMessage({type: "success", text: "User registered successfully!"});
                setFormData({name: "", email: "", password: "", confirmPassword: ""});
                setTimeout(() => navigate("/login"), 1000);
            } else {
                setMessage({type: "error", text: data.message || "Failed to register user"});
            }
        } catch (error) {
            setMessage({type: "error", text: "Error connecting to server"});
            console.error("Error registering user:", error);
        } finally {
            setLoading(false);
        }
    };

    return {formData, handleChange, handleSubmit, loading, message};
};
