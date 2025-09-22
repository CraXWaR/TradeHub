import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import styles from "./ProductDetail.module.css";
import ConfirmModal from "../../components/ConfirmModal";
import ProductImage from "../../components/ProductDetail/ProductImage.jsx";
import ProductInfo from "../../components/ProductDetail/ProductInfo.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;
const MIN_LOADING_TIME = 1500;
const PLACEHOLDER_IMAGE = "https://via.placeholder.com/800x600?text=No+Image+Available";

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);

    const deleteProduct = async (id) => {
        try {
            setDeleteLoading(true);
            const response = await fetch(`${BASE_URL}/api/products/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            const data = await response.json();
            if (data.success) {
                setTimeout(() => navigate("/products"), 800);
            } else {
                alert(data.message || "Failed to delete product");
                setDeleteLoading(false);
                setShowModal(false);
            }
        } catch (err) {
            console.error("Error deleting product:", err);
            setDeleteLoading(false);
            setShowModal(false);
        }
    };

    const handleDelete = () => deleteProduct(product.id);

    useEffect(() => {
        let isMounted = true;
        const startTime = Date.now();

        const fetchProduct = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/products/${id}`);
                const data = await response.json();
                if (!isMounted) return;

                if (data.success) setProduct(data.data);
                else setError("Product not found");
            } catch (err) {
                if (isMounted) {
                    console.error("Error fetching product:", err);
                    setError("Failed to load product");
                }
            } finally {
                const elapsed = Date.now() - startTime;
                const wait = Math.max(0, MIN_LOADING_TIME - elapsed);
                if (isMounted) setTimeout(() => setPageLoading(false), wait);
            }
        };

        fetchProduct();
        return () => { isMounted = false; };
    }, [id]);

    if (pageLoading) {
        return (
            <div className={`${styles["product-detail-page"]} min-h-screen bg-white flex flex-col items-center justify-start py-10`}>
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
                <p className="text-gray-700 font-medium">Loading product...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`${styles["product-detail-page"]} min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center`}>
                <div className="max-w-xl mx-auto bg-red-50 text-red-700 border border-red-200 p-6 rounded-lg text-center shadow-sm">
                    <p className="mb-4">{error}</p>
                    <button
                        onClick={() => navigate("/products")}
                        className="px-5 py-2 rounded-full border border-orange-300 text-orange-700 hover:bg-orange-100 transition-colors"
                    >
                        ← Back to Products
                    </button>
                </div>
            </div>
        );
    }

    if (!product) return null;

    return (
        <div className={`${styles["product-detail-page"]} relative min-h-screen`}>
            <ConfirmModal
                isOpen={showModal}
                title="Delete Product"
                message="Are you sure you want to delete this product? This action cannot be undone!"
                onConfirm={handleDelete}
                onCancel={() => setShowModal(false)}
                loading={deleteLoading}
            />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className={`${styles["product-detail"]} grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fadeIn`}>
                    <ProductImage
                        image={product.image}
                        title={product.title}
                        baseUrl={BASE_URL}
                        placeholder={PLACEHOLDER_IMAGE}
                    />
                    <ProductInfo
                        product={product}
                        navigate={navigate}
                        onDelete={() => setShowModal(true)}
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
