import { useEffect, useMemo, useState } from "react";
import styles from "./AdminProductsList.module.css";
import Modal from "../Modal/Modal.jsx";
import CreateProductForm from "../CreateProductForm/CreateProductForm.jsx";
import { useUpdateProduct } from "../../../hooks/useUpdateProduct.js";
import ConfirmModal from "../../ConfirmModal.jsx";
import {useDeleteProduct} from "../../../hooks/useDeleteProduct.js";

const BASE_URL = import.meta.env.VITE_API_URL;

const formatPrice = (value) => {
    if (value == null || value === "") return "—";
    const num = Number(value);
    return isNaN(num) ? "—" : `$${num.toFixed(2)}`;
};

const getProductImageUrl = (p) => {
    const raw = p?.image || "";
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw;
    const base = BASE_URL.replace(/\/+$/, "");
    const filename = raw.split("/").pop();
    return `${base}/uploads/${filename}`;
};

const ProductsList = ({ filters }) => {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // EDIT hook
    const {
        editOpen, openEdit, closeEdit,
        editingProduct,
        formData: editFormData,
        previewUrl,
        loading: saving,
        message,
        handleChange,
        handleFileChange,
        handleSubmit,
    } = useUpdateProduct({
        onUpdated: (updated) => {
            setAllProducts((list) => list.map((p) => (p.id === updated.id ? { ...p, ...updated } : p)));
        },
    });

    // DELETE hook (modal-only spinner + 2s delay)
    const {
        confirmOpen,
        modalLoading,
        requestDelete,
        cancelDelete,
        confirmDelete,
    } = useDeleteProduct({
        delayMs: 2000,
        onDeleted: (id) => {
            setAllProducts((list) => list.filter((p) => p.id !== id));
        },
    });

    // ===== Fetch products =====
    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            setLoading(true);
            setError("");
            const startTime = Date.now();

            try {
                const res = await fetch(`${BASE_URL}/api/products`, { headers: { Accept: "application/json" } });

                const ct = res.headers.get("content-type") || "";
                if (!res.ok) {
                    const text = await res.text().catch(() => "");
                    throw new Error(`HTTP ${res.status} ${res.statusText} — ${text.slice(0, 120)}`);
                }
                if (!ct.includes("application/json")) {
                    const text = await res.text().catch(() => "");
                    throw new Error(`Expected JSON but got ${ct}. Body: ${text.slice(0, 120)}`);
                }

                const data = await res.json();
                if (!isMounted) return;

                if (data?.success && Array.isArray(data.data)) {
                    setAllProducts(
                        data.data.map((p) => ({
                            id: p.id ?? p._id ?? "",
                            title: p.title ?? p.name ?? "",
                            description: p.description ?? "",
                            price: p.price,
                            image: p.image ?? p.thumbnail ?? "",
                            created_at: p.created_at ?? p.createdAt ?? null,
                        }))
                    );
                } else {
                    throw new Error(data?.message || "Failed to load products");
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Fetch products error:", err);
                    setError(err instanceof Error ? err.message : "Error connecting to server");
                }
            } finally {
                const elapsed = Date.now() - startTime;
                const remaining = Math.max(0, 1500 - elapsed);
                if (isMounted) {
                    setTimeout(() => isMounted && setLoading(false), remaining);
                }
            }
        };

        fetchProducts();
        return () => {
            isMounted = false;
        };
    }, [filters]);

    // ===== Filter & sort =====
    const products = useMemo(() => {
        let list = allProducts;

        if (filters?.query) {
            const q = filters.query.toLowerCase();
            list = list.filter(
                (p) => (p.title || "").toLowerCase().includes(q) || String(p.id || "").toLowerCase().includes(q)
            );
        }

        switch (filters?.sort) {
            case "title_asc":
                list = [...list].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
                break;
            case "title_desc":
                list = [...list].sort((a, b) => (b.title || "").localeCompare(a.title || ""));
                break;
            case "price_asc":
                list = [...list].sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
                break;
            case "price_desc":
                list = [...list].sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
                break;
            case "created_asc":
                list = [...list].sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
                break;
            case "created_desc":
            default:
                list = [...list].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
                break;
        }

        return list;
    }, [allProducts, filters]);

    if (loading) return <p className={styles.loading}>Loading…</p>;
    if (error) return <p className={styles.error}>{error}</p>;
    if (products.length === 0) return <p className={styles.empty}>No products found.</p>;
    console.log(products)
    return (
        <>
            <div className={styles.wrapper}>
                <table className={styles.table}>
                    <thead>
                    <tr>
                        <th className={styles.colId}>ID</th>
                        <th className={styles.colProduct}>Product</th>
                        <th className={styles.colPrice}>Price</th>
                        <th className={styles.colActions}>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {products.map((p, idx) => (
                        <tr key={p.id || idx}>
                            <td className={styles.idCell} title={String(p.id)}>{p.id}</td>
                            <td className={styles.productCell}>
                                <div className={styles.productWrap}>
                                    <div className={styles.thumb}>
                                        {p.image ? (
                                            <img src={getProductImageUrl(p)} alt={p.title || "product image"} loading="lazy" />
                                        ) : (
                                            <div className={styles.noImg}>IMG</div>
                                        )}
                                    </div>
                                    <span className={styles.title}>{p.title || "Untitled"}</span>
                                </div>
                            </td>
                            <td className={styles.priceCell}>{formatPrice(p.price)}</td>
                            <td className={styles.actionsCell}>
                                <button onClick={() => openEdit(p)}>Edit</button>
                                <button onClick={() => requestDelete(p.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Edit modal */}
            <Modal open={editOpen} onClose={closeEdit} title="Edit product">
                {editingProduct && (
                    <CreateProductForm
                        formData={editFormData}
                        previewUrl={previewUrl}
                        loading={saving}
                        message={message}
                        handleChange={handleChange}
                        handleFileChange={handleFileChange}
                        handleSubmit={handleSubmit}
                        mode="edit"
                    />
                )}
            </Modal>

            {/* Confirm delete modal (spinner only here) */}
            <ConfirmModal
                isOpen={confirmOpen}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone!"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                loading={modalLoading}
            />
        </>
    );
};

export default ProductsList;
