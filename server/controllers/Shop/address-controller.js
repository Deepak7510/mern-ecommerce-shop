import Address from "../../models/Address.js";

export const addAddress = async (req, res) => {
    try {
        const { userId, address, city, pincode, phone, notes } = req.body;

        console.log( userId, address, city, pincode, phone, notes )

        if (!userId || !address || !city || !pincode || !phone || !notes) {
            return res.status(400).json({
                success: false,
                message: 'Invalid data provided!'
            })
        }

        const newlyCreatedAddress = new Address({ userId, address, city, pincode, phone, notes })
        await newlyCreatedAddress.save()

        return res.status(201).json({
            success: true,
            data: newlyCreatedAddress,
            message: 'New Address added Successfully!'
        })


    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'server error'
        })
    }
}

export const updateAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params;

        const formData = req.body;

        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'user and address id is required!'
            })
        }

        const address = await Address.findOneAndUpdate({ _id: addressId, userId }, formData, { new: true });

        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            })
        }

        res.status(201).json({
            success: true,
            message:"Address updated successfully.",
            data: address
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'server error'
        })
    }
}

export const deleteAddress = async (req, res) => {
    try {

        const { userId, addressId } = req.params;


        if (!userId || !addressId) {
            return res.status(400).json({
                success: false,
                message: 'user and address id is required!'
            })
        }
        const address = await Address.findOneAndDelete({ _id: addressId, userId });
        if (!address) {
            return res.status(404).json({
                success: false,
                message: 'Address not found'
            })
        }

        res.status(201).json({
            success: true,
            message: "Address deleted successfully"
        })


    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'server error'
        })
    }
}

export const fetchAllAddress = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'user id is required!'
            })
        }
        const address = await Address.find({ userId });
        return res.status(201).json({
            success: true,
            data: address
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({
            success: false,
            message: 'server error'
        })
    }
}