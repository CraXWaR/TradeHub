import {User, Product, ProductVariants} from "../models/index.js";
import path from "path";

export const createProduct = async ({user_id, title, description, price, image, variants = []}) => {
    try {
        const product = await Product.create({
            user_id,
            title: title?.trim(),
            description: description?.trim(),
            price: Number(price),
            image: image,
        });

        if (Array.isArray(variants) && variants.length > 0) {
            const variantRows = variants
                .filter(v => v && v.name)
                .map(v => ({
                    product_id: product.id,
                    name: String(v.name).trim(),
                    price: v.price !== undefined && v.price !== null && v.price !== "" ? Number(v.price) : null,
                }));

            if (variantRows.length > 0) {
                await ProductVariants.bulkCreate(variantRows);
            }
        }

        const created = await Product.findByPk(product.id, {
            include: [{
                model: User, attributes: ["id", "name", "email", "role"],
            }, {
                model: ProductVariants, as: "variants",
            },],
        });

        return created.get({plain: true});
    } catch (error) {
        throw {
            message: "Failed to create product", detail: error.message,
        };
    }
};

export const getAllProducts = async () => {
    try {
        const products = await Product.findAll({
            where: { is_active: true },
            order: [["created_at", "DESC"]], include: [{model: User, attributes: ["id", "name", "email", "role"],}, {
                model: ProductVariants, as: "variants",
            },]
        });
        return products.map(p => p.get({plain: true}));
    } catch (error) {
        throw new Error(`Failed to fetch products: ${error.message}`);
    }
};

export const getProductById = async (id) => {
    try {
        const product = await Product.findOne({
            where: { id, is_active: true },
            include: [
                { model: User, attributes: ["id", "name", "email", "role"] },
                { model: ProductVariants, as: "variants" }
            ],
        });

        return product ? product.get({plain: true}) : null;
    } catch (error) {
        throw new Error(`Failed to fetch product: ${error.message}`);
    }
};

export const getProductsByUserId = async (userId) => {
    try {
        const products = await Product.findAll({
            where: { user_id: userId, is_active: true },
            order: [["created_at", "DESC"]],
            include: { model: User, attributes: ["id", "name", "email", "role"] },
        });

        return products.map(p => p.get({plain: true}));
    } catch (error) {
        throw new Error(`Failed to fetch user products: ${error.message}`);
    }
};

export const deleteProductById = async (id) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) return false;
        await product.update({is_active: false});
        return true;
    } catch (error) {
        throw new Error(`Failed to 'delete' product: ${error.message}`);
    }
};

export const restoreProductById = async (id) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) return false;
        await product.update({ is_active: true });
        return true;
    } catch (error) {
        throw new Error(`Failed to restore product: ${error.message}`);
    }
};

export const getDeletedProducts = async () => {
    try {
        const products = await Product.findAll({
            where: { is_active: false },
            order: [["updated_at", "DESC"]],
            include: [
                { model: User, attributes: ["id", "name", "email", "role"] },
                { model: ProductVariants, as: "variants" }
            ],
        });
        return products.map(p => p.get({ plain: true }));
    } catch (error) {
        throw new Error(`Failed to fetch deleted products: ${error.message}`);
    }
}

export const updateProduct = async (id, productData) => {
    try {
        const patch = {};
        if (productData.title !== undefined) patch.title = productData.title;
        if (productData.description !== undefined) patch.description = productData.description;
        if (productData.price !== undefined) patch.price = Number(productData.price);
        if (productData.image) patch.image = productData.image;

        await Product.update(patch, {where: {id}});

        if ("variants" in productData) {
            const raw = Array.isArray(productData.variants) ? productData.variants : [];

            const incoming = raw
                .filter((v) => v && v.name && String(v.name).trim() !== "")
                .map((v) => ({
                    id: v.id ?? null,
                    name: String(v.name).trim(),
                    price: v.price !== undefined && v.price !== null && v.price !== "" ? Number(v.price) : null,
                }));

            const existing = await ProductVariants.findAll({
                where: {product_id: id},
            });

            const existingById = new Map(existing.map((v) => [String(v.id), v]));

            const keepIds = new Set();
            const toUpdate = [];
            const toCreate = [];

            for (const v of incoming) {
                if (v.id && existingById.has(String(v.id))) {
                    keepIds.add(String(v.id));
                    toUpdate.push(v);
                } else {
                    toCreate.push(v);
                }
            }

            const toDeleteIds = existing
                .filter((v) => !keepIds.has(String(v.id)))
                .map((v) => v.id);

            if (toDeleteIds.length > 0) {
                await ProductVariants.destroy({
                    where: {
                        product_id: id, id: toDeleteIds,
                    },
                });
            }

            for (const v of toUpdate) {
                await ProductVariants.update({
                    name: v.name, price: v.price,
                }, {
                    where: {
                        id: v.id, product_id: id,
                    },
                });
            }

            if (toCreate.length > 0) {
                const rows = toCreate.map((v) => ({
                    product_id: id, name: v.name, price: v.price,
                }));
                await ProductVariants.bulkCreate(rows);
            }
        }

        const updated = await Product.findByPk(id, {
            include: [{
                model: User, attributes: ["id", "name", "email", "role"],
            }, {
                model: ProductVariants, as: "variants",
            },],
        });

        if (!updated) throw new Error("Product not found");

        const plain = updated.get({plain: true});

        if (plain.image) {
            const baseUrl = (process.env.BASE_URL);
            const nameOnly = path.basename(String(plain.image));
            plain.image = `${baseUrl}/uploads/${nameOnly}`;
        }

        return plain;
    } catch (error) {
        throw {
            message: "Failed to update product", detail: error.message,
        };
    }
};
