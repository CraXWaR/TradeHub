const ProductImage = ({image, title, baseUrl, placeholder}) => (<div className="product-image-container">
        {image ? (<img
                src={`${baseUrl}/uploads/${image}`}
                alt={title}
                className="product-detail-image"
                onError={(e) => {
                    if (e.currentTarget.src !== placeholder) {
                        e.currentTarget.src = placeholder;
                    }
                }}
            />) : (<img
                src={placeholder}
                alt="No Image Available"
                className="product-detail-image"
            />)}
    </div>);

export default ProductImage;
