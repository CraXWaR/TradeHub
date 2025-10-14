import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api/products`);
                const data = await res.json();

                if (data?.success) {
                    setProducts(Array.isArray(data.data) ? data.data : []);
                } else {
                    setError(data?.message || "Failed to load products");
                }
            } catch (err) {
                console.error("Fetch products error:", err);
                setError("Error connecting to server");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 text-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                        All Products
                    </h1>
                    <p className="text-gray-700">
                        Browse the latest listings from our community.
                    </p>
                </div>

                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-300 border-t-transparent"></div>
                    </div>
                )}

                {!loading && error && (
                    <div className="max-w-xl mx-auto bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg text-center">
                        {error}
                    </div>
                )}

                {!loading && !error && products.length === 0 && (
                    <div className="max-w-xl mx-auto bg-white/80 border border-orange-200 p-8 rounded-2xl text-center text-gray-700 shadow-sm">
                        <div className="mb-3 text-4xl">📦</div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">
                            No products yet
                        </h2>
                        <p className="text-sm text-gray-600 mb-5">
                            Be the first to list an item in the marketplace.
                        </p>
                        <Link
                            to="/admin/create"
                            className="inline-block px-5 py-2 rounded-full border border-orange-300 text-orange-700 hover:bg-orange-100 transition-colors"
                        >
                            Create Product
                        </Link>
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Products;
