import {useState} from "react";
import {useFormHandler} from "./useFormHandler";

const BASE_URL = import.meta.env.VITE_API_URL;

/** Respect absolute URLs and prefix relative /uploads paths */
const normalizeImageUrl = (raw) => {
    if (!raw) return "";
    const base = (BASE_URL || "").replace(/\/+$/, "");
    if (/^https?:\/\//i.test(raw)) return raw;              // already absolute
    const filename = String(raw).split("/").pop();
    return `${base}/uploads/${filename}`;
};

const addCacheBuster = (url) =>
    !url ? url : `${url}${url.includes("?") ? "&" : "?"}v=${Date.now()}`;

export const useUpdateProduct = ({onUpdated} = {}) => {
    // Modal + current product
    const [editOpen, setEditOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Controlled form state
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState("");

    // Loading / messages
    const {
        loading, setLoading,
        message, setMessage,
        resetMessage,
        withMinDelay
    } = useFormHandler();

    /** Open modal and prefill from product row */
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

        resetMessage();
        setEditOpen(true);
    };

    const closeEdit = () => setEditOpen(false);

    /** Controlled inputs */
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0] ?? null;
        setImageFile(file);
        setPreviewUrl(
            file
                ? URL.createObjectURL(file)
                : (editingProduct?.image ? normalizeImageUrl(editingProduct.image) : "")
        );
    };

    /** PUT /api/products/update/:id (multipart) */
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

            const res = await withMinDelay(fetch(
                `${BASE_URL}/api/products/update/${editingProduct.id}`,
                {method: "PUT", headers: token ? {Authorization: `Bearer ${token}`} : undefined, body: form}
            ));
            const ct = res.headers.get("content-type") || "";
            const data = ct.includes("application/json") ? await res.json()
                : {success: false, message: await res.text()};

            if (!res.ok || !data?.success) {
                if (data?.errors?.length) {
                    setMessage({type: "error", text: data.errors.map(e => e.message)});
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
            setMessage({type: "error", text: err instanceof Error ? err.message : "Failed to save"});
        } finally {
            setLoading(false);
        }
    }
    return {
        editOpen,
        openEdit,
        closeEdit,
        editingProduct,
        formData,
        imageFile,
        previewUrl,
        loading,
        message,
        handleChange,
        handleFileChange,
        handleSubmit,
    };
};
