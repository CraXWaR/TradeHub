import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useFormHandler} from "./useFormHandler";

const BASE_URL = import.meta.env.VITE_API_URL;

export const useCreateProduct = () => {
    const [formData, setFormData] = useState({
        title: "", description: "", price: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const {loading, setLoading, message, setMessage, resetMessage, withMinDelay} = useFormHandler();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setImageFile(null);
            setPreviewUrl("");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        resetMessage();

        const token = localStorage.getItem("token");

        try {
            const form = new FormData();
            form.append("title", formData.title);
            form.append("description", formData.description);
            form.append("price", String(parseFloat(formData.price)));
            if (imageFile) form.append("image", imageFile);

            const response = await withMinDelay(fetch(`${BASE_URL}/api/products/create`, {
                method: "POST", headers: {Authorization: `Bearer ${token}`}, body: form,
            }));

            const data = await response.json();

            if (data.success) {
                setMessage({type: "success", text: "Product created successfully!"});
                setFormData({title: "", description: "", price: ""});
                setImageFile(null);
                setPreviewUrl("");
                navigate("/products");
            } else {
                setMessage({type: "error", text: data.message || "Failed to create product"});
            }
        } catch (error) {
            setMessage({type: "error", text: "Error connecting to server"});
            console.error("Error creating product:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData, imageFile, previewUrl, loading, message, handleChange, handleFileChange, handleSubmit,
    };
};
