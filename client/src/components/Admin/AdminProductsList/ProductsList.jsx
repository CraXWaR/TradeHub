import Modal from "../Modal/Modal.jsx";
import CreateProductForm from "../CreateProductForm/CreateProductForm.jsx";
import ConfirmModal from "../../ConfirmModal.jsx";

import {useProducts} from "../../../hooks/admin/useProducts.js";
import {useUpdateProduct} from "../../../hooks/useUpdateProduct.js";
import {useDeleteProduct} from "../../../hooks/useDeleteProduct.js";

import ProductsTable from "./ProductsTable.jsx";
import styles from "./ProductsList.module.css";

const ProductsList = ({filters}) => {
    const {
        products, loading, error, updateProductInList, removeProductFromList,
    } = useProducts(filters);

    // EDIT hook
    const {
        editOpen,
        openEdit,
        closeEdit,
        editingProduct,
        formData: editFormData,
        previewUrl,
        loading: saving,
        message,
        handleChange,
        handleFileChange,
        variants,
        handleVariantChange,
        addVariantRow,
        removeVariantRow,
        handleSubmit,
    } = useUpdateProduct({
        onUpdated: updateProductInList,
    });

    // DELETE hook
    const {
        confirmOpen, modalLoading, requestDelete, cancelDelete, confirmDelete,
    } = useDeleteProduct({
        delayMs: 2000, onDeleted: removeProductFromList,
    });

    if (loading) return <p className={styles.loading}>Loading…</p>;
    if (error) return <p className={styles.error}>{error}</p>;
    if (!products.length) return <p className={styles.empty}>No products found.</p>;

    return (<>
        <ProductsTable
            products={products}
            onEdit={openEdit}
            onDelete={requestDelete}/>

        {/* Edit modal */}
        <Modal open={editOpen} onClose={closeEdit} title="Edit product">
            {editingProduct && (<CreateProductForm
                formData={editFormData}
                previewUrl={previewUrl}
                loading={saving}
                message={message}
                handleChange={handleChange}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
                variants={variants}
                handleVariantChange={handleVariantChange}
                addVariantRow={addVariantRow}
                removeVariantRow={removeVariantRow}
                mode="edit"/>)}
        </Modal>

        {/* Confirm delete modal */}
        <ConfirmModal
            isOpen={confirmOpen}
            title="Delete Product"
            message="Are you sure you want to delete this product? This action cannot be undone!"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
            loading={modalLoading}/>
    </>);
};

export default ProductsList;
