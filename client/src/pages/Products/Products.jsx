import {useEffect, useState, useMemo} from 'react';
import {Link} from 'react-router-dom';
import styles from './Products.module.css';

const BASE_URL = import.meta.env.VITE_API_URL;

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            setLoading(true);
            setError('');
            const startTime = Date.now();

            try {
                const res = await fetch(`${BASE_URL}/api/products`);
                const data = await res.json();

                if (!isMounted) return;

                if (data?.success) {
                    setProducts(Array.isArray(data.data) ? data.data : []);
                } else {
                    setError(data?.message || 'Failed to load products');
                }
            } catch (err) {
                if (isMounted) {
                    setError('Error connecting to server');
                    console.error('Fetch products error:', err);
                }
            } finally {
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, 1500 - elapsedTime);

                if (isMounted) {
                    setTimeout(() => {
                        if (isMounted) setLoading(false);
                    }, remainingTime);
                }
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    const productCards = useMemo(() => {
        return products.map((p) => {
            const imagePath = p?.image || '';
            const normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
            const imageUrl = `${BASE_URL}/uploads/${normalizedPath}`;

            return (<div
                    key={p.id || `${p.title}-${p.price}`}
                    className={`${styles['product-card']} bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 overflow-hidden flex flex-col`}>

                    <div className={`${styles['product-image']} relative w-full aspect-[4/3] bg-orange-50`}>
                        {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
                        <img
                            src={imageUrl}
                            alt={p.title || 'Product image'}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                e.currentTarget.src = 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fcommons.wikimedia.org%2Fwiki%2FFile%3ANo-Image-Placeholder.svg&psig=AOvVaw20r1kXugs2wwlDQPo8Vn_V&ust=1756391749238000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNig4KObq48DFQAAAAAdAAAAABAE';
                            }}/>
                    </div>
                    <div className="p-4 flex flex-col gap-2">
                        <h3
                            className={`text-lg font-semibold text-gray-800 line-clamp-1 ${styles['clamp-1']}`}>
                            {p.title}
                        </h3>
                        <p
                            className={`text-sm text-gray-600 line-clamp-2 min-h-[2.5rem] ${styles['clamp-2']}`}>
                            {p.description}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                              <span
                                  className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                                ${p.price}
                              </span>
                                <Link
                                    to={`/products/${p.id}`}
                                    className={`${styles['button-outline']} px-4 py-2 text-sm rounded-full border border-orange-300 text-orange-700 hover:bg-orange-100 transition-colors`}
                                    onMouseMove={(e) => {
                                        const rect = e.currentTarget.getBoundingClientRect();
                                        e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`);
                                        e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`);
                                    }}>
                                    View
                                </Link>
                        </div>
                    </div>
                </div>);
        });
    }, [products]);

    return (<div
            className={`${styles['products-page']} min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-orange-100 text-gray-800`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className={`${styles['products-header']} mb-8 text-center`}>
                    <h1 className="text-4xl font-extrabold mb-2 bg-gradient-to-r from-orange-500 via-red-500 to-orange-600 bg-clip-text text-transparent drop-shadow-lg">
                        All Products
                    </h1>
                    <p className="text-gray-700">Browse the latest listings from our community.</p>
                </div>
                {loading && (<div className="flex justify-center items-center py-20">
                        <div
                            className="animate-spin rounded-full h-12 w-12 border-4 border-orange-300 border-t-transparent"></div>
                    </div>)}

                {!loading && error && (<div
                        className="max-w-xl mx-auto bg-red-50 text-red-700 border border-red-200 p-4 rounded-lg text-center">
                        {error}
                    </div>)}

                {!loading && !error && products.length === 0 && (<div
                        className={`${styles['products-empty']} max-w-xl mx-auto bg-white/80 border border-orange-200 p-8 rounded-2xl text-center text-gray-700 shadow-sm`}>
                        <div className={`${styles['empty-icon']} mb-3`}>📦</div>
                        <h2 className={`${styles['empty-title']} text-xl font-semibold text-gray-800 mb-1`}>
                            No products yet
                        </h2>
                        <p className={`${styles['empty-subtitle']} text-sm text-gray-600 mb-5`}>
                            Be the first to list an item in the marketplace.
                        </p>
                        <Link
                            to="/admin/create"
                            className={`${styles['button-outline']} ${styles['empty-action']} inline-block px-5 py-2 rounded-full border border-orange-300 text-orange-700 hover:bg-orange-100 transition-colors`}>
                            Create Product
                        </Link>
                    </div>)}

                {!loading && !error && products.length > 0 && (<div
                        className={`${styles['products-grid']} grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
                        {productCards}
                    </div>)}
            </div>
        </div>);
};

export default Products;
