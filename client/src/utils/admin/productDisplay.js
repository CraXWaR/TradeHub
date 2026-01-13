const BASE_URL = import.meta.env.VITE_API_URL || '';

export const formatPrice = (value) => {
    if (value == null || value === "") return "—";
    const num = Number(value);
    return isNaN(num) ? "—" : `$${num.toFixed(2)}`;
};

export const getProductImageUrl = (product) => {
    if (!product?.image) return "";
    if (/^https?:\/\//i.test(product.image)) return product.image;

    const filename = product.image.split("/").pop();
    return `${BASE_URL}/uploads/${filename}`;
};

