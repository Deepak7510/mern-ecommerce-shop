import express from 'express';
import { getFilterProducts, getProductDetails } from '../../controllers/Shop/shopping-product-controller.js';
const router = express.Router();

router.get('/list', getFilterProducts);
router.get('/list/:id', getProductDetails);

export default router;
