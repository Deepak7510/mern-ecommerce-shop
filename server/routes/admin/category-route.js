import express from 'express'
import upload from '../../helpers/multer.js';
import { addCategory, deleteCategory, getCategory, updateCategory } from '../../controllers/admin/category.controllers.js';

const router=express.Router();


router.post('/add',upload.single('logo'),addCategory);
router.put('/update/:id',upload.single('logo'),updateCategory);
router.delete('/delete/:id',deleteCategory);
router.get('/list',getCategory)

export default router