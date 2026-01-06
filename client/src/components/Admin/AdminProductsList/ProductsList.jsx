import Modal from "../Modal/Modal.jsx";
import CreateProductForm from "../CreateProductForm/CreateProductForm.jsx";
import ConfirmModal from "../../ConfirmModal.jsx";

import {useProducts} from "../../../hooks/admin/useProducts.js";
import {useUpdateProduct} from "../../../hooks/admin/useUpdateProduct.js";
import {useDeleteProduct} from "../../../hooks/admin/useDeleteProduct.js";

import {Loading} from "../Common/Loading/Loading.jsx";
import {Error} from "../Common/Error/Error.jsx";
import {FaInbox} from "react-icons/fa";
import {Empty} from "../Common/Empty/Empty.jsx";

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
