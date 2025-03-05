import express from 'express'
import { fetchAllOrderByAmdin, fetchOrderDetailByAdminByOrderId, upadteOrderStatus } from '../../controllers/admin/order-controller.js';
const route = express.Router();

route.get('/details/:orderId', fetchOrderDetailByAdminByOrderId);
route.get('/list', fetchAllOrderByAmdin);
route.put('/update/:orderId', upadteOrderStatus);

export default route