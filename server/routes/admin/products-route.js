import express from 'express';
import { addProduct, deleteProduct, getProducts, updateProduct } from '../../controllers/admin/products-controller.js';
import upload from '../../helpers/multer.js';

const router = express.Router();

router.post('/add', upload.array('images', 4), addProduct); // ✅ Max 4 images upload
router.put('/update/:id', upload.array('images', 4), updateProduct);
router.delete('/delete/:id', deleteProduct);
router.get('/list', getProducts);

export default router;
