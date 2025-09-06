import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../contex/AuthContext";
import {useFormHandler} from "./useFormHandler";

const BASE_URL = import.meta.env.VITE_API_URL;

export const useLogin = () => {
    const [formData, setFormData] = useState({email: "", password: ""});

    const {loading, setLoading, message, setMessage, resetMessage, withMinDelay} = useFormHandler();

    const navigate = useNavigate();
    const {setUser, setToken} = useAuth();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        resetMessage();

        try {
            const response = await withMinDelay(fetch(`${BASE_URL}/api/users/login`, {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(formData),
            }));

            const data = await response.json();

            if (data.success) {
                setMessage({type: "success", text: "Login successful! Redirecting..."});

                const {token, role, name, email} = data.data;

                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify({role, name, email}));

                setToken(token);
                setUser({role, name, email});

                setTimeout(() => navigate("/"), 1000);
            } else {
                setMessage({type: "error", text: data.message || "Login failed"});
            }
        } catch (error) {
            setMessage({type: "error", text: "Error connecting to server"});
            console.error("Error logging in:", error);
        } finally {
            setLoading(false);
        }
    };

    return {formData, handleChange, handleSubmit, loading, message};
};
