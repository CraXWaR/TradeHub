import { useEffect, useMemo, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL || '';

export const useDeletedProducts = (filters) => {
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;
        const startTime = Date.now();
        const minWait = 1500;

        const fetchDeletedProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const res = await fetch(`${BASE_URL}/api/products/deleted`, {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (!res.ok) {
                    const ct = res.headers.get("content-type") || "";
                    let errorMessage = `Error ${res.status}`;
                    if (ct.includes("application/json")) {
                        const errorData = await res.json();
                        errorMessage = errorData.message || errorMessage;
                    }
                    throw new Error(errorMessage);
                }

                const data = await res.json();

                const elapsed = Date.now() - startTime;
                if (elapsed < minWait) {
                    await new Promise((resolve) => setTimeout(resolve, minWait - elapsed));
                }

                if (isMounted) {
                    if (data?.success && Array.isArray(data.data)) {
                        setAllProducts(data.data.map((p) => ({
                            id: p.id ?? "",
                            title: p.title ?? "",
                            description: p.description ?? "",
                            price: p.price,
                            variants: p?.variants ?? [],
                            image: p.image ?? "",
                            created_at: p.created_at ?? null,
                        })));
                    } else {
                        throw new Error(data?.message || "Failed to load deleted products");
                    }
                }
            } catch (err) {
                if (isMounted) setError(err.message);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchDeletedProducts();
        return () => { isMounted = false; };
    }, [filters]);

    const products = useMemo(() => {
        let list = allProducts;

        if (filters?.query) {
            const q = filters.query.toLowerCase();
            list = list.filter((p) =>
                (p.title || "").toLowerCase().includes(q) ||
                String(p.id || "").toLowerCase().includes(q)
            );
        }

        switch (filters?.sort) {
            case "title_asc":
                list = [...list].sort((a, b) => (a.title || "").localeCompare(b.title || ""));
                break;
            case "title_desc":
                list = [...list].sort((a, b) => (b.title || "").localeCompare(a.title || ""));
                break;
            case "price_asc":
                list = [...list].sort((a, b) => (Number(a.price) || 0) - (Number(b.price) || 0));
                break;
            case "price_desc":
                list = [...list].sort((a, b) => (Number(b.price) || 0) - (Number(a.price) || 0));
                break;
            case "created_asc":
                list = [...list].sort((a, b) => new Date(a.created_at || 0) - new Date(b.created_at || 0));
                break;
            case "created_desc":
            default:
                list = [...list].sort((a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0));
                break;
        }

        return list;
    }, [allProducts, filters]);

    const removeProductFromList = (id) => {
        setAllProducts((list) => list.filter((p) => p.id !== id));
    };

    return { products, loading, error, removeProductFromList };
};