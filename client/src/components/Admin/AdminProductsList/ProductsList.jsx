import Modal from "../Modal/Modal.jsx";
import {LuTriangleAlert, LuLoader} from "react-icons/lu";
import {useProducts} from "../../../hooks/admin/useProducts.js";
import {useUpdateProduct} from "../../../hooks/admin/useUpdateProduct.js";
import {useDeleteProduct} from "../../../hooks/admin/useDeleteProduct.js";

import {Loading} from "../Common/Loading/Loading.jsx";
import {Error} from "../Common/Error/Error.jsx";
import {FaInbox} from "react-icons/fa";
import {Empty} from "../Common/Empty/Empty.jsx";

import ProductsTable from "./ProductsTable.jsx";
import styles from "./ProductsList.module.css";
import {CreateProductForm} from "../CreateProductForm/CreateProductForm.jsx";

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

    if (loading) return <Loading message="Loading products..."/>;
    if (error) return <Error message={error}/>;
    if (!products.length) return <Empty title="No Products Yet"
                                        description="The database is currently empty. No products found."
                                        icon={FaInbox}/>;

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

        {/* Delete modal */}
        <Modal open={confirmOpen} onClose={cancelDelete} title="Confirm Destruction">
            <div className={styles.confirmWrapper}>
                <div className={styles.alertIconSection}>
                    <LuTriangleAlert className={styles.warningIcon} size={48}/>
                </div>

                <div className={styles.textSection}>
                    <h4 className={styles.confirmTitle}>Are you absolutely sure?</h4>
                    <p className={styles.confirmMessage}>
                        This will permanently delete the product from the database.
                        <strong> This action cannot be undone.</strong>
                    </p>
                </div>

                <div className={styles.confirmActions}>
                    <button
                        className={`${styles.adminBtn} ${styles.btnCancel}`}
                        onClick={cancelDelete}
                        type="button"
                        disabled={modalLoading}>
                        No, Keep it
                    </button>

                    <button
                        className={`${styles.adminBtn} ${styles.btnDelete}`}
                        onClick={confirmDelete}
                        disabled={modalLoading}
                        type="button">
                        {modalLoading ? (
                            <>
                                <LuLoader className={styles.spinner} size={18}/>
                                Deleting...
                            </>
                        ) : (
                            "Yes, Delete Product"
                        )}
                    </button>
                </div>
            </div>
        </Modal>
    </>);
};

export default ProductsList;
