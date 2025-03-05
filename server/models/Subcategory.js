import mongoose from 'mongoose'

const subcategorySchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
}, { timestamps: true });

const SubCategory = mongoose.model("Subcategory", subcategorySchema);
export default SubCategory;