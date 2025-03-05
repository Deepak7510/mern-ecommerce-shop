import express from 'express'
import { createWishlist, fetchAllWishlist } from '../../controllers/Shop/wishlist-controller.js';
const route=express.Router();

route.post('/create',createWishlist);
route.get('/list/:userId',fetchAllWishlist);
export default route