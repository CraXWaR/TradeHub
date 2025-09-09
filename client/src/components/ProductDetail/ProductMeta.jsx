const ProductMeta = ({createdAt}) => (<div className="flex justify-between items-center text-sm text-gray-500 mb-6">
    <span>
      Listed on:{" "}
        {new Date(createdAt).toLocaleDateString("en-US", {
            year: "numeric", month: "long", day: "numeric",
        })}
    </span>
    </div>);

export default ProductMeta;
