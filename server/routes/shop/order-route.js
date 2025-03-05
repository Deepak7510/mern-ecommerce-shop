import express from 'express'
import {createOrder, fetchAllOrder, fetchAllOrderByUserId, fetchOrderDetailsById, processPeyment } from '../../controllers/Shop/order-controller.js';
const route = express.Router();

route.post('/createOrder', createOrder);
route.post('/process-peyment', processPeyment);
route.get('/list/:userId', fetchAllOrderByUserId);
route.get('/details/:orderId', fetchOrderDetailsById);
route.get('/list', fetchAllOrder);

export default route