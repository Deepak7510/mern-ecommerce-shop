import express from 'express'
import { addAddress, deleteAddress, fetchAllAddress, updateAddress } from '../../controllers/Shop/address-controller.js';

const route=express.Router();

route.post('/add',addAddress)
route.get('/get/:userId',fetchAllAddress)
route.put('/update/:userId/:addressId',updateAddress)
route.delete('/delete/:userId/:addressId',deleteAddress)

export default route