import {FaTrash} from "react-icons/fa";
import ProductMeta from "./ProductMeta";
import ProductActions from "./ProductActions.jsx";

const ProductInfo = ({product, navigate, onDelete}) => (<div className="product-info">
        <div className="flex justify-between items-start mb-4">
            <h1 className="product-title">{product.title}</h1>
            <button
                className="p-2 rounded-full border border-red-300 text-red-600 hover:bg-red-100 transition-colors"
                onClick={onDelete}
            >
                <FaTrash size={18}/>
            </button>
        </div>

        <p className="product-price">
            ${Number(product.price || 0).toFixed(2)}
        </p>

        <div className="product-description">
            <h3>Description</h3>
            <p>{product.description || "No description available."}</p>
        </div>

        <div className="mt-10">
            <ProductMeta createdAt={product.created_at}/>
            <ProductActions navigate={navigate}/>
        </div>
    </div>);

export default ProductInfo;
