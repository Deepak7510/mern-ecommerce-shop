import express from 'express'
import { addBrand, deleteBrand, getBrand, updateBrand } from '../../controllers/admin/brand-controller.js';

const route=express.Router();
route.post('/add',addBrand)
route.put('/update/:id',updateBrand)
route.delete('/delete/:id',deleteBrand)
route.get('/list',getBrand)

export default route