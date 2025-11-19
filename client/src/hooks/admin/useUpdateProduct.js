import {useState} from "react";
import {useFormHandler} from "../useFormHandler.js";

const BASE_URL = import.meta.env.VITE_API_URL;

const normalizeImageUrl = (raw) => {
    if (!raw) return "";
    const base = (BASE_URL || "").replace(/\/+$/, "");
    if (/^https?:\/\//i.test(raw)) return raw;
    const filename = String(raw).split("/").pop();
    return `${base}/uploads/${filename}`;
};

const addCacheBuster = (url) => !url ? url : `${url}${url.includes("?") ? "&" : "?"}v=${Date.now()}`;

export const useUpdateProduct = ({onUpdated} = {}) => {
    const [editOpen, setEditOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [formData, setFormData] = useState({
        title: "", description: "", price: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    const [variants, setVariants] = useState([{id: null, name: "", price: ""},]);

    // Loading / messages
    const {
        loading, setLoading, message, setMessage, resetMessage, withMinDelay,
    } = useFormHandler();

    const openEdit = (product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title ?? "",
            description: product.description ?? "",
            price: product.price != null ? String(product.price) : "",
        });
        setImageFile(null);

        const initialPreview = product.image ? normalizeImageUrl(product.image) : "";
        setPreviewUrl(initialPreview);

        const initialVariants = Array.isArray(product.variants) && product.variants.length > 0 ? product.variants.map((v) => ({
            id: v.id ?? null, name: v.name ?? "", price: v.price != null ? String(v.price) : "",
        })) : [{id: null, name: "", price: ""}];

        setVariants(initialVariants);

        resetMessage();
        setEditOpen(true);
    };

    const closeEdit = () => setEditOpen(false);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] ?? null;
        setImageFile(file);
        setPreviewUrl(file ? URL.createObjectURL(file) : editingProduct?.image ? normalizeImageUrl(editingProduct.image) : "");
    };

    const handleVariantChange = (index, field, value) => {
        setVariants((prev) => prev.map((variant, i) => i === index ? {...variant, [field]: value} : variant));
    };

    const addVariantRow = () => {
        setVariants((prev) => [...prev, {name: "", price: ""}]);
    };

    const removeVariantRow = (index) => {
        setVariants((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!editingProduct) return;

        setLoading(true);
        resetMessage();

        const token = localStorage.getItem("token");

        try {
            const form = new FormData();
            form.append("title", formData.title);
            form.append("description", formData.description);
            const p = parseFloat(formData.price);
            form.append("price", Number.isFinite(p) ? String(p) : "0");
            if (imageFile) form.append("image", imageFile);

            const cleanedVariants = variants
                .filter((v) => v.name.trim() !== "")
                .map((v) => ({
                    id: v.id ?? null,
                    name: v.name.trim(),
                    price: v.price !== "" && v.price != null ? Number(v.price) : null,
                }));
            form.append("variants", JSON.stringify(cleanedVariants));

            const res = await withMinDelay(fetch(`${BASE_URL}/api/products/update/${editingProduct.id}`, {
                method: "PUT", headers: token ? {Authorization: `Bearer ${token}`} : undefined, body: form,
            }));

            const ct = res.headers.get("content-type") || "";
            const data = ct.includes("application/json") ? await res.json() : {
                success: false,
                message: await res.text()
            };

            if (!res.ok || !data?.success) {
                if (data?.errors?.length) {
                    setMessage({
                        type: "error", text: data.errors.map((e) => e.message),
                    });
                } else {
                    throw new Error(data?.message || `HTTP ${res.status} ${res.statusText}`);
                }
                return;
            }

            let updated = data.data ?? null;

            if (updated?.image) {
                const url = normalizeImageUrl(updated.image);
                updated = {...updated, image: addCacheBuster(url)};
            }

            setMessage({type: "success", text: "Product updated!"});
            setEditOpen(false);
            onUpdated?.(updated);
        } catch (err) {
            setMessage({
                type: "error", text: err instanceof Error ? err.message : "Failed to save",
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        editOpen,
        openEdit,
        closeEdit,
        editingProduct,
        formData,
        imageFile,
        previewUrl,
        variants,
        loading,
        message,
        handleChange,
        handleFileChange,
        handleVariantChange,
        addVariantRow,
        removeVariantRow,
        handleSubmit,
    };
};
