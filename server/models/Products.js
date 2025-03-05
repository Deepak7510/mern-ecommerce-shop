import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    salePrice: {
        type: Number,
        required: true
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subcategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subcategory",
        required: true
    },
    stock: {
        type: Number,
        default: 0
    },
    size: {
        type: String,
    },
    images: [{
        type: String
    }], // Multiple images support
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);
export default Product;