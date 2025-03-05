import fs from 'fs'
import Category from '../../models/Category.js';

export const addCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const logo = req.file ? req.file.path : null;

        // ✅ All fields validation
        if (!name || !logo) {
            if (logo) fs.unlinkSync(logo);
            return res.status(400).json({
                success: false,
                message: "Name and logo are required."
            });
        }
        // ✅ Check if category already exists

        const categoryCheck = await Category.findOne({ name });
        if (categoryCheck) {
            fs.unlinkSync(logo); // Delete uploaded logo if brand exists
            return res.status(409).json({
                success: false,
                message: `Category '${name}' already exists.`
            });
        }

        // ✅ Save new brand
        const newCategory = new Category({ name, logo });
        await newCategory.save();

        return res.status(201).json({
            success: true,
            message: "Category add successfully.",
            category: newCategory
        });

    } catch (error) {
        console.error("Error adding Category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};




export const updateCategory = async (req, res) => {
    try {
        const { name } = req.body
        const logo = req.file.destination + req.file.filename
        const id = req.params.id;
        if (!name || !logo) {
            if (logo) fs.unlinkSync(logo);
            return res.status(400).json({
                success: false,
                message: "Name and logo are required."
            });
        }
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            })
        }
        if (fs.existsSync(category.logo)) {
            fs.unlinkSync(category.logo);
        }
        category.name = name
        category.logo = logo
        await category.save();
        return res.status(201).json({
            success: true,
            message: "Category updated."
        })
    } catch (error) {
        console.error("Error upadte category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}


export const deleteCategory = async (req, res) => {
    try {
        const id = req.params.id
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found."
            })
        }

        if (fs.existsSync(category.logo)) {
            fs.unlinkSync(category.logo);
        }
        
        await Category.findByIdAndDelete(id);
        return res.status(201).json({
            success: true,
            message: "Category deleted."
        })
        
    } catch (error) {
        console.error("Error delete Category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export const getCategory = async (req, res) => {
    try {
        const categoryList = await Category.find();
        return res.status(200).json({
            success: true,
            categoryList
        });
    } catch (error) {
        console.error("Error fetch Category:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}
