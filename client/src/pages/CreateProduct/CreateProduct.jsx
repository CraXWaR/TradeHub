import { useState } from 'react';
import './CreateProduct.css';
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            setImageFile(null);
            setPreviewUrl('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        const token = localStorage.getItem("token");

        try {
            // Ensure minimum loading time of 1500ms
            const startTime = Date.now();

            const form = new FormData();
            form.append('title', formData.title);
            form.append('description', formData.description);
            form.append('price', String(parseFloat(formData.price)));
            if (imageFile) {
                form.append('image', imageFile);
            }

            const response = await fetch("http://localhost:5000/api/products/create", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: form
            });

            const data = await response.json();

            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, 1500 - elapsedTime);

            if (remainingTime > 0) {
                await new Promise(resolve => setTimeout(resolve, remainingTime));
            }

            if (data.success) {
                setMessage({ type: "success", text: "Product created successfully!" });
                setFormData({
                    title: "",
                    description: "",
                    price: ""
                });
                setImageFile(null);
                setPreviewUrl('');
                navigate("/products");
            } else {
                setMessage({ type: "error", text: data.message || "Failed to create product" });
            }
        } catch (error) {
            setMessage({ type: "error", text: "Error connecting to server" });
            console.error("Error creating product:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="create-container">
            <div className="create-card">
                <div className="create-header">
                    <div className="create-icon">🛒</div>
                    <h1 className="create-title">Create Product</h1>
                    <p className="create-subtitle">Add a new item to the marketplace</p>
                </div>

                {message.text && (
                    <div className={`message ${message.type}`}>
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="create-form">
                    <div className="form-group">
                        <label htmlFor="title" className="form-label">Product Name</label>
                        <div className="input-wrapper">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="Enter product name"
                                required
                            />
                            <div className="input-icon">🏷️</div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description" className="form-label">Description</label>
                        <div className="input-wrapper">
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="form-input textarea"
                                placeholder="Enter product description"
                                rows="4"
                                required
                            />
                            <div className="input-icon">📝</div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price" className="form-label">Price ($)</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                id="price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                className="form-input"
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                required
                            />
                            <div className="input-icon">💵</div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="image" className="form-label">Product Image</label>
                        <div className="input-wrapper">
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="form-input"
                            />
                            <div className="input-icon">🖼️</div>
                        </div>
                        {previewUrl && (
                            <div className="image-preview" style={{ marginTop: '8px' }}>
                                <img src={previewUrl} alt="Preview" style={{ maxWidth: '100%', maxHeight: '200px', borderRadius: '8px' }} />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`create-button ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className="spinner"></div>
                                Creating...
                            </>
                        ) : (
                            'Create Product'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
