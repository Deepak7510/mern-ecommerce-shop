import express from 'express'
import { searchProduct } from '../../controllers/Shop/search-controller.js';

const route=express.Router();

route.get('/:keyword',searchProduct)

export default route