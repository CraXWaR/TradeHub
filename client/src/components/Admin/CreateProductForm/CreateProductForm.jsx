import "./CreateProductForm.css";

const CreateProductForm = ({
                               formData, previewUrl, loading, message, handleChange, handleFileChange, handleSubmit,
                           }) => {
    return (<>
        {message.text && <div className={`message ${message.type}`}>{message.text}</div>}

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
                {previewUrl && (<div className="image-preview" style={{marginTop: "8px"}}>
                    <img
                        src={previewUrl}
                        alt="Preview"
                        style={{maxWidth: "100%", maxHeight: "200px", borderRadius: "8px"}}
                    />
                </div>)}
            </div>

            <button
                type="submit"
                className={`create-button ${loading ? "loading" : ""}`}
                disabled={loading}
            >
                {loading ? (<>
                    <div className="spinner"></div>
                    Creating...
                </>) : ("Create Product")}
            </button>
        </form>
    </>);
};

export default CreateProductForm;
