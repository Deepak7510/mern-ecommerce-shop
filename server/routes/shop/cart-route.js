import express from 'express';
import { addToCart, deleteCartItem, fetchCartItems, updateCartItemQty } from '../../controllers/Shop/cart-controller.js';
const router = express.Router();

router.post('/add',addToCart)
router.get('/get/:userId',fetchCartItems)
router.put('/update-cart',updateCartItemQty)
router.delete('/delete/:userId/:productId',deleteCartItem);

export default router;
