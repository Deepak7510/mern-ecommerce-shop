import Order from "../../models/Order.js";


export const fetchOrderDetailByAdminByOrderId=async(req,res)=>{
    try {
        const {orderId}=req.params;
        if(!orderId){
            return res.status(404).json({
                success:false,
                message:"Order id is required."
            })
        }
        const orderDetails=await Order.findOne({_id:orderId}).populate({
            path:'products.product',
            select:'title price salePrice images brand'
        });
        return res.status(200).json({
            success:true,
            orderDetails
        })

    } catch (error) {
        console.error("Fetch all order error",error);
        res.status(500).json({
            success:false,
            message:"Internal erver error."
        })
        
    }
}

export const fetchAllOrderByAmdin=async(req,res)=>{
    try {
        const order=await Order.find().sort({_id:-1});

        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order not found."
            })
        }

        return res.status(200).json({
            success:true,
            order
        })
    } catch (error) {
        console.error("Fetch all order error",error);
        res.status(500).json({
            success:false,
            message:"Internal erver error."
        })
    }
}

export const upadteOrderStatus=async(req,res)=>{
    try {
        const {orderId}=req.params;
        const {orderStatus}=req.body;
        const order=await Order.findById(orderId);
        if(!order){
            return res.status(404).json({
                success:false,
                message:"Order not found."
            })
        }
        
        await Order.findByIdAndUpdate(orderId,{orderStatus});
        return res.status(200).json({
            success:true,
            message:"Order status is update successfully."
        })
        
    } catch (error) {
        console.error('upadteOrderStatus Error',error);
        res.status(500).json({
            success:false,
            message:"Internal erver error."
        }) 
}
}