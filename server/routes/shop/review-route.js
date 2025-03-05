import express from 'express'
import { createReview, fetchProductReview } from '../../controllers/Shop/review-controller.js';

const route=express.Router();

route.post('/create',createReview);
route.get('/list/:productId/:limitValue',fetchProductReview);

export default route