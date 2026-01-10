import React from "react";
import {CreateProductForm} from "../../../components/Admin/CreateProductForm/CreateProductForm.jsx";
import {useCreateProduct} from "../../../hooks/admin/useCreateProduct.js";
import styles from "./CreateProductPage.module.css";

const CreateProductPage = () => {
    const {
        formData,
        previewUrl,
        loading,
        message,
        variants,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleVariantChange,
        addVariantRow,
        removeVariantRow,
    } = useCreateProduct();

    return (
        <div className={styles.createContainer}>
            <div className={styles.createCard}>
                <div className={styles.createHeader}>
                    <div className={styles.createIcon}>🛒</div>
                    <h1 className={styles.createTitle}>Create Product</h1>
                    <p className={styles.createSubtitle}>
                        Add a new item to the marketplace
                    </p>
                </div>

                <CreateProductForm
                    formData={formData}
                    previewUrl={previewUrl}
                    loading={loading}
                    message={message}
                    handleChange={handleChange}
                    handleFileChange={handleFileChange}
                    handleSubmit={handleSubmit}
                    variants={variants}
                    handleVariantChange={handleVariantChange}
                    addVariantRow={addVariantRow}
                    removeVariantRow={removeVariantRow}/>
            </div>
        </div>
    );
};

export default CreateProductPage;
