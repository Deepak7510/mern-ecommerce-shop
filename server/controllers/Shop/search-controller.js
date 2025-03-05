import Product from "../../models/Products.js";

export const searchProduct = async (req, res) => {
    try {
        // Keyword ko params aur query dono se lene ka support
        const keyword = req.params.keyword

        // Validate keyword
        if (!keyword || typeof keyword !== 'string' || keyword.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Keyword is required and must be a non-empty string.'
            });
        }
        // Case-insensitive regex search
        const regEx = new RegExp(keyword.trim().toString(), 'i');

        const createSearchQuery = {
            $or: [{ title: regEx }, { description: regEx }]
        };

        const products = await Product.find(createSearchQuery);

        // Check if products exist
        if (products.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No products found.",
                data: []
            });
        }

        return res.status(200).json({
            success: true,
            data: products
        });

    } catch (error) {
        console.error("Search Product Error:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

