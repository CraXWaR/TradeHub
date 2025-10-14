import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../../../components/ProductCard/ProductCard.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;

const UserWishlistPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token") || "";

    useEffect(() => {
        let isMounted = true;

        const fetchWishlist = async () => {
            setLoading(true);
            setError("");

            try {
                const res = await fetch(`${BASE_URL}/user/wishlist`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();

                if (!isMounted) return;

                if (res.ok && Array.isArray(data.items)) {
                    const list = data.items.map((i) => i.product).filter(Boolean);
                    setProducts(list);
                } else {
                    setError(data?.message || "Failed to load wishlist");
                }
            } catch (err) {
                if (isMounted) {
                    console.error("Fetch wishlist error:", err);
                    setError("Error connecting to server");
                }
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchWishlist();
        return () => {
            isMounted = false;
        };
    }, [token]);

    const productCards = useMemo(() => {
        return products.map((p) => (
            <ProductCard key={p.id || `${p.title}-${p.price}`} product={p} />
        ));
    }, [products]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 text-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="mb-8 text-center">
                    <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                        Wishlist
                    </h1>
                    <p className="text-gray-700">Items you’ve saved for later.</p>
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
                        <div className="mb-3 text-4xl">❤️</div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">Your wishlist is empty</h2>
                        <p className="text-sm text-gray-600 mb-5">
                            Browse products and save the ones you love!
                        </p>
                        <Link
                            to="/products"
                            className="inline-block px-5 py-2 rounded-full border border-orange-300 text-orange-700 hover:bg-orange-100 transition-colors"
                        >
                            Browse Products
                        </Link>
                    </div>
                )}

                {!loading && !error && products.length > 0 && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {productCards}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserWishlistPage;
