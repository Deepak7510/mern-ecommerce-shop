import React, { useState } from 'react'
import { TableCell, TableRow } from '../ui/table'
import { Dialog, DialogTitle } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import AdminOrderDetailsView from './order-details'
import { useDispatch, useSelector } from 'react-redux'
import {fetchOrderDetailsById } from '@/store/admin-order-slice'

const AdminOrderTableRow = ({ orderItem }) => {
  const dispatch=useDispatch();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false)

  const {orderDetails}=useSelector(state=>state.adminOrder);
  function handleDetails(getOrderId){
    dispatch(fetchOrderDetailsById(getOrderId));
    setOpenDetailsDialog(true)
  }

    return  <TableRow key={orderItem._id}>
    <TableCell>{orderItem._id}</TableCell>
    <TableCell>{orderItem.createdAt.split('T')[0]}</TableCell>
    <TableCell>{orderItem.orderStatus}</TableCell>
    <TableCell>₹{orderItem.totalAmount}</TableCell>
    <TableCell>
      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <Button size='sm' onClick={()=>handleDetails(orderItem._id)}>View Details</Button>
        {orderDetails && orderDetails!==null ?<AdminOrderDetailsView orderDetails={orderDetails}/> :null}
      </Dialog>
    </TableCell>
  </TableRow>

}

export default AdminOrderTableRow
