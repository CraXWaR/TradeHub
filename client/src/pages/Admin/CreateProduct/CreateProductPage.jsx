import React from "react";
import CreateProductForm from "../../../components/Admin/CreateProductForm/CreateProductForm.jsx";
import { useCreateProduct } from "../../../hooks/useCreateProduct.js";
import styles from "./CreateProductPage.module.css"; // new module file

const CreateProductPage = () => {
    const {
        formData,
        previewUrl,
        loading,
        message,
        handleChange,
        handleFileChange,
        handleSubmit,
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
                />
            </div>
        </div>
    );
};

export default CreateProductPage;
