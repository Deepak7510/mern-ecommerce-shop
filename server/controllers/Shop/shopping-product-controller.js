import Product from "../../models/Products.js";

// Fetch all products
export const getFilterProducts = async (req, res) => {
    try {
        const { category = [], brand = [], sortBy = 'price-lowtohigh' } = req.query;
        let filter = {}
        if (category.length) {
            filter.category = { $in: category.split(',') }
        }
        if (brand.length) {
            filter.brand = { $in: brand.split(',') }
        }
        
        let sort = {}
        switch (sortBy) {
            case 'price-lowtohigh':
                sort.price = 1
                break;
            case 'price-hightolow':
                sort.price = -1
                break;
            case 'title-atoz':
                sort.title = 1
                break;
            case 'title-ztoa':
                sort.title = -1
                break;
            default:
                sort.price = 1
                break;
        }

        const productList = await Product.find(filter).populate('brand', "name").populate('category', 'name').populate('subcategory', "name").sort(sort);
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


export const getProductDetails = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id).populate('brand', "name").populate('category', 'name').populate('subcategory', "name");
        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            })
        }
        return res.status(201).json({
            success: true,
            data: product
        })

    } catch (error) {
        console.error("Error fetching Product:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}





