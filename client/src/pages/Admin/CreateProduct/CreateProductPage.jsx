import CreateProductForm from "../../../components/Admin/CreateProductForm/CreateProductForm.jsx";
import {useCreateProduct} from "../../../hooks/useCreateProduct.js";

const CreateProductPage = () => {
    const {
        formData, previewUrl, loading, message, handleChange, handleFileChange, handleSubmit,
    } = useCreateProduct();

    return (<div className="create-container">
        <div className="create-card">
            <div className="create-header">
                <div className="create-icon">🛒</div>
                <h1 className="create-title">Create Product</h1>
                <p className="create-subtitle">Add a new item to the marketplace</p>
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
    </div>);
};

export default CreateProductPage;
