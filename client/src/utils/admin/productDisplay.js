const BASE_URL = import.meta.env.VITE_API_URL;

export const formatPrice = (value) => {
    if (value == null || value === "") return "—";
    const num = Number(value);
    return isNaN(num) ? "—" : `$${num.toFixed(2)}`;
};

export const getProductImageUrl = (p) => {
    const raw = p?.image || "";
    if (!raw) return "";
    if (/^https?:\/\//i.test(raw)) return raw;
    const base = BASE_URL.replace(/\/+$/, "");
    const filename = raw.split("/").pop();
    return `${base}/uploads/${filename}`;
};
