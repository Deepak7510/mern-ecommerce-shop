import Product from "../../models/Products.js";
import fs from 'fs';

// Add new product 
export const addProduct = async (req, res) => {
    try {
        const { title, description, price, salePrice, brand, category, subcategory, size, stock } = req.body;
        const imagePaths = req.files?.map(file => file.path.replace(/\\/g, "/"));

        if (!title || !description || !price || !salePrice || !brand || !category || !subcategory || !stock || !imagePaths.length) {
            for (let i of imagePaths) {
                if (fs.existsSync(i)) {
                    fs.unlinkSync(i);
                }
            }
            return res.status(400).json({ // 403 -> 400 (Bad Request)
                success: false,
                message: "All fields are required"
            });
        }

        const newProduct = new Product({ title, description, price, salePrice, brand, category, subcategory, size, stock, images: imagePaths });
        await newProduct.save();

        return res.status(201).json({ // 200 -> 201 (Created)
            success: true,
            product: newProduct,
            message: "Product added successfully!"
        });

    } catch (error) {
        console.error("Error adding Product:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

// Fetch all products
export const getProducts = async (req, res) => {
    try {
        const productList = await Product.find().populate('brand',"name").populate('category','name').populate('subcategory',"name").sort({ _id: -1 });
        return res.status(200).json({ // 201 -> 200 (OK)
            success: true,
            productList
        });
    } catch (error) {
        console.error("Error fetching Product:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

// Update product
export const updateProduct = async (req, res) => {
    try {
        const { title, description, price, salePrice, brand, category, subcategory, size, stock } = req.body;
        const imagePaths = req.files?.map(file => file.path.replace(/\\/g, "/"));
        const id = req.params.id;

        if (!title || !description || !price || !salePrice || !brand || !category || !subcategory || !stock || !imagePaths.length) {
            for (let i of imagePaths) {
                if (fs.existsSync(i)) {
                    fs.unlinkSync(i);
                }
            }
            return res.status(400).json({ // 403 -> 400 (Bad Request)
                success: false,
                message: "All fields are required"
            });
        }

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found."
            });
        }

        for (let img of product.images) {
            if (fs.existsSync(img)) {
                fs.unlinkSync(img);
            }
        }

        product.title = title || product.title;
        product.description = description || product.description;
        product.price = price || product.price;
        product.salePrice = salePrice || product.salePrice;
        product.brand = brand || product.brand;
        product.category = category || product.category;
        product.subcategory = subcategory || product.subcategory;
        product.size = size || product.size;
        product.stock = stock || product.stock;
        product.images = imagePaths || product.images;

        await product.save();

        return res.status(200).json({
            success: true,
            updatedProduct: product,
            message: "Product updated successfully!"
        });

    } catch (error) {
        console.error("Error updating Product:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        for (let img of product.images) {
            if (fs.existsSync(img)) {
                fs.unlinkSync(img);
            }
        }

        await Product.findByIdAndDelete(id);
        return res.status(200).json({ // 201 -> 200 (OK)
            success: true,
            message: "Product deleted successfully!"
        });

    } catch (error) {
        console.error("Error deleting Product:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};
