import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";
import { FaTrash } from "react-icons/fa";

import ConfirmModal from "../../components/ConfirmModal";

const BASE_URL = import.meta.env.VITE_API_URL;
const MIN_LOADING_TIME = 1500;
const PLACEHOLDER_IMAGE =
  "https://via.placeholder.com/800x600?text=No+Image+Available";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        navigate("/");
      } else {
        alert(data.message || "Failed to delete product");
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  const handleDelete = () => {
    deleteProduct(product.id);
    setShowModal(false);
  };

  useEffect(() => {
    let isMounted = true;
    const startTime = Date.now();

    const fetchProduct = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/products/${id}`);
        const data = await response.json();

        if (!isMounted) return;

        if (data.success) {
          setProduct(data.data);
        } else {
          setError("Product not found");
        }
      } catch (err) {
        if (isMounted) {
          console.error("Error fetching product:", err);
          setError("Failed to load product");
        }
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

        if (isMounted) {
          setTimeout(() => {
            if (isMounted) setLoading(false);
          }, remainingTime);
        }
      }
    };

    fetchProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) {
    return (
      <div className="products-page min-h-screen bg-white flex flex-col items-center justify-start py-10">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mb-4"></div>
        <p className="text-gray-700 font-medium">Loading product...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 flex items-center justify-center">
        <div className="max-w-xl mx-auto bg-red-50 text-red-700 border border-red-200 p-6 rounded-lg text-center shadow-sm">
          <p className="mb-4">{error}</p>
          <button
            onClick={() => navigate("/")}
            className="px-5 py-2 rounded-full border border-orange-300 text-orange-700 hover:bg-orange-100 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!product) {
    return null;
  }

  return (
    <div className="product-detail-page relative min-h-screen bg-gradient-to-br from-orange-50 via-red-100/50 to-orange-50 text-gray-800">
      {/* Accent circles for depth */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-orange-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-red-200/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="product-detail grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/80 backdrop-blur-xl border border-orange-100/60 rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
          {/* Delete Button (floating top-right) */}
          <button
            className="absolute top-4 right-4 p-2 rounded-full border border-red-300 text-red-600 hover:bg-red-100 transition-colors"
            onClick={() => setShowModal(true)}
          >
            <FaTrash size={18} />
          </button>

          <ConfirmModal
            isOpen={showModal}
            title="Delete Product"
            message="Are you sure you want to delete this product? This action cannot be undone!"
            onConfirm={handleDelete}
            onCancel={() => setShowModal(false)}
            loading={loading}
          />

          {/* Product Image */}
          <div className="product-image-container flex items-center justify-center bg-gradient-to-br from-gray-50 to-orange-50 p-6">
            {product.image ? (
              <img
                src={`${BASE_URL}/uploads/${product.image}`}
                alt={product.title}
                className="product-detail-image max-h-[500px] w-auto object-contain rounded-xl shadow-md transform transition-transform duration-300 hover:scale-105"
                onError={(e) => {
                  if (e.currentTarget.src !== PLACEHOLDER_IMAGE) {
                    e.currentTarget.src = PLACEHOLDER_IMAGE;
                  }
                }}
              />
            ) : (
              <img
                src={PLACEHOLDER_IMAGE}
                alt="No Image Available"
                className="product-detail-image max-h-[500px] w-auto object-contain rounded-xl shadow-md"
              />
            )}
          </div>

          {/* Product Info */}
          <div className="product-info flex flex-col justify-between p-8 lg:p-10">
            <div>
              <h1 className="product-title text-4xl font-extrabold text-gray-900 mb-4">
                {product.title}
              </h1>
              <p className="product-price text-3xl font-extrabold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent mb-6">
                ${Number(product.price || 0).toFixed(2)}
              </p>
              <div className="product-description">
                <h3 className="text-xl font-semibold text-gray-800 border-b-2 border-orange-100 pb-2 mb-4">
                  Description
                </h3>
                <p className="text-gray-600 leading-relaxed break-all">
                  {product.description || "No description available."}
                </p>
              </div>
            </div>

            {/* Meta + Actions */}
            <div className="mt-10">
              <div className="product-meta flex justify-between items-center text-sm text-gray-500 mb-6">
                <span>
                  Listed on:{" "}
                  {new Date(product.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="action-buttons flex flex-wrap gap-4">
                <button
                  onClick={() => navigate(-1)}
                  className="back-button inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  ← Back to Products
                </button>
                <button className="px-6 py-3 rounded-lg border border-orange-300 text-orange-700 hover:bg-orange-100 transition-colors">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
