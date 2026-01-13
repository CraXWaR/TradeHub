import {Link} from "react-router-dom";
import styles from "./ProductCard.module.css";

const BASE_URL = import.meta.env.VITE_API_URL || '';

export const ProductCard = ({product}) => {
    const imagePath = product?.image || "";
    const normalizedPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;
    const imageUrl = `${BASE_URL}/uploads/${normalizedPath}`;

    return (
        <div
            key={product.id || `${product.title}-${product.price}`}
            className={`${styles["product-card"]} bg-white/90 backdrop-blur-sm rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-orange-100 overflow-hidden flex flex-col`}>

            <div className={`${styles["product-image"]} relative w-full aspect-[4/3] bg-orange-50`}>
                <img
                    src={imageUrl}
                    alt={product.title || "Product image"}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.currentTarget.src =
                            "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
                    }}
                />
            </div>

            <div className="p-4 flex flex-col gap-2">
                <h3 className={`text-lg font-semibold text-gray-800 line-clamp-1 ${styles["clamp-1"]}`}>
                    {product.title}
                </h3>
                <p className={`text-sm text-gray-600 line-clamp-2 min-h-[2.5rem] ${styles["clamp-2"]}`}>
                    {product.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                    <span
                        className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-500 bg-clip-text text-transparent">
                        ${product.price}
                    </span>
                    <Link
                        to={`/products/${product.id}`}
                        className={`${styles["button-outline"]} px-4 py-2 text-sm rounded-full border border-orange-300 text-orange-700 hover:bg-orange-100 transition-colors`}
                        onMouseMove={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
                            e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
                        }}>
                        View
                    </Link>
                </div>
            </div>
        </div>
    );
};