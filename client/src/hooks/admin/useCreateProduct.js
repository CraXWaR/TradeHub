import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useFormHandler} from "../useFormHandler.js";

const BASE_URL = import.meta.env.VITE_API_URL;

export const useCreateProduct = () => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
    });

    const [variants, setVariants] = useState([
        { name: "", price: "" },
    ]);

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const { loading, setLoading, message, setMessage, resetMessage, withMinDelay } = useFormHandler();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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

    // handle variant field changes
    const handleVariantChange = (index, field, value) => {
        setVariants((prev) =>
            prev.map((variant, i) =>
                i === index ? { ...variant, [field]: value } : variant
            )
        );
    };

    // add another variant row
    const addVariantRow = () => {
        setVariants((prev) => [...prev, { name: "", price: "" }]);
    };

    // remove a variant row
    const removeVariantRow = (index) => {
        setVariants((prev) => prev.filter((_, i) => i !== index));
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

            // Clean + send variants as JSON string
            const cleanedVariants = variants
                .filter((v) => v.name.trim() !== "")
                .map((v) => ({
                    name: v.name.trim(),
                    price: v.price !== "" ? Number(v.price) : null,
                }));

            if (cleanedVariants.length > 0) {
                form.append("variants", JSON.stringify(cleanedVariants));
            }

            const response = await withMinDelay(
                fetch(`${BASE_URL}/api/products/create`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                    body: form,
                })
            );

            const data = await response.json();

            if (data.success) {
                setMessage({ type: "success", text: "Product created successfully!" });
                setFormData({ title: "", description: "", price: "" });
                setImageFile(null);
                setPreviewUrl("");
                setVariants([{ name: "", price: "" }]);
                navigate("/admin/products");
            } else {
                if (data.errors) {
                    const errorList = data.errors.map((err) => err.message);
                    setMessage({ type: "error", text: errorList });
                } else {
                    setMessage({
                        type: "error",
                        text: data.message || "Failed to create product",
                    });
                }
            }
        } catch (error) {
            setMessage({ type: "error", text: "Error connecting to server" });
            console.error("Error creating product:", error);
        } finally {
            setLoading(false);
        }
    };

    return {
        formData,
        imageFile,
        previewUrl,
        loading,
        message,
        variants,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleVariantChange,
        addVariantRow,
        removeVariantRow,
    };
};
