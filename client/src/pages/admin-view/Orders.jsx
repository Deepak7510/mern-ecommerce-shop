import AdminOrdersTable from '@/components/admin-view/order-table'
import { fetchAllOrder } from '@/store/admin-order-slice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const AdminOrders = () => {
  const dispatch=useDispatch()
  const {orderList}=useSelector(state=>state.adminOrder);

  useEffect(() => {
    dispatch(fetchAllOrder());
  }, [dispatch])
  
  return <div className='mt-14 mb-5 w-full'>
   <AdminOrdersTable orderList={orderList}/>
</div>
}

export default AdminOrders