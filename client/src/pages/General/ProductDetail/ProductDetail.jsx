import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";

import styles from "./ProductDetail.module.css";

import {ProductImage} from "../../../components/General/ProductDetail/ProductImage.jsx";
import {ProductInfo} from "../../../components/General/ProductDetail/ProductInfo.jsx";
import {AddToWishlist} from "../../../components/User/Wishlist/AddToWishlist.jsx";
import {Loading} from "../../../components/Admin/Common/Loading/Loading.jsx";
import {Error} from "../../../components/Admin/Common/Error/Error.jsx";

const BASE_URL = import.meta.env.VITE_API_URL || '';
const MIN_LOADING_TIME = 1500;
const PLACEHOLDER_IMAGE = "https://placehold.co/400x300?text=No+Image";

const ProductDetail = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [pageLoading, setPageLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;
        const startTime = Date.now();

        const fetchProduct = async () => {
            try {
                const response = await fetch(`${BASE_URL}/api/products/${id}`);
                const data = await response.json();

                if (!isMounted) return;
                if (data.success) setProduct(data.data); else setError(data.message);
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
        return () => {
            isMounted = false;
        };
    }, [id]);

    const renderContent = () => {
        if (pageLoading) return <Loading message="Loading product..." />;
        if (error) return <Error message={error} />;
        if (!product) return null;

        return (
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fadeIn ${styles["product-info-container"]}`}>
                <div className="flex items-center gap-3 pt-6 px-4 mb-6 lg:hidden justify-between col-span-1">
                    <h1 className="text-2xl font-bold text-gray-900">{product.title}</h1>
                    <AddToWishlist id={id} />
                </div>

                <ProductImage
                    image={product.image}
                    placeholder={PLACEHOLDER_IMAGE}
                    title={product.title}
                    baseUrl={BASE_URL}/>
                <ProductInfo
                    product={product}
                    navigate={navigate}/>
            </div>
        );
    };

    return (
        <div className={`${styles["product-detail-page"]} relative min-h-screen bg-[#fefefe]`}>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
                {renderContent()}
            </div>
        </div>
    );
};

export default ProductDetail;
