import { useDeletedProducts } from "../../../hooks/admin/useDeletedProducts.js";
import { useRestoreProduct } from "../../../hooks/admin/useRestoreProduct.js";
import { Loading } from "../Common/Loading/Loading.jsx";
import { Error } from "../Common/Error/Error.jsx";
import { Empty } from "../Common/Empty/Empty.jsx";
import { ProductsTable } from "../AdminProductsList/ProductsTable.jsx";
import { FaInbox } from "react-icons/fa";

export const DeletedProductsList = ({ filters }) => {
    const { products, loading, error, removeProductFromList } = useDeletedProducts(filters);

    const { restoreProduct, loading: restoring } = useRestoreProduct({
        delayMs: 2000, onRestored: removeProductFromList,
    });

    if (loading) return <Loading message="Loading deleted products..."/>;
    if (error) return <Error message={error}/>;
    if (!products.length) return (
        
        <Empty
            title="No Deleted Products"
            description="There are no deleted products to show."
            icon={FaInbox}/>
    );

    return (
        <ProductsTable
            products={products}
            onRestore={restoreProduct}
            restoring={restoring}/>
    );
};