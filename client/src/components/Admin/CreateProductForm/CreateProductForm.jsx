import React from "react";
import styles from "./CreateProductForm.module.css";

const CreateProductForm = ({
                               formData,
                               previewUrl,
                               loading,
                               message = {},
                               handleChange,
                               handleFileChange,
                               handleSubmit,
                           }) => {
    return (
        <>
            {message?.text && (
                <div
                    className={`${styles.message} ${
                        message.type ? styles[message.type] : ""
                    }`}
                >
                    {Array.isArray(message.text)
                        ? message.text.map((err, i) => <div key={i}>{err}</div>)
                        : message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className={styles.createForm}>
                {/* Title */}
                <div className={styles.formGroup}>
                    <label htmlFor="title" className={styles.formLabel}>
                        Product Name
                    </label>
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={styles.formInput}
                            placeholder="Enter product name"
                            required
                        />
                        <div className={styles.inputIcon}>🏷️</div>
                    </div>
                </div>

                {/* Description */}
                <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.formLabel}>
                        Description
                    </label>
                    <div className={styles.inputWrapper}>
            <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`${styles.formInput} ${styles.textarea}`}
                placeholder="Enter product description"
                rows="4"
                required
            />
                        <div className={styles.inputIcon}>📝</div>
                    </div>
                </div>

                {/* Row: Price + Image input */}
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label htmlFor="price" className={styles.formLabel}>
                            Price ($)
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className={styles.formInput}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                required
                            />
                            <div className={styles.inputIcon}>💵</div>
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="image" className={styles.formLabel}>
                            Product Image
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className={`${styles.formInput} ${styles.fileInput}`}
                            />
                            <div className={styles.inputIcon}>🖼️</div>
                        </div>
                    </div>
                </div>

                {/* Row: Image preview (full width) */}
                {previewUrl && (
                    <div className={styles.previewRow}>
                        <div className={styles.imagePreview}>
                            <img src={previewUrl} alt="Preview" />
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    className={`${styles.createButton} ${loading ? styles.loading : ""}`}
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <div className={styles.spinner} />
                            Creating...
                        </>
                    ) : (
                        "Create Product"
                    )}
                </button>
            </form>
        </>
    );
};

export default CreateProductForm;
