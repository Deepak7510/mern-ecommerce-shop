import AdminOrdersTable from "@/components/admin-view/order-table";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { fetchAllOrder } from "@/store/admin-order-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminOrders = () => {
  const dispatch = useDispatch();
  const { orderList } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(fetchAllOrder());
  }, [dispatch]);

  return (
    <Card className="w-full">
      <CardContent className="py-4">
        <h1 className="text-2xl mb-3 font-bold text-center">All Orders</h1>
        <AdminOrdersTable orderList={orderList} />
      </CardContent>
    </Card>
  );
};

export default AdminOrders;
